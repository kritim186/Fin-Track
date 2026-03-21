import { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight transition-colors">{title}</h2>
        {subtitle && (
          <p className="mt-1.5 text-sm sm:text-base text-gray-500 dark:text-gray-400 font-medium transition-colors">{subtitle}</p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
