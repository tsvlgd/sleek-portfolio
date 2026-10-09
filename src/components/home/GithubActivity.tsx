import { githubConfig } from '@/config/Github';
import { getContributions } from '@/lib/github';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WEEKDAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const CELL = 10;
const GAP = 3;

/**
 * Contribution grid, rendered on the server.
 *
 * A hand-rolled 7-row grid of divs instead of `react-activity-calendar`: no
 * library, no client fetch, no theme-switch re-render, and it can use our own
 * tokens so it reads as part of the design system. Colours come from CSS vars
 * that flip with the theme for free.
 */
export async function GithubActivity() {
  const data = await getContributions(githubConfig.username);

  if (!data || data.days.length === 0) {
    // Degraded state: still useful, never broken.
    return (
      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          GitHub activity is unavailable right now.
        </p>
        <a
          href={`https://github.com/${githubConfig.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-accent border-border shrink-0 rounded-full border px-3 py-1 font-mono text-xs transition-colors"
        >
          github.com/{githubConfig.username}
        </a>
      </div>
    );
  }

  // Pad the start so columns align to weekdays (weeks start Sunday).
  const firstDate = new Date(data.days[0].date);
  const leadingBlanks = firstDate.getUTCDay();

  const weeks: Array<
    Array<{ date: string; count: number; level: number } | null>
  > = [];
  let week: Array<(typeof weeks)[number][number]> = new Array(
    leadingBlanks,
  ).fill(null);

  for (const day of data.days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);

  // Month labels sit above the first column of each month. They are absolutely
  // positioned and allowed to overflow to the right, because a fixed-width
  // cell clips "Nov" to an unreadable stub.
  const monthLabels: Array<{ index: number; label: string }> = [];
  let previousMonth = -1;
  let lastLabelIndex = -99;

  weeks.forEach((column, index) => {
    const firstReal = column.find(Boolean);
    if (!firstReal) return;

    const month = new Date(firstReal.date).getUTCMonth();
    if (month === previousMonth) return;
    // Leave room so boundary columns never crowd the previous label.
    if (index - lastLabelIndex < 4) return;

    monthLabels.push({ index, label: MONTHS[month] });
    previousMonth = month;
    lastLabelIndex = index;
  });

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-foreground font-mono text-sm tabular-nums">
          {data.total.toLocaleString()} contributions
          <span className="text-muted-foreground"> in the last year</span>
        </p>
        <a
          href={`https://github.com/${githubConfig.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-accent font-mono text-xs transition-colors"
        >
          @{githubConfig.username}
        </a>
      </div>

      {/* The grid is 53 columns wide and cannot shrink. Contain the overflow
          HERE rather than letting it widen the page — a stray horizontal
          scrollbar on the whole document is the classic mobile bug. */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-2">
          {/* Weekday labels */}
          <div className="text-muted-foreground/60 grid shrink-0 grid-rows-7 font-mono text-[10px] leading-3">
            {WEEKDAYS.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </div>

          <div>
            {/* Month labels */}
            <div
              className="text-muted-foreground/60 relative mb-1 h-3 font-mono text-[10px]"
              style={{ width: weeks.length * CELL + (weeks.length - 1) * GAP }}
            >
              {monthLabels.map((entry) => (
                <span
                  key={entry.index}
                  className="absolute top-0 whitespace-nowrap"
                  style={{ left: entry.index * (CELL + GAP) }}
                >
                  {entry.label}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap: GAP }}>
              {weeks.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="grid grid-rows-7"
                  style={{ gap: GAP }}
                >
                  {column.map((day, dayIndex) => (
                    <span
                      key={dayIndex}
                      title={day ? `${day.count} on ${day.date}` : undefined}
                      className="data-[level='0']:bg-border/70 data-[level='1']:bg-accent/25 data-[level='2']:bg-accent/45 data-[level='3']:bg-accent/70 data-[level='4']:bg-accent rounded-[2px]"
                      style={{ width: CELL, height: CELL }}
                      data-level={day?.level ?? 0}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
