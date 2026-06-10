'use client';

import { motion } from 'framer-motion';
import { CustomAttribute } from '@/lib/types';

interface AttributePanelProps {
  attributes: CustomAttribute[];
}

export default function AttributePanel({ attributes }: AttributePanelProps) {
  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="section-title">&#x1f4ca; 自定义属性</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {attributes.map((attr, index) => {
          const percent = Math.min(Math.round((attr.value / attr.max) * 100), 100);
          return (
            <motion.div
              key={attr.key}
              className="group relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {attr.label}
                </span>
                <span
                  className="font-mono text-xs ml-auto"
                  style={{ color: 'var(--accent)' }}
                >
                  {attr.value} / {attr.max}
                </span>
              </div>

              <div className="progress-bar">
                <motion.div
                  className="progress-bar-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                />
              </div>

              {/* 悬停提示 */}
              <div
                className="absolute left-0 right-0 top-full mt-2 p-3 rounded z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)',
                }}
              >
                {attr.desc}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}