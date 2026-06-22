'use client';

import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { cn } from '@/lib/utils';
import { Check, Copy, LocateFixed } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import { TrackedLink } from '../common/TrackedLink';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const LiveClock = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(`${formatter.format(new Date())} IST`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div className="text-foreground tracking-wider">{time || '...'}</div>;
};

export default function Hero() {
  const { name, title, avatar2 } = heroConfig;
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ml.mehfooj@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      {/* Hero: Avatar + Identity + Location/Clock */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Left: Avatar & Name */}
        <div className="flex items-center gap-4">
          <div className="relative inline-flex overflow-hidden rounded-full p-[2px]">
            <span className="absolute inset-[-1000%] hidden animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)] dark:block" />
            <div className="bg-background relative inline-flex h-full w-full items-center justify-center rounded-full">
              <div
                className="group relative size-16 shrink-0 cursor-pointer [perspective:1000px] sm:size-24"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <div
                  className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:scale-105 ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                >
                  <Image
                    src={avatar2}
                    alt="hero front"
                    fill
                    className="absolute inset-0 rounded-full bg-blue-300 object-cover ring-2 ring-white/10 [backface-visibility:hidden] dark:bg-yellow-300 dark:brightness-[0.85] dark:grayscale-[20%]"
                  />
                  <Image
                    src="/assets/me1.jpeg" // Using placeholder image for back face
                    alt="hero back"
                    fill
                    className="absolute inset-0 [transform:rotateY(180deg)] rounded-full bg-blue-300 object-cover ring-2 ring-white/10 [backface-visibility:hidden] dark:bg-yellow-300 dark:brightness-[0.85] dark:grayscale-[20%]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-foreground flex items-center gap-1.5 text-[30px] leading-7 font-bold tracking-tight">
              {name}
              {/* Verified Badge */}
              <Image
                src="/assets/blue-twitter-verified-sign.png"
                alt="Verified"
                width={16}
                height={16}
                className="mt-0 size-6 object-contain"
              />
            </h1>
            <div className="text-muted-foreground text-md flex flex-wrap items-center gap-1.5 font-medium">
              <p>{title}</p>
              <span>·</span>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-gray-800 dark:hover:text-[#E5E7EB]"
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

        {/* Right: Location & Clock */}
        <div className="text-muted-foreground/80 flex flex-col gap-1 font-mono text-sm sm:items-end">
          <div className="flex items-center gap-1.5">
            <LocateFixed className="size-4" />
            <span>New Delhi, IN</span>
          </div>
          <LiveClock />
        </div>
      </div>

      {/* Bio */}
      <p className="text-muted-foreground mt-6 text-[16px] leading-relaxed">
        I build AI applications, intelligence platforms, and backend systems
        using..
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-[14px]">
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

      {/* Social Links */}
      <div className="mt-4 flex flex-wrap items-center gap-1">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <TrackedLink
                href={link.href}
                className={cn(
                  'text-muted-foreground hover:bg-muted flex size-8 items-center justify-center rounded-md transition-colors',
                  link.hoverClass,
                )}
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
