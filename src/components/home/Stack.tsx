import { Cloud, Code2, Cpu, Database, Layers, Terminal } from 'lucide-react';

/**
 * The stack, grouped by the problem being solved rather than listed as one
 * undifferentiated wall of logos.
 */
const GROUPS: Array<{
  label: string;
  jp: string;
  icon: typeof Code2;
  items: string[];
}> = [
  {
    label: 'Languages',
    jp: '言語',
    icon: Code2,
    items: ['Python', 'TypeScript', 'SQL', 'Bash', 'Go (exposure)'],
  },
  {
    label: 'Backend',
    jp: 'バックエンド',
    icon: Terminal,
    items: [
      'FastAPI',
      'Django',
      'Node.js',
      'Express',
      'REST APIs',
      'WebSockets',
      'Auth',
    ],
  },
  {
    label: 'Data',
    jp: 'データ',
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Pandas', 'ETL'],
  },
  {
    label: 'AI systems',
    jp: 'AI',
    icon: Cpu,
    items: [
      'Agent harnesses',
      'Tool calling',
      'RAG',
      'Structured output',
      'Evals',
      'LangGraph',
    ],
  },
  {
    label: 'ML',
    jp: '機械学習',
    icon: Layers,
    items: ['PyTorch', 'XGBoost', 'scikit-learn', 'Reinforcement learning'],
  },
  {
    label: 'Infrastructure',
    jp: '基盤',
    icon: Cloud,
    items: ['Docker', 'GitHub Actions', 'MLflow', 'CI/CD', 'Observability'],
  },
];

export function Stack() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {GROUPS.map((group, index) => {
          const Icon = group.icon;
          return (
            <div
              key={group.label}
              className="stagger spotlight group border-border/70 relative border-t pt-4"
              style={{ ['--i' as string]: index }}
            >
              {/* relative so the chips paint after the spotlight overlay. */}
              <div className="relative flex items-center gap-2">
                <span className="border-border/70 text-muted-foreground group-hover:text-foreground flex size-7 items-center justify-center rounded-lg border transition-colors">
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-medium">{group.label}</h3>
                <span className="micro-label-jp text-muted-foreground/50 text-[11px]">
                  {group.jp}
                </span>
              </div>
              <ul className="relative mt-3 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-border/70 text-muted-foreground rounded-full border px-2.5 py-0.5 font-mono text-[11px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
