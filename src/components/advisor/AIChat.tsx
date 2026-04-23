'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from 'ai';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, StopCircle } from 'lucide-react';
import { useBudgets } from '@/features/budgets/useBudgets';
import { useGoals } from '@/features/goals/useGoals';
import { useTransactions } from '@/features/transactions/useTransactions';

export default function AIChat() {
  const { budgets } = useBudgets();
  const { goals } = useGoals();
  const { transactions } = useTransactions();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate a financial summary to pass to the AI as context
  const financialSummary = useMemo(() => {
    const totalBudget = budgets.reduce((sum, b) => sum + b.allocated, 0);
    const activeGoals = goals.map(g => `${g.name} (₹${g.currentAmount}/₹${g.targetAmount})`).join(', ');
    
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.date.startsWith(currentMonthStr)) {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
      }
    });

    return `
User's Financial Profile:
- Total Monthly Budget Allocated: ₹${totalBudget}
- Active Goals: ${activeGoals || 'None'}
- This Month's Income: ₹${income}
- This Month's Expenses: ₹${expense}
    `;
  }, [budgets, goals, transactions]);

  // Vercel AI SDK 6.x API
  const { messages: chatMessages, sendMessage, stop, error, status } = useChat({
    messages: [
      {
        id: 'initial',
        role: 'assistant',
        // @ts-ignore
        parts: [{ type: 'text', text: "Hi there! I'm your AI Financial Advisor. I have access to your current budget, goals, and spending. How can I help you grow your wealth today?" }]
      }
    ]
  });

  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    // @ts-ignore
    sendMessage({ parts: [{ type: 'text', text: input }] }, { body: { data: { financialSummary } } });
    setInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden relative">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              FinTrack AI
              <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">Live</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Google Gemini</p>
          </div>
        </div>
        {isLoading && (
          <button 
            onClick={stop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors"
          >
            <StopCircle className="w-3.5 h-3.5" /> Stop
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/20">
        <AnimatePresence initial={false}>
          {chatMessages.map((msg: UIMessage) => {
            // Support multi-part messages
            // @ts-ignore
            let contentText = msg.parts ? msg.parts.filter(p => p.type === 'text').map(p => p.text).join('') : '';

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex items-end gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' 
                    ? 'bg-slate-200 dark:bg-slate-700' 
                    : 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-slate-600 dark:text-slate-300" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-sm shadow-sm border border-gray-100 dark:border-slate-700'
                }`}>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{contentText}</p>
                </div>
              </motion.div>
            );
          })}
          
          {/* @ts-ignore */}
          {isLoading && chatMessages[chatMessages.length - 1]?.role === 'user' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="bg-white dark:bg-slate-800 px-4 py-4 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 dark:border-slate-700 flex gap-1.5 items-center">
                <motion.div className="w-2 h-2 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-blue-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
              </div>
            </motion.div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm text-center">
              An error occurred: {error.message}. Ensure your API key is correctly configured.
            </div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask your AI Advisor anything..."
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-full pl-5 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-slate-400 disabled:opacity-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full transition-colors active:scale-95"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
          </button>
        </form>
      </div>
    </div>
  );
}
