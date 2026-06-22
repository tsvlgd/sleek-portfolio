import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import { cn } from '@/lib/utils';
import React from 'react';

import { TrackedLink } from './TrackedLink';

export default function Footer() {
  return (
    <footer className="mt-20 pb-12">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="flex flex-col items-center gap-8 text-center sm:gap-10">
          {/* Navigate */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {navbarConfig.navItems.map((item) => (
              <TrackedLink
                key={item.label}
                href={item.href}
                className="text-muted-foreground text-sm font-medium transition-colors hover:text-gray-800 dark:hover:text-[#E5E7EB]"
                track={{
                  name: 'button_click',
                  data: { buttonId: item.label, section: 'footer' },
                }}
              >
                {item.label}
              </TrackedLink>
            ))}
          </div>

          {/* Connect */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <TrackedLink
                key={link.name}
                href={link.href}
                className={cn(
                  'text-muted-foreground flex size-[42px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/[0.08]',
                  link.hoverClass,
                )}
                track={{
                  name: 'external_link_click',
                  data: {
                    url: link.href,
                    text: link.name,
                    location: 'footer',
                  },
                }}
              >
                <span className="size-5">{link.icon}</span>
              </TrackedLink>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-border/40 mt-12 flex items-center justify-center border-t pt-8">
          <p className="text-muted-foreground/60 text-sm">
            © {new Date().getFullYear()} Mehfooj Alam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
