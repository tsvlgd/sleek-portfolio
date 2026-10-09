import ContactForm from '@/components/contact/ContactForm';
import { contactConfig } from '@/config/Contact';
import { socialLinks } from '@/config/Hero';
import { generateMetadata as getMetadata } from '@/config/Meta';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/contact'),
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-16 sm:pt-9 sm:pb-20">
      <h1 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
        {contactConfig.title}
      </h1>
      <p className="text-muted-foreground mt-3 max-w-xl text-[15px] leading-7">
        {contactConfig.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent hover:border-accent/40 border-border flex size-9 items-center justify-center rounded-lg border transition-colors [&>svg]:size-4"
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>

      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
