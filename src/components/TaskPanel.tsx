'use client';

import { motion } from 'framer-motion';
import { TasksData } from '@/lib/types';

interface TaskPanelProps {
  tasks: TasksData;
  onSideTaskToggle: (index: number) => void;
  onDailyTaskToggle: (index: number) => void;
}

export default function TaskPanel({ tasks, onSideTaskToggle, onDailyTaskToggle }: TaskPanelProps) {
  const mainProgress = Math.min(tasks.main.progress, 100);

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="section-title">&#x1f4cb; 任务面板</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主线任务 */}
        <div>
          <h4
            className="font-mono text-sm mb-3 pb-2"
            style={{
              color: 'var(--accent)',
              borderBottom: '2px solid var(--accent)',
            }}
          >
            &#x2b50; 主线任务
          </h4>
          <motion.div
            className="p-3 rounded"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h5 className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {tasks.main.title}
              </h5>
              <span className="tag text-xs">{tasks.main.progress}%</span>
            </div>

            <div className="progress-bar mb-1" style={{ height: '10px' }}>
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${mainProgress}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>

            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              截止日期：{tasks.main.deadline}
            </div>
          </motion.div>
        </div>

        {/* 支线任务 */}
        <div>
          <h4
            className="font-mono text-sm mb-3 pb-2"
            style={{
              color: 'var(--warning)',
              borderBottom: '2px solid var(--warning)',
            }}
          >
            &#x1f539; 支线任务
          </h4>
          <div className="space-y-2">
            {tasks.side.map((quest, index) => (
              <motion.div
                key={index}
                className="p-3 rounded flex items-center gap-3 cursor-pointer"
                style={{
                  backgroundColor: quest.done ? 'var(--progress-bg)' : 'var(--bg-secondary)',
                  border: `1px solid ${quest.done ? 'var(--success)' : 'var(--border-color)'}`,
                  opacity: quest.done ? 0.6 : 1,
                }}
                onClick={() => onSideTaskToggle(index)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center"
                  style={{
                    border: `2px solid ${quest.done ? 'var(--success)' : 'var(--border-color)'}`,
                    backgroundColor: quest.done ? 'var(--success)' : 'transparent',
                  }}
                  animate={quest.done ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {quest.done && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sm">
                      &#x2713;
                    </motion.span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <div
                    className={`font-mono text-sm ${quest.done ? 'line-through' : ''}`}
                    style={{
                      color: quest.done ? 'var(--text-secondary)' : 'var(--text-primary)',
                    }}
                  >
                    {quest.title}
                  </div>
                </div>

                {quest.done && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-sm"
                    style={{ color: 'var(--success)' }}
                  >
                    &#x2728;
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 每日任务 */}
        <div>
          <h4
            className="font-mono text-sm mb-3 pb-2"
            style={{
              color: 'var(--success)',
              borderBottom: '2px solid var(--success)',
            }}
          >
            &#x1f504; 每日任务
          </h4>
          <div className="space-y-2">
            {tasks.daily.map((quest, index) => (
              <motion.div
                key={index}
                className="p-3 rounded flex items-center gap-3 cursor-pointer"
                style={{
                  backgroundColor: quest.done ? 'var(--progress-bg)' : 'var(--bg-secondary)',
                  border: `1px solid ${quest.done ? 'var(--success)' : 'var(--border-color)'}`,
                  opacity: quest.done ? 0.6 : 1,
                }}
                onClick={() => onDailyTaskToggle(index)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* 勾选框 */}
                <motion.div
                  className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center"
                  style={{
                    border: `2px solid ${quest.done ? 'var(--success)' : 'var(--border-color)'}`,
                    backgroundColor: quest.done ? 'var(--success)' : 'transparent',
                  }}
                  animate={quest.done ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {quest.done && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xs">
                      &#x2713;
                    </motion.span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <span
                    className={`font-mono text-sm ${quest.done ? 'line-through' : ''}`}
                    style={{
                      color: quest.done ? 'var(--text-secondary)' : 'var(--text-primary)',
                    }}
                  >
                    {quest.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}