'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { HexagramAttributes } from '@/lib/types';

interface HexagramChartProps {
  hexagram: HexagramAttributes;
}

const LABEL_MAP: Record<string, string> = {
  intelligence: '智力',
  charisma: '魅力',
  strength: '力量',
  endurance: '耐力',
  tactics: '谋略',
  creativity: '创造',
};

export default function HexagramChart({ hexagram }: HexagramChartProps) {
  const [colors, setColors] = useState({ fill: '#e76e55', stroke: '#333333', grid: '#d4c5a0' });

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setColors({
      fill: style.getPropertyValue('--progress-fill').trim() || '#e76e55',
      stroke: style.getPropertyValue('--border-color').trim() || '#333333',
      grid: style.getPropertyValue('--progress-bg').trim() || '#d4c5a0',
    });
  }, []);

  const data = useMemo(() => {
    return Object.entries(hexagram).map(([key, value]) => ({
      name: LABEL_MAP[key] || key,
      value,
      fullMark: 10,
    }));
  }, [hexagram]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="p-2 rounded text-xs"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          <span className="font-bold" style={{ color: 'var(--accent)' }}>
            {payload[0].name}
          </span>
          ：<span>{payload[0].value} / 10</span>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="section-title">⭐ 六维雷达图</h3>
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke={colors.grid} strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="name"
              tick={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                fill: 'var(--text-primary)',
              }}
            />
            <PolarRadiusAxis
              domain={[0, 10]}
              tick={{ fontSize: 10, fill: 'var(--text-secondary)' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="属性值"
              dataKey="value"
              stroke={colors.stroke}
              fill={colors.fill}
              fillOpacity={0.35}
              strokeWidth={2}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
