'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type CashFlowItem = {
  month: string;
  income: number;
  expense: number;
};

export default function CashFlowChart({
  data,
}: {
  data: CashFlowItem[];
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="income" stroke="#16a34a" />
        <Line type="monotone" dataKey="expense" stroke="#dc2626" />
      </LineChart>
    </ResponsiveContainer>
  );
}
