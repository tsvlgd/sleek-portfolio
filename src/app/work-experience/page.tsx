import Container from '@/components/common/Container';
import { ExperienceCard } from '@/components/experience/ExperienceCard';
import Github from '@/components/landing/Github';
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
    <>
      <Container className="mt-10 sm:mt-10">
        <div className="space-y-0">
          <h1 className="text-foreground text-2xl font-bold tracking-tight">
            Work Experience
          </h1>
          <p className="text-secondary text-xs md:text-base">
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
      <Github />
    </>
  );
}
