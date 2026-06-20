import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import { TrackedLink } from './TrackedLink';

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
          {/* Navigate */}
          <div className="flex-1">
            <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
              Navigate
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {navbarConfig.navItems.map((item) => (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  track={{
                    name: 'button_click',
                    data: { buttonId: item.label, section: 'footer' },
                  }}
                >
                  {item.label}
                </TrackedLink>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex max-w-[170px] flex-wrap gap-2">
              {socialLinks.map((link) => (
                <TrackedLink
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground flex size-[38px] items-center justify-center rounded-[10px] border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all hover:bg-white/[0.08]"
                  track={{
                    name: 'external_link_click',
                    data: {
                      url: link.href,
                      text: link.name,
                      location: 'footer',
                    },
                  }}
                >
                  <span className="size-4">{link.icon}</span>
                </TrackedLink>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-border/40 mt-12 border-t pt-8">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Mehfooj Alam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
