'use client';

import { ReactNode } from 'react';

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        {children}

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
