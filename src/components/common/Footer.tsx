import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import React from 'react';

import { TrackedLink } from './TrackedLink';

export default function Footer() {
  return (
    <footer className="border-border mt-16 border-t">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          {/* Navigate */}
          <div>
            <h3 className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
              Navigate
            </h3>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {navbarConfig.navItems.map((item) => (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  className="text-secondary hover:text-foreground text-sm transition-colors"
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
            <h3 className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <TrackedLink
                  key={link.name}
                  href={link.href}
                  className="border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground flex size-9 items-center justify-center rounded-lg border transition-colors"
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
        <div className="border-border/20 mt-8 border-t pt-8">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Mehfooj Alam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
