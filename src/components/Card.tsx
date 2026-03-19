import { ReactNode } from 'react';

type CardProps = {
  title?: string;
  children?: ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {title && (
        <p className="mb-3 text-sm font-medium text-gray-700">{title}</p>
      )}
      {children}
    </div>
  );
}
