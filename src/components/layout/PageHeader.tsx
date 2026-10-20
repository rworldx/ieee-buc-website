import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function PageHeader({
  title,
  description,
  label,
  action,
}: {
  title: string;
  description: string;
  label: string;
  action?: { href: string; text: string };
}) {
  return (
    <section className="border-b border-line bg-surface-soft py-14 md:py-20">
      <div className="container-custom">
        <p className="mb-6 flex items-center gap-2 text-sm font-medium text-link">
          <bdi>IEEE BUC</bdi>
          <span aria-hidden="true" className="text-muted">
            /
          </span>
          {label}
        </p>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h1 className="page-title">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </p>
          </div>
          {action && (
            <Link href={action.href} className="action-link shrink-0">
              {action.text}
              <ArrowUpRight
                size={18}
                className="directional"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
