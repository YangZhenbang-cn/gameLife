'use client';

import { motion } from 'framer-motion';
import { Quests } from '@/lib/types';

interface TaskPanelProps {
  quests: Quests;
  onSideQuestToggle: (questId: string) => void;
}

export default function TaskPanel({ quests, onSideQuestToggle }: TaskPanelProps) {
  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="section-title">📋 任务面板</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 主线任务 */}
        <div>
          <h4
            className="font-mono text-sm mb-3 pb-2"
            style={{
              color: 'var(--accent)',
              borderBottom: `2px solid var(--accent)`,
            }}
          >
            ⭐ 主线任务
          </h4>
          <div className="space-y-3">
            {quests.main.map((quest, index) => {
              const isComplete = quest.progress >= 100;
              return (
                <motion.div
                  key={quest.id}
                  className="p-3 rounded"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: `1px solid ${isComplete ? 'var(--success)' : 'var(--border-color)'}`,
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h5
                        className="font-mono text-sm font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {quest.title}
                      </h5>
                      <p
                        className="text-xs mt-1"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {quest.description}
                      </p>
                    </div>
                    <div
                      className={`tag text-xs ${isComplete ? '' : ''}`}
                      style={
                        isComplete
                          ? { backgroundColor: 'var(--success)', color: 'var(--bg-primary)' }
                          : {}
                      }
                    >
                      {isComplete ? '完成' : `${quest.progress}%`}
                    </div>
                  </div>

                  <div className="progress-bar mb-1" style={{ height: '10px' }}>
                    <motion.div
                      className="progress-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${quest.progress}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                      style={
                        isComplete
                          ? { backgroundColor: 'var(--success)' }
                          : {}
                      }
                    />
                  </div>

                  <div
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    截止日期：{quest.deadline}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 支线任务 */}
        <div>
          <h4
            className="font-mono text-sm mb-3 pb-2"
            style={{
              color: 'var(--warning)',
              borderBottom: `2px solid var(--warning)`,
            }}
          >
            🔹 支线任务
          </h4>
          <div className="space-y-2">
            {quests.side.map((quest, index) => (
              <motion.div
                key={quest.id}
                className="p-3 rounded flex items-center gap-3 cursor-pointer"
                style={{
                  backgroundColor: quest.completed
                    ? 'var(--progress-bg)'
                    : 'var(--bg-secondary)',
                  border: `1px solid ${quest.completed ? 'var(--success)' : 'var(--border-color)'}`,
                  opacity: quest.completed ? 0.6 : 1,
                }}
                onClick={() => onSideQuestToggle(quest.id)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* 勾选框 */}
                <motion.div
                  className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center"
                  style={{
                    border: `2px solid ${quest.completed ? 'var(--success)' : 'var(--border-color)'}`,
                    backgroundColor: quest.completed ? 'var(--success)' : 'transparent',
                  }}
                  animate={
                    quest.completed
                      ? { scale: [1, 1.3, 1], transition: { duration: 0.3 } }
                      : {}
                  }
                >
                  {quest.completed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-sm"
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.div>

                <div className="flex-1">
                  <div
                    className={`font-mono text-sm ${quest.completed ? 'line-through' : ''}`}
                    style={{
                      color: quest.completed
                        ? 'var(--text-secondary)'
                        : 'var(--text-primary)',
                    }}
                  >
                    {quest.title}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {quest.description}
                  </div>
                </div>

                {quest.completed && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-sm"
                    style={{ color: 'var(--success)' }}
                  >
                    ✨
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}