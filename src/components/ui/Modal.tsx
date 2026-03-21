'use client';

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="fixed inset-0 bg-gray-900/40 dark:bg-black/60 backdrop-blur-[2px] transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 sm:p-8 text-left align-middle shadow-2xl transition-all duration-300 scale-100 opacity-100 animate-in fade-in zoom-in-95 ring-1 ring-gray-900/5 dark:ring-white/10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
