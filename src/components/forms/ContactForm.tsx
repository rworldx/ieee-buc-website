'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;
      
      if (!formspreeUrl) {
        console.error('Formspree URL not configured');
        setSubmitStatus('error');
        return;
      }

      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-neutral-800 mb-2">
          Name *
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:border-transparent transition-colors"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-neutral-800 mb-2">
          Email *
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:border-transparent transition-colors"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-neutral-800 mb-2">
          Subject *
        </label>
        <input
          {...register('subject')}
          type="text"
          id="subject"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:border-transparent transition-colors"
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-800 mb-2">
          Message *
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={6}
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ieee-blue focus:border-transparent resize-none transition-colors"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center px-6 py-4 bg-ieee-blue text-white rounded-lg font-semibold hover:bg-ieee-blue-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? (
          'Sending...'
        ) : (
          <>
            Send Message
            <Send size={18} className="ml-2" />
          </>
        )}
      </button>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg text-green-800" role="status">
          <CheckCircle size={20} className="mr-3 flex-shrink-0" />
          <p>Thank you! Your message has been sent successfully.</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg text-red-800" role="alert">
          <AlertCircle size={20} className="mr-3 flex-shrink-0" />
          <p>Sorry, something went wrong. Please try again later or email us directly.</p>
        </div>
      )}
    </form>
  );
}

