export type ProjectStatus = 'live' | 'active' | 'building' | 'wip';

export interface Project {
  slug: string;
  title: string;
  /** One line. Sells the project, not the stack. */
  tagline: string;
  description: string;
  period: string;
  role: string;
  stack: string[];
  /** The single reason this project earns a place on the page. */
  highlight?: string;
  status: ProjectStatus;
  github?: string;
  live?: string;
  /** Surfaces the project on the home page. */
  featured: boolean;
  /** Gives the project a case study route at /projects/<slug>. */
  details: boolean;
}

/**
 * The catalogue.
 *
 * Rules this list follows:
 *  - Only work that is publicly verifiable, or work marked in progress with no
 *    public link. Never a fork presented as original.
 *  - Taglines and descriptions speak in product terms. What the thing does for
 *    a person, not which library does it internally.
 *  - Order is conviction, not chronology.
 */
export const projects: Project[] = [
  {
    slug: 'veda-ai',
    title: 'VedaAI',
    tagline: 'Marking assessments from a photo of a paper',
    description:
      'A teacher photographs a question paper and a handwritten answer sheet. VedaAI reads both, matches every answer to its question, and returns the result as a review workspace where each mark sits on top of the original page. Deployed and in use.',
    period: '2026',
    role: 'Full stack',
    stack: ['TypeScript', 'Next.js', 'Vision models', 'Structured output'],
    highlight: 'Falls back to a second provider when the first one goes down',
    status: 'live',
    github: 'https://github.com/tsvlgd/veda-ai',
    live: 'https://veda-ai-eagu.onrender.com',
    featured: true,
    details: true,
  },
  {
    slug: 'coding-agent-harness',
    title: 'Claude Code Harness',
    tagline: 'A coding agent that runs from your terminal',
    description:
      'An agent runtime built from scratch and shipped as versioned releases. It plans, calls tools, edits files and runs commands in a loop until the job is done, with one interface over more than one model provider. The gateway and the terminal client are separate, so it can be driven from anywhere.',
    period: '2026, in progress',
    role: 'Author',
    stack: ['Python', 'FastAPI', 'Tool calling', 'Groq', 'OpenAI'],
    highlight: 'Versioned releases, v0.4 complete',
    status: 'building',
    featured: true,
    details: true,
  },
  {
    slug: 'osint-engine',
    title: 'OSINT Engine',
    tagline: 'Turns a name into a finished intelligence report',
    description:
      'Give it a person or a company and it does the searching: social discovery, domain and infrastructure checks, corporate records, then writes up what it found as Markdown, JSON or a formatted PDF. Installs as a command line tool, and the sources behind each step are swappable.',
    period: '2026',
    role: 'Author',
    stack: ['Python', 'asyncio', 'Pydantic', 'CLI', 'PDF reports'],
    highlight: 'Ships as a command line tool, not a notebook',
    status: 'live',
    github: 'https://github.com/tsvlgd/osint-engine',
    live: 'https://osint-prototype.streamlit.app/',
    featured: true,
    details: true,
  },
  {
    slug: 'flyrank-backend',
    title: 'FlyRank Backend',
    tagline: 'The service I am building at FlyRank',
    description:
      'The task API behind the platform I work on. Async throughout, with pooled database connections, migrations that run on startup, search and filtering handled in the database rather than in memory, and a readiness probe that fails loudly when either datastore is unhappy. Authentication and rate limiting are the next layer.',
    period: '2026',
    role: 'Backend Engineer',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Alembic', 'Docker'],
    highlight: '13 integration tests passing against a real database',
    status: 'active',
    github: 'https://github.com/tsvlgd/flyrank-backend',
    featured: true,
    details: true,
  },
  {
    slug: 'rl-code-review-agent',
    title: 'RL Code Review Agent',
    tagline: 'Teaches an agent to review code, one difficulty at a time',
    description:
      'A training environment for code review agents with three tiers: formatting first, then security holes, then genuinely hard structural problems. An agent only advances when it actually solves the tier. Scoring blends whether the code still works with how clean it is, so the shortest fix does not win by default. Live as a Hugging Face Space.',
    period: '2026',
    role: 'Author',
    stack: ['Python', 'Reinforcement learning', 'Ruff', 'Docker'],
    highlight: 'Live on Hugging Face with a 7B baseline agent',
    status: 'live',
    github: 'https://github.com/tsvlgd/rl-agent',
    live: 'https://huggingface.co/spaces/imsavvylegend/rl-code-review-agent',
    featured: true,
    details: true,
  },
  {
    slug: 'fullstack-ml',
    title: 'Full Stack ML',
    tagline: 'Raw data all the way to a served, tracked model',
    description:
      'Churn prediction taken end to end: validation that refuses bad data, training with imbalance handled properly, every run tracked so results are reproducible, then a service and a small interface in front of it, deployed automatically on merge.',
    period: '2026',
    role: 'Author',
    stack: ['Python', 'XGBoost', 'MLflow', 'FastAPI', 'Docker', 'Actions'],
    highlight: 'Validate, train, track, serve, deploy',
    status: 'live',
    github: 'https://github.com/tsvlgd/fullstack-ML',
    live: 'https://huggingface.co/spaces/imsavvylegend/TelcoChurn-ML-Demo',
    featured: true,
    details: true,
  },
  {
    slug: 'agentic-patterns',
    title: 'Agentic Patterns',
    tagline: 'The four agent patterns, no framework in the way',
    description:
      'Reflection, tool use, planning and multi agent, each written directly against the model provider. No orchestration library, so every pattern is short enough to read in one sitting and you can see exactly why each one behaves the way it does.',
    period: '2025',
    role: 'Author',
    stack: ['Python', 'Groq', 'Agents'],
    highlight: 'Deliberately framework free',
    status: 'live',
    github: 'https://github.com/tsvlgd/agentic-patterns',
    featured: false,
    details: true,
  },
  {
    slug: 'gpt-from-scratch',
    title: 'GPT from Scratch',
    tagline: 'A working language model, built block by block',
    description:
      'Attention, positional encoding, normalisation and sampling, written out in PyTorch with nothing hidden. Useful for anyone who wants to know what sits underneath a language model instead of taking it on faith.',
    period: '2026',
    role: 'Author',
    stack: ['Python', 'PyTorch', 'Transformers'],
    highlight: 'About 10M parameters, trained from zero',
    status: 'live',
    github: 'https://github.com/tsvlgd/gpt-from-scratch',
    featured: false,
    details: false,
  },
  {
    slug: 'micrograd',
    title: 'micrograd',
    tagline: 'Automatic differentiation, small enough to read',
    description:
      'A tiny autograd engine where every operation is a scalar, plus a small neural network library on top with a familiar API. It installs as a package, and reading it end to end is the fastest way to understand what a framework is doing for you.',
    period: '2026',
    role: 'Author',
    stack: ['Python', 'Autograd'],
    highlight: 'Installable, not just a notebook',
    status: 'live',
    github: 'https://github.com/tsvlgd/micrograd',
    featured: false,
    details: false,
  },
  {
    slug: 'mle',
    title: 'MLE from First Principles',
    tagline: 'Machine learning engineering, written down',
    description:
      'A structured knowledge base: hand written implementations, Kaggle work, and tooling I wrote to keep the notebooks tidy. Finished material is kept apart from experiments still running, so it is obvious what to trust.',
    period: '2026',
    role: 'Author',
    stack: ['Python', 'NumPy', 'Jupyter'],
    highlight: '188 commits, 17 stars',
    status: 'live',
    github: 'https://github.com/tsvlgd/MLE',
    featured: false,
    details: false,
  },
];

/** Home page shows this many projects before linking to the full catalogue. */
export const FEATURED_LIMIT = 4;

export const featuredProjects = projects.filter((project) => project.featured);
