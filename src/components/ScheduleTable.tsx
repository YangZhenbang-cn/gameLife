'use client';

import { motion } from 'framer-motion';
import { ScheduleData } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  schedule: ScheduleData;
  onUpdate?: (path: string[], value: unknown) => void;
}

function editClass(isEditing: boolean) {
  return `editable-area${isEditing ? ' editing' : ''}`;
}

export default function ScheduleTable({ schedule, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();

  const handleText = (path: string[], label: string, value: string) => {
    if (isEditing && onUpdate) openModal({ type: 'text', label, value, onSave: (v: string) => onUpdate(path, v) });
  };
  const handleTags = (path: string[], label: string, value: string[]) => {
    if (isEditing && onUpdate) openModal({ type: 'tags', label, value, onSave: (v: string[]) => onUpdate(path, v) });
  };

  const rows: Array<{ label: string; icon: string; value: string; path: string[] }> = [
    { label: '起床', icon: '🌅', value: schedule.wakeUp, path: ['schedule', 'wakeUp'] },
    { label: '工作', icon: '💼', value: schedule.workHours, path: ['schedule', 'workHours'] },
    { label: '午休', icon: '🍜', value: schedule.lunchBreak, path: ['schedule', 'lunchBreak'] },
    { label: '就寝', icon: '🌙', value: schedule.sleep, path: ['schedule', 'sleep'] },
    { label: '周末', icon: '🎉', value: schedule.weekend, path: ['schedule', 'weekend'] },
    { label: '通勤', icon: '🚇', value: schedule.commute, path: ['schedule', 'commute'] },
    { label: '饮食', icon: '🍲', value: schedule.diet, path: ['schedule', 'diet'] },
  ];

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
      <h3 className="section-title">&#x1f4c5; 作息时间轴</h3>

      <div className="space-y-0 mb-4">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center gap-3 py-2 px-2 border-l-2"
            style={{ borderColor: 'var(--border-color)', backgroundColor: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent' }}
          >
            <span className="text-lg flex-shrink-0 w-8 text-center">{row.icon}</span>
            <span className="text-xs font-bold w-16 flex-shrink-0" style={{ color: 'var(--accent)' }}>{row.label}</span>
            <span
              className={`text-sm font-mono ${editClass(isEditing)}`}
              style={{ color: 'var(--text-primary)' }}
              onClick={() => handleText(row.path, row.label, row.value)}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mb-3">
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>&#x1f4cd; 常去地点</h4>
        <div
          className={`flex flex-wrap gap-1 ${editClass(isEditing)}`}
          onClick={() => handleTags(['schedule', 'frequentPlaces'], '常去地点', schedule.frequentPlaces)}
        >
          {schedule.frequentPlaces.map((p, i) => (
            <span key={i} className="tag text-xs">{p}</span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>&#x1f3ae; 娱乐方式</h4>
        <div
          className={`flex flex-wrap gap-1 ${editClass(isEditing)}`}
          onClick={() => handleTags(['schedule', 'entertainment'], '娱乐方式', schedule.entertainment)}
        >
          {schedule.entertainment.map((e, i) => (
            <span key={i} className="tag text-xs" style={{ backgroundColor: 'var(--success)', color: 'var(--bg-primary)' }}>{e}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}