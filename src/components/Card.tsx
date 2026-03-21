import { ReactNode } from 'react';

type CardProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div 
      className={`group rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 sm:p-8 hover:-translate-y-1.5 hover:shadow-xl dark:shadow-black/40 hover:ring-gray-900/10 dark:hover:ring-white/10 transition-all duration-400 ease-out cursor-default ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-900 dark:group-hover:text-white">
          {title}
        </h3>
      )}
      <div className="transition-transform duration-500 group-hover:scale-[1.01] text-gray-900 dark:text-slate-100">
        {children}
      </div>
    </div>
  );
}
