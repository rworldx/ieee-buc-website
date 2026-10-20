"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, Mail } from "lucide-react";
import { useSite } from "../providers/SiteProvider";
export default function ContactForm({
  recipientEmail,
}: {
  recipientEmail: string;
}) {
  const { t } = useSite();
  const [status, setStatus] = useState<"idle" | "draft" | "error">("idle");
  const schema = z.object({
    name: z.string().trim().min(2, t.nameError).max(100, t.maxError),
    email: z.string().trim().email(t.emailError).max(254, t.maxError),
    subject: z.string().trim().min(3, t.subjectError).max(150, t.maxError),
    message: z.string().trim().min(10, t.messageError).max(2000, t.maxError),
  });
  type Data = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>({ resolver: zodResolver(schema) });
  function submit(data: Data) {
    const body = `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    try {
      window.location.assign(
        `mailto:${recipientEmail}?subject=${encodeURIComponent(`[IEEE BUC] ${data.subject}`)}&body=${encodeURIComponent(body)}`,
      );
      setStatus("draft");
    } catch {
      setStatus("error");
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">{t.formTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t.draftNote}</p>
        <p className="mt-3 text-xs text-muted">{t.required}</p>
      </div>
      {(
        [
          {
            name: "name",
            label: t.name,
            placeholder: t.namePlaceholder,
            autoComplete: "name",
            type: "text",
            max: 100,
          },
          {
            name: "email",
            label: t.email,
            placeholder: "you@example.com",
            autoComplete: "email",
            type: "email",
            max: 254,
          },
          {
            name: "subject",
            label: t.subject,
            placeholder: t.subjectPlaceholder,
            autoComplete: "off",
            type: "text",
            max: 150,
          },
        ] as const
      ).map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-sm font-medium"
          >
            {field.label}
          </label>
          <input
            {...register(field.name)}
            id={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            maxLength={field.max}
            required
            placeholder={field.placeholder}
            dir={field.name === "email" ? "ltr" : undefined}
            className="form-field"
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={
              errors[field.name] ? `${field.name}-error` : undefined
            }
          />
          {errors[field.name] && (
            <p
              id={`${field.name}-error`}
              role="alert"
              className="mt-2 text-sm font-medium text-ink"
            >
              {errors[field.name]?.message}
            </p>
          )}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {t.message}
        </label>
        <textarea
          {...register("message")}
          id="message"
          required
          rows={6}
          maxLength={2000}
          placeholder={t.messagePlaceholder}
          className="form-field resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p
            id="message-error"
            role="alert"
            className="mt-2 text-sm font-medium"
          >
            {errors.message.message}
          </p>
        )}
      </div>
      <button type="submit" className="button-primary w-full">
        {t.openDraft}
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      {status !== "idle" && (
        <p
          className="rounded-xl border border-line bg-surface-soft p-4 text-sm leading-relaxed"
          role="status"
        >
          {status === "draft" ? t.draftOpened : t.draftError}
        </p>
      )}
      <p className="text-xs leading-relaxed text-muted">{t.privacy}</p>
      <p className="border-t border-line pt-4 text-sm text-muted">
        {t.directEmail}
        <br />
        <a href={`mailto:${recipientEmail}`} className="action-link break-all">
          <Mail size={16} aria-hidden="true" />
          <bdi>{recipientEmail}</bdi>
        </a>
      </p>
    </form>
  );
}
