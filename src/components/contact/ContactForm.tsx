'use client';

import { contactConfig } from '@/config/Contact';
import { useUmami } from '@/hooks/use-umami';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

/**
 * Phone is deliberately absent.
 *
 * The old form required it, which is a conversion tax on a portfolio contact
 * form for no benefit — an email is enough to reply to.
 */
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(100),
  email: z.string().email('Please enter a valid email address.'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(1000, 'Message must not exceed 1000 characters.'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const fieldClass =
  'w-full rounded-lg border border-input bg-transparent px-3 py-2.5 text-[15px] ' +
  'transition-colors placeholder:text-muted-foreground/60 ' +
  'focus-visible:border-accent/60 focus-visible:outline-none';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useUmami();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      trackEvent({
        name: 'form_submit',
        data: { formId: 'contact', success: response.ok },
      });

      if (response.ok) {
        toast.success(contactConfig.form.successMessage);
        form.reset();
      } else {
        trackEvent({
          name: 'form_error',
          data: { formId: 'contact', errorType: 'request_failed' },
        });
        toast.error(result.error || contactConfig.form.errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      trackEvent({
        name: 'form_submit',
        data: { formId: 'contact', success: false },
      });
      trackEvent({
        name: 'form_error',
        data: { formId: 'contact', errorType: 'network_error' },
      });
      toast.error(contactConfig.form.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="contact-name"
            className="micro-label block normal-case"
          >
            {contactConfig.form.labels.name}
          </label>
          <input
            id="contact-name"
            autoComplete="name"
            placeholder={contactConfig.form.placeholders.name}
            aria-invalid={!!errors.name}
            className={fieldClass}
            {...register('name')}
          />
          {errors.name ? (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="contact-email"
            className="micro-label block normal-case"
          >
            {contactConfig.form.labels.email}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={contactConfig.form.placeholders.email}
            aria-invalid={!!errors.email}
            className={fieldClass}
            {...register('email')}
          />
          {errors.email ? (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="contact-message"
          className="micro-label block normal-case"
        >
          {contactConfig.form.labels.message}
        </label>
        <textarea
          id="contact-message"
          rows={6}
          placeholder={contactConfig.form.placeholders.message}
          aria-invalid={!!errors.message}
          className={`${fieldClass} resize-y`}
          {...register('message')}
        />
        {errors.message ? (
          <p className="text-destructive text-xs">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {contactConfig.form.submitPending}
          </>
        ) : (
          <>
            {contactConfig.form.submitIdle}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
