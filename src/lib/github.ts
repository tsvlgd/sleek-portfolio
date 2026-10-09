/**
 * GitHub contribution data, fetched server-side.
 *
 * The previous implementation called `github-contributions-api.deno.dev` from
 * the browser. That service is gone — Deno Deploy Classic was sunset — so the
 * graph silently rendered nothing, forever.
 *
 * This talks to GitHub's GraphQL API directly, so there is no third-party
 * uptime in the dependency chain. The token is server-only and never reaches
 * the client bundle.
 *
 * Requires `GITHUB_TOKEN` in the environment. Without it the section degrades
 * to a plain link rather than breaking the build.
 */

type Level = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: Level;
};

export type ContributionData = {
  total: number;
  days: ContributionDay[];
  fetchedAt: string;
};

const QUERY = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

const LEVELS: Record<string, Level> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

/**
 * @param revalidate seconds of ISR cache. Contributions are a vanity metric;
 *        an hour is plenty and keeps the page static.
 */
export async function getContributions(
  username: string,
  revalidate = 3600,
): Promise<ContributionData | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'mehfooj.dev',
      },
      body: JSON.stringify({ query: QUERY, variables: { login: username } }),
      next: { revalidate },
    });

    if (!response.ok) return null;

    const json = await response.json();
    const calendar =
      json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) return null;

    const days: ContributionDay[] = calendar.weeks.flatMap(
      (week: { contributionDays: Array<Record<string, unknown>> }) =>
        week.contributionDays.map((day) => ({
          date: String(day.date),
          count: Number(day.contributionCount),
          level: LEVELS[String(day.contributionLevel)] ?? 0,
        })),
    );

    return {
      total: calendar.totalContributions,
      days,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Failed to fetch GitHub contributions:', error);
    return null;
  }
}
