'use client';

import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import { TrackedLink } from '../common/TrackedLink';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function Hero() {
  const { name, title, avatar2 } = heroConfig;
  const [copied, setCopied] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ml.mehfooj@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      {/* Hero: Avatar + Identity */}
      <div className="flex items-center gap-4">
        <div
          className="group relative size-16 cursor-pointer [perspective:1000px] sm:size-20"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:scale-105 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
          >
            <Image
              src={avatar2}
              alt="hero front"
              fill
              className="absolute inset-0 rounded-full bg-blue-300 object-cover ring-2 ring-white/10 [backface-visibility:hidden] dark:bg-yellow-300"
            />
            <Image
              src="/assets/me1.jpeg" // Using placeholder image for back face
              alt="hero back"
              fill
              className="absolute inset-0 [transform:rotateY(180deg)] rounded-full bg-blue-300 object-cover ring-2 ring-white/10 [backface-visibility:hidden] dark:bg-yellow-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-normal">{name}</h1>
          <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-base">
            <p>{title}</p>
            <span>·</span>
            <button
              onClick={handleCopyEmail}
              className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
              aria-label="Copy email"
            >
              ml.mehfooj@gmail.com
              {copied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-muted-foreground mt-6 text-base leading-relaxed">
        I build AI applications, intelligence platforms, and backend systems
        using
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        {heroConfig.skills.map((skill) => {
          const SkillComponent =
            skillComponents[skill.component as keyof typeof skillComponents];
          return (
            <Skill key={skill.name} name={skill.name} href={skill.href}>
              <SkillComponent />
            </Skill>
          );
        })}
      </div>

      {/* Social Links - tight row like ramx.in */}
      <div className="mt-4 flex flex-wrap items-center gap-1">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <TrackedLink
                href={link.href}
                className="text-muted-foreground hover:text-foreground hover:bg-muted flex size-8 items-center justify-center rounded-md transition-all"
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
