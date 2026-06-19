import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import { TrackedLink } from '../common/TrackedLink';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function Hero() {
  const { name, title, avatar, skills, description } = heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="text-primary whitespace-pre-wrap">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container>
      {/* Hero: Avatar + Name Row */}
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt="hero"
          width={96}
          height={96}
          className="size-24 rounded-full bg-blue-300 object-cover dark:bg-yellow-300"
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold whitespace-nowrap sm:text-2xl">
            {name}
          </h1>
          <p className="text-secondary flex flex-wrap items-center gap-x-1 gap-y-1 text-base">
            <span>{title}</span>
            <span>·</span>
            <a
              href="mailto:ml.mehfooj@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              ml.mehfooj@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="text-secondary mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm whitespace-pre-wrap">
        {renderDescription()}
      </div>

      {/* Social Links */}
      <div className="mt-4 flex flex-wrap gap-0.5">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <TrackedLink
                href={link.href}
                className="text-secondary hover:text-foreground flex items-center justify-center p-1.5 transition-colors"
                track={{
                  name: 'external_link_click',
                  data: {
                    url: link.href,
                    text: link.name,
                    location: 'hero_social',
                  },
                }}
              >
                <span className="size-[18px]">{link.icon}</span>
              </TrackedLink>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
}
