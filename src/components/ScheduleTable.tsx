'use client';

import { motion } from 'framer-motion';
import { ScheduleData } from '@/lib/types';

interface ScheduleTableProps {
  schedule: ScheduleData;
}

export default function ScheduleTable({ schedule }: ScheduleTableProps) {
  const rows: Array<{ label: string; icon: string; value: string }> = [
    { label: '起床', icon: '&#x1f305;', value: schedule.wakeUp },
    { label: '工作时间', icon: '&#x1f4bc;', value: schedule.workHours },
    { label: '午休', icon: '&#x1f35c;', value: schedule.lunchBreak },
    { label: '就寝', icon: '&#x1f319;', value: schedule.sleep },
    { label: '周末', icon: '&#x1f389;', value: schedule.weekend },
    { label: '通勤', icon: '&#x1f687;', value: schedule.commute },
    { label: '饮食', icon: '&#x1f372;', value: schedule.diet },
  ];

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
    >
      <h3 className="section-title">&#x1f4c5; 作息时间轴</h3>

      {/* 时间轴 */}
      <div className="space-y-0 mb-4">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            className="flex items-center gap-3 py-2 px-2 border-l-2"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent',
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <span className="text-lg flex-shrink-0 w-8 text-center">{row.icon}</span>
            <span className="text-xs font-bold w-16 flex-shrink-0" style={{ color: 'var(--accent)' }}>
              {row.label}
            </span>
            <span className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 常去地点 */}
      <div className="mb-3">
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
          &#x1f4cd; 常去地点
        </h4>
        <div className="flex flex-wrap gap-1">
          {schedule.frequentPlaces.map((place, i) => (
            <span key={i} className="tag text-xs">{place}</span>
          ))}
        </div>
      </div>

      {/* 娱乐 */}
      <div>
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
          &#x1f3ae; 娱乐方式
        </h4>
        <div className="flex flex-wrap gap-1">
          {schedule.entertainment.map((item, i) => (
            <span
              key={i}
              className="tag text-xs"
              style={{ backgroundColor: 'var(--success)', color: 'var(--bg-primary)' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
