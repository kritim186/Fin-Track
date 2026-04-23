'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

type CashFlowItem = {
  month: string;
  income: number;
  expense: number;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 ring-1 ring-black/5 min-w-[160px]">
        <p className="font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest text-xs mb-3">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Income</span>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ₹{(payload[0]?.payload?.income || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Expense</span>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ₹{(payload[0]?.payload?.expense || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function CashFlowChart({ data }: { data: CashFlowItem[] }) {
  return (
    <div className="h-[320px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }}
            dy={15}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#9ca3af', fontSize: 13, fontWeight: 500 }}
            tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000) + 'k' : value}`}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#d1d5db', strokeWidth: 1, strokeDasharray: '4 4' }} 
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            stroke="#10b981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorIncome)" 
            activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            stroke="#f43f5e" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorExpense)" 
            activeDot={{ r: 6, strokeWidth: 0, fill: '#f43f5e' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
