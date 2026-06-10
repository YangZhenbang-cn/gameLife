'use client';

import { motion } from 'framer-motion';
import { HealthInfo } from '@/lib/types';

interface HealthCardProps {
  health: HealthInfo;
}

export default function HealthCard({ health }: HealthCardProps) {
  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <h3 className="section-title">❤ 健康卡</h3>

      <div className="space-y-3">
        {/* 体质 */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold" style={{ color: 'var(--accent)' }}>
            体质类型：
          </span>
          <span className="tag text-xs">{health.constitution}</span>
        </div>

        {/* 病史 */}
        <div>
          <span className="text-xs font-bold block mb-1" style={{ color: 'var(--accent)' }}>
            既往病史：
          </span>
          <div className="flex flex-wrap gap-1">
            {health.medicalHistory.length > 0 ? (
              health.medicalHistory.map((item, i) => (
                <span
                  key={i}
                  className="tag text-xs"
                  style={{ backgroundColor: 'var(--warning)', color: 'var(--bg-primary)' }}
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                无记录
              </span>
            )}
          </div>
        </div>

        {/* 过敏源（警示色） */}
        <div>
          <span className="text-xs font-bold block mb-1" style={{ color: 'var(--accent)' }}>
            过敏源：
          </span>
          <div className="flex flex-wrap gap-1">
            {health.allergies.length > 0 ? (
              health.allergies.map((item, i) => (
                <motion.span
                  key={i}
                  className="tag text-xs"
                  style={{
                    backgroundColor: 'var(--danger)',
                    color: 'var(--bg-primary)',
                    border: '2px solid var(--danger)',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                >
                  ⚠ {item}
                </motion.span>
              ))
            ) : (
              <span className="text-xs" style={{ color: 'var(--success)' }}>
                ✔ 无已知过敏源
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
