import { ReactNode } from "react";

interface AboutCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export default function AboutCard({ title, children, icon }: AboutCardProps) {
  return (
    <div className="bg-white rounded-[16px] p-8 md:p-10 shadow-md hover:shadow-lg transition-shadow duration-300">
      {icon && (
        <div className="w-14 h-14 bg-ieee-blue/10 rounded-xl flex items-center justify-center mb-6">
          {icon}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-ieee-blue mb-6">
        {title}
      </h2>
      <div
        className="prose prose-lg max-w-none
        prose-p:text-neutral-600 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-lg
        prose-ul:my-6 prose-ul:space-y-3
        prose-li:text-neutral-600 prose-li:leading-relaxed prose-li:text-base
        prose-strong:text-neutral-800 prose-strong:font-semibold
        prose-a:text-ieee-blue prose-a:no-underline hover:prose-a:underline"
      >
        {children}
      </div>
    </div>
  );
}
