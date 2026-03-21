'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector
} from 'recharts';

type BreakdownItem = {
  name: string;
  value: number;
};

// Richer, modern financial color palette
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4'];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  
  return (
    <g>
      <text x={cx} y={cy - 12} dy={8} textAnchor="middle" fill="#111827" className="text-lg font-black tracking-tight">
        {payload.name}
      </text>
      <text x={cx} y={cy + 16} dy={8} textAnchor="middle" fill="#6b7280" className="text-sm font-semibold">
        ₹{value.toLocaleString()} 
        <tspan className="text-gray-400 font-medium ml-1"> ({(percent * 100).toFixed(0)}%)</tspan>
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="transition-all duration-300 drop-shadow-md"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 16}
        fill={fill}
        className="opacity-40"
      />
    </g>
  );
};

export default function SpendingBreakdownChart({ data }: { data: BreakdownItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="h-[320px] w-full mt-4 flex flex-col sm:flex-row items-center justify-between">
      {/* Interactive Pie Chart */}
      <div className="w-full sm:w-1/2 h-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={100}
              dataKey="value"
              onMouseEnter={onPieEnter}
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Interactive Legend */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center gap-2.5 px-4 sm:px-8 mt-6 sm:mt-0">
        {data.map((entry, index) => {
          const isActive = activeIndex === index;
          return (
            <div 
              key={entry.name} 
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                isActive ? 'bg-gray-50 ring-1 ring-gray-200/60 shadow-sm scale-[1.02]' : 'hover:bg-gray-50/50 hover:scale-[1.01]'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className={`w-3.5 h-3.5 rounded-full shadow-sm transition-transform duration-300 ${isActive ? 'scale-125' : ''}`} 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                />
                <span className={`text-sm transition-colors duration-300 ${isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                  {entry.name}
                </span>
              </div>
              <span className={`text-sm transition-colors duration-300 ${isActive ? 'font-black text-gray-900' : 'font-semibold text-gray-500'}`}>
                ₹{entry.value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
