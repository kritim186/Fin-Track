import { Metadata } from 'next';
import WealthInsights from '@/components/advisor/WealthInsights';
import AIChat from '@/components/advisor/AIChat';

export const metadata: Metadata = {
  title: 'AI Advisor | FinTrack',
  description: 'Personalized wealth building insights and AI financial advisor.',
};

export default function AdvisorPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">AI Wealth Advisor</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Get personalized insights and chat with our AI to optimize your financial growth.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Left Column: Wealth Insights */}
        <div className="lg:col-span-5 h-full min-h-0">
          <WealthInsights />
        </div>

        {/* Right Column: AI Chat */}
        <div className="lg:col-span-7 h-full min-h-0">
          <AIChat />
        </div>
      </div>
    </div>
  );
}
