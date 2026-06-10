'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundData } from '@/lib/types';

interface BackgroundProps {
  background: BackgroundData;
}

export default function Background({ background }: BackgroundProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
    >
      <h3 className="section-title">&#x1f4dc; 个人档案</h3>

      {/* 简介 */}
      <p className="text-sm italic mb-4" style={{ color: 'var(--text-secondary)' }}>
        &ldquo;{background.summary}&rdquo;
      </p>

      {/* 性格三观 */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <span className="font-bold" style={{ color: 'var(--accent)' }}>性格：</span>
          <span style={{ color: 'var(--text-primary)' }}>{background.personality}</span>
        </div>
        <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <span className="font-bold" style={{ color: 'var(--accent)' }}>核心价值观：</span>
          <span style={{ color: 'var(--text-primary)' }}>{background.coreValues}</span>
        </div>
        <div className="p-2 rounded col-span-2" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <span className="font-bold" style={{ color: 'var(--accent)' }}>人生目标：</span>
          <span style={{ color: 'var(--text-primary)' }}>{background.lifeGoals}</span>
        </div>
      </div>

      {/* 教育经历时间线 */}
      <div className="mb-4">
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
          &#x1f393; 教育经历
        </h4>
        <div className="space-y-2">
          {background.education.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <span className="font-mono whitespace-nowrap px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
                {item.time}
              </span>
              <span style={{ color: 'var(--text-primary)' }}>{item.event}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 工作经历时间线 */}
      <div className="mb-4">
        <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
          &#x1f4bc; 工作经历
        </h4>
        <div className="space-y-2">
          {background.career.map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-xs">
              <span className="font-mono whitespace-nowrap px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
                {item.time}
              </span>
              <span style={{ color: 'var(--text-primary)' }}>{item.event}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 关键转折点 */}
      {background.turningPoints.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
            &#x2b50; 关键转折点
          </h4>
          <div className="space-y-2">
            {background.turningPoints.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <span className="font-mono whitespace-nowrap px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' }}>
                  {item.time}
                </span>
                <span style={{ color: 'var(--text-primary)' }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 可折叠部分 */}
      <button
        className="game-button text-xs mb-3"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? '&#x25b2; 收起' : '&#x25bc; 展开更多'}
      </button>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-3"
          >
            {/* 喜好 */}
            <div>
              <h4 className="text-xs font-mono mb-1" style={{ color: 'var(--success)' }}>
                &#x2764; 喜欢
              </h4>
              <div className="flex flex-wrap gap-1">
                {background.likes.map((item, i) => (
                  <span key={i} className="tag text-xs" style={{ backgroundColor: 'var(--success)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 讨厌 */}
            <div>
              <h4 className="text-xs font-mono mb-1" style={{ color: 'var(--danger)' }}>
                &#x1f494; 讨厌
              </h4>
              <div className="flex flex-wrap gap-1">
                {background.dislikes.map((item, i) => (
                  <span key={i} className="tag text-xs" style={{ backgroundColor: 'var(--danger)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 红线 */}
            <div>
              <h4 className="text-xs font-mono mb-1" style={{ color: 'var(--danger)' }}>
                &#x1f6ab; 红线
              </h4>
              <div className="flex flex-wrap gap-1">
                {background.redLines.map((item, i) => (
                  <span key={i} className="tag text-xs" style={{ backgroundColor: 'var(--danger)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* 口头禅、标志物 */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <span className="font-bold" style={{ color: 'var(--accent)' }}>口头禅：</span>
                <span style={{ color: 'var(--text-primary)' }}>&ldquo;{background.catchphrase}&rdquo;</span>
              </div>
              <div className="p-2 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <span className="font-bold" style={{ color: 'var(--accent)' }}>标志物：</span>
                <span style={{ color: 'var(--text-primary)' }}>{background.iconicItem}</span>
              </div>
            </div>

            {/* 黑历史 */}
            <div className="p-2 rounded text-xs" style={{
              backgroundColor: 'var(--bg-secondary)',
              borderLeft: '3px solid var(--danger)',
            }}>
              <span className="font-bold" style={{ color: 'var(--danger)' }}>黑历史：</span>
              <span style={{ color: 'var(--text-primary)' }}>{background.blackHistory}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
