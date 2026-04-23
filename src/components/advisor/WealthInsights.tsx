'use client';

import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, ShieldAlert, PiggyBank, ArrowRight } from 'lucide-react';

const INSIGHTS = [
  {
    id: 1,
    title: 'Optimize Your 50/30/20 Rule',
    description: "Based on recent trends, your 'Wants' category is taking up 42% of your income. Try reducing dining out to hit the 30% target.",
    icon: Lightbulb,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-500/10',
    borderColor: 'border-amber-200 dark:border-amber-500/20'
  },
  {
    id: 2,
    title: 'Emergency Fund Alert',
    description: "You have ₹45,000 in savings, which covers about 1.5 months of expenses. Aim for 3-6 months (₹90k - ₹180k) for better security.",
    icon: ShieldAlert,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-500/10',
    borderColor: 'border-rose-200 dark:border-rose-500/20'
  },
  {
    id: 3,
    title: 'Investment Opportunity',
    description: "You have consistently saved over 20% of your income for the past 3 months. Consider moving ₹10,000/mo into an index fund.",
    icon: TrendingUp,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-500/10',
    borderColor: 'border-emerald-200 dark:border-emerald-500/20'
  },
  {
    id: 4,
    title: 'Debt Avalanche Strategy',
    description: "Focus extra payments on your credit card debt (18% interest) before your car loan (7% interest) to save money long-term.",
    icon: PiggyBank,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    borderColor: 'border-blue-200 dark:border-blue-500/20'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
};

export default function WealthInsights() {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 overflow-y-auto custom-scrollbar">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AI Insights</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Personalized strategies to optimize your financial growth.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {INSIGHTS.map((insight) => (
          <motion.div 
            key={insight.id}
            variants={itemVariants}
            className={`p-5 rounded-xl border ${insight.borderColor} ${insight.bgColor} transition-all hover:shadow-md cursor-default group`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-white dark:bg-slate-800 shadow-sm ${insight.color}`}>
                <insight.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {insight.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className={`text-sm font-semibold flex items-center gap-1 ${insight.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                Take Action <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
