'use client';

import { motion } from 'framer-motion';
import { TasksData } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  tasks: TasksData;
  onSideTaskToggle: (index: number) => void;
  onDailyTaskToggle: (index: number) => void;
  onUpdate?: (path: string[], value: unknown) => void;
}

export default function TaskPanel({ tasks, onSideTaskToggle, onDailyTaskToggle, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();

  const mkText = (path: string[], label: string, value: string) => ({
    className: `editable-area ${isEditing ? 'editing' : ''}`,
    onClick: isEditing && onUpdate ? () => openModal({ type: 'text', label, value, onSave: (v: string) => onUpdate(path, v) }) : undefined,
  });

  const mkTasks = (path: string[], label: string, items: Array<{ title: string; done?: boolean }>) => ({
    className: `editable-area ${isEditing ? 'editing' : ''}`,
    onClick: isEditing && onUpdate ? () => openModal({
      type: 'tasks',
      label,
      value: items.map(t => t.title),
      onSave: (v: string[]) => {
        const updated = v.map((title, i) => ({ title, done: items[i]?.done ?? false }));
        onUpdate(path, updated);
      },
    }) : undefined,
  });

  const pct = Math.min(tasks.main.progress, 100);

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <h3 className="section-title">📋 任务面板</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主线 */}
        <div>
          <h4 className="font-mono text-sm mb-3 pb-2" style={{ color: 'var(--accent)', borderBottom: '2px solid var(--accent)' }}>⭐ 主线任务</h4>
          <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div {...mkText(['tasks', 'main', 'title'], '主线标题', tasks.main.title)} className="flex items-start justify-between gap-2 mb-2">
              <h5 className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{tasks.main.title}</h5>
              <span className="tag text-xs">{tasks.main.progress}%</span>
            </div>
            <div className="progress-bar mb-1" style={{ height: '10px' }}>
              <motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
            </div>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>截止日期：{tasks.main.deadline}</div>
          </div>
        </div>

        {/* 支线 */}
        <div>
          <h4 className="font-mono text-sm mb-3 pb-2" style={{ color: 'var(--warning)', borderBottom: '2px solid var(--warning)' }}>🔹 支线任务</h4>
          <div {...mkTasks(['tasks', 'side'], '支线任务', tasks.side)} className="space-y-2">
            {tasks.side.map((q, i) => (
              <div
                key={i}
                className="p-3 rounded flex items-center gap-3 cursor-pointer"
                style={{ backgroundColor: q.done ? 'var(--progress-bg)' : 'var(--bg-secondary)', border: `1px solid ${q.done ? 'var(--success)' : 'var(--border-color)'}`, opacity: q.done ? 0.6 : 1 }}
                onClick={(e) => { e.stopPropagation(); onSideTaskToggle(i); }}
              >
                <motion.div className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center" style={{ border: `2px solid ${q.done ? 'var(--success)' : 'var(--border-color)'}`, backgroundColor: q.done ? 'var(--success)' : 'transparent' }} animate={q.done ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                  {q.done && <span className="text-sm">✓</span>}
                </motion.div>
                <span className={`font-mono text-sm flex-1 ${q.done ? 'line-through' : ''}`} style={{ color: q.done ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{q.title}</span>
                {q.done && <span style={{ color: 'var(--success)' }}>✨</span>}
              </div>
            ))}
          </div>
        </div>

        {/* 每日 */}
        <div>
          <h4 className="font-mono text-sm mb-3 pb-2" style={{ color: 'var(--success)', borderBottom: '2px solid var(--success)' }}>🔄 每日任务</h4>
          <div {...mkTasks(['tasks', 'daily'], '每日任务', tasks.daily)} className="space-y-2">
            {tasks.daily.map((q, i) => (
              <div
                key={i}
                className="p-3 rounded flex items-center gap-3 cursor-pointer"
                style={{ backgroundColor: q.done ? 'var(--progress-bg)' : 'var(--bg-secondary)', border: `1px solid ${q.done ? 'var(--success)' : 'var(--border-color)'}`, opacity: q.done ? 0.6 : 1 }}
                onClick={(e) => { e.stopPropagation(); onDailyTaskToggle(i); }}
              >
                <motion.div className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center" style={{ border: `2px solid ${q.done ? 'var(--success)' : 'var(--border-color)'}`, backgroundColor: q.done ? 'var(--success)' : 'transparent' }} animate={q.done ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }}>
                  {q.done && <span className="text-xs">✓</span>}
                </motion.div>
                <span className={`font-mono text-sm flex-1 ${q.done ? 'line-through' : ''}`} style={{ color: q.done ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{q.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
