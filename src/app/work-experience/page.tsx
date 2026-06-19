import Container from '@/components/common/Container';
import { ExperienceCard } from '@/components/experience/ExperienceCard';
import { experiences } from '@/config/Experience';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/work-experience'),
  robots: {
    index: true,
    follow: true,
  },
};

export default function WorkExperiencePage() {
  return (
    <Container className="py-16">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Work Experience</h1>
        <p className="text-secondary text-sm">
          My professional journey across different companies and roles.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-6">
        {experiences.map((experience, index) => (
          <div
            key={experience.company}
            className="animate-in fade-in slide-in-from-bottom-2"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: 'both',
            }}
          >
            <ExperienceCard experience={experience} defaultExpanded={true} />
          </div>
        ))}
      </div>
    </Container>
  );
}
