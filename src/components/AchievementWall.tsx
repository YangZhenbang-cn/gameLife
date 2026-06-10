'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/lib/types';

interface AchievementWallProps {
  achievements: Achievement[];
}

export default function AchievementWall({ achievements }: AchievementWallProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const unlocked = achievements.filter((a) => a.unlocked);
  const locked = achievements.filter((a) => !a.unlocked);

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="section-title">🏆 成就陈列室</h3>

      <div className="mb-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
        已解锁 {unlocked.length} / {achievements.length}
      </div>

      {/* 已解锁成就 */}
      <div className="mb-4">
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--success)' }}>
          ✦ 已解锁
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {unlocked.map((ach) => (
            <motion.button
              key={ach.id}
              className="p-2 text-center cursor-pointer rounded"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: `1px solid var(--border-glow)`,
              }}
              onClick={() => setSelectedAchievement(ach)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-1">{ach.icon}</div>
              <div className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>
                {ach.name}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 未解锁成就 */}
      <div>
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--text-secondary)' }}>
          🔒 未解锁
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {locked.map((ach) => (
            <motion.button
              key={ach.id}
              className="p-2 text-center cursor-pointer rounded opacity-50"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: `1px dashed var(--border-color)`,
              }}
              onClick={() => setSelectedAchievement(ach)}
              whileHover={{ scale: 1.05, opacity: 0.7 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-1" style={{ filter: 'grayscale(100%)' }}>
                {ach.icon}
              </div>
              <div className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                ???
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* 成就详情弹窗 */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          >
            <motion.div
              className="p-6 rounded max-w-sm w-full text-center"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: `2px solid ${selectedAchievement.unlocked ? 'var(--border-glow)' : 'var(--border-color)'}`,
                boxShadow: `0 0 30px ${selectedAchievement.unlocked ? 'var(--border-glow)' : 'transparent'}`,
              }}
            >
              <div className="text-5xl mb-4">{selectedAchievement.icon}</div>
              <h4
                className="font-display text-lg mb-2"
                style={{ color: 'var(--accent)' }}
              >
                {selectedAchievement.name}
              </h4>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm mb-3">
                {selectedAchievement.description}
              </p>
              {selectedAchievement.unlocked && selectedAchievement.unlockDate && (
                <div
                  className="text-xs font-mono px-3 py-1 rounded inline-block"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--success)',
                  }}
                >
                  解锁于 {selectedAchievement.unlockDate}
                </div>
              )}
              {!selectedAchievement.unlocked && (
                <div
                  className="text-xs font-mono px-3 py-1 rounded inline-block"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  尚未解锁
                </div>
              )}
              <button
                className="game-button mt-4 mx-auto"
                onClick={() => setSelectedAchievement(null)}
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}