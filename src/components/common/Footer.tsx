import { footerConfig } from '@/config/Footer';
import { socialLinks } from '@/config/Hero';
import { navbarConfig } from '@/config/Navbar';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      data-site-chrome=""
      className="relative mx-auto w-full max-w-3xl px-4 pt-10 pb-14"
    >
      <div className="glass-strong rounded-2xl px-5 py-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="micro-label">Navigate</p>
            <nav className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {navbarConfig.navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          <div>
            <p className="micro-label">Connect</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="glass-button text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 [&>svg]:size-3.5"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Two hairlines frame the colophon. One alone reads unfinished. */}
        <div className="border-border mt-7 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
              {footerConfig.text} {footerConfig.developer}
            </p>
            <p className="text-muted-foreground/70 mt-1.5 font-mono text-xs">
              {footerConfig.copyright}
            </p>
          </div>
          <p className="text-muted-foreground/60 font-mono text-xs">
            {footerConfig.stack}
          </p>
        </div>
      </div>
    </footer>
  );
}
