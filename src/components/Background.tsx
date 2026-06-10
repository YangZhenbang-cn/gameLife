'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundData } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  background: BackgroundData;
  onUpdate?: (path: string[], value: unknown) => void;
}

function editClass(isEditing: boolean) {
  return `editable-area${isEditing ? ' editing' : ''}`;
}

export default function Background({ background, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();
  const [showDetails, setShowDetails] = useState(false);

  const handleText = (path: string[], label: string, value: string) => {
    if (isEditing && onUpdate) openModal({ type: 'text', label, value, onSave: (v: string) => onUpdate(path, v) });
  };
  const handleTextArea = (path: string[], label: string, value: string) => {
    if (isEditing && onUpdate) openModal({ type: 'textarea', label, value, onSave: (v: string) => onUpdate(path, v) });
  };
  const handleTags = (path: string[], label: string, value: string[]) => {
    if (isEditing && onUpdate) openModal({ type: 'tags', label, value, onSave: (v: string[]) => onUpdate(path, v) });
  };
  const handleTimeline = (path: string[], label: string, value: Array<{ time: string; event: string }>) => {
    if (isEditing && onUpdate) openModal({ type: 'timeline', label, value, onSave: (v: Array<{ time: string; event: string }>) => onUpdate(path, v) });
  };

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <h3 className="section-title">&#x1f4dc; 个人档案</h3>

      {/* 简介 */}
      <p
        className={`text-sm mb-4 leading-relaxed ${editClass(isEditing)}`}
        style={{ color: 'var(--text-primary)' }}
        onClick={() => handleTextArea(['background', 'summary'], '简介', background.summary)}
      >
        {background.summary}
      </p>

      {/* 时间线 */}
      <div className="space-y-3 mb-4">
        {(['education', 'career', 'turningPoints'] as const).map((key) => {
          const items = background[key];
          if (!items.length) return null;
          const labels = { education: '🎓 教育', career: '💼 工作', turningPoints: '🔀 转折' };
          return (
            <div key={key}>
              <h4 className="text-xs font-mono mb-1" style={{ color: 'var(--accent)' }}>{labels[key]}</h4>
              <div
                className={editClass(isEditing)}
                onClick={() => handleTimeline(['background', key], labels[key], items)}
              >
                {items.map((item, i) => (
                  <div key={i} className="flex gap-2 text-xs py-1" style={{ borderBottom: '1px dashed var(--border-color)' }}>
                    <span className="font-mono w-24 flex-shrink-0" style={{ color: 'var(--accent)' }}>{item.time}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 性格三观 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-xs">
        <div className={editClass(isEditing)} onClick={() => handleText(['background', 'personality'], '性格', background.personality)}>
          <span style={{ color: 'var(--text-secondary)' }}>性格：</span>
          <span style={{ color: 'var(--text-primary)' }}>{background.personality}</span>
        </div>
        <div className={editClass(isEditing)} onClick={() => handleText(['background', 'coreValues'], '价值观', background.coreValues)}>
          <span style={{ color: 'var(--text-secondary)' }}>价值观：</span>
          <span style={{ color: 'var(--text-primary)' }}>{background.coreValues}</span>
        </div>
        <div className={editClass(isEditing)} onClick={() => handleText(['background', 'lifeGoals'], '人生目标', background.lifeGoals)}>
          <span style={{ color: 'var(--text-secondary)' }}>目标：</span>
          <span style={{ color: 'var(--text-primary)' }}>{background.lifeGoals}</span>
        </div>
      </div>

      {/* 可折叠区 */}
      <button
        className="text-xs font-mono mb-2 w-full text-left"
        style={{ color: 'var(--accent)' }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? '▲' : '▼'} 更多信息
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden space-y-3"
          >
            {([
              ['likes', '❤️ 喜好'] as const,
              ['dislikes', '👎 讨厌'] as const,
              ['redLines', '🚫 红线'] as const,
            ]).map(([key, label]) => (
              <div
                key={key}
                className={`flex flex-wrap gap-1 ${editClass(isEditing)}`}
                onClick={() => handleTags(['background', key], label, background[key])}
              >
                <span className="text-xs m-auto text-left" style={{ color: 'var(--text-secondary)' }}>{label}：</span>
                {background[key].map((item, i) => (
                  <span key={i} className="tag text-xs">{item}</span>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(['catchphrase', 'iconicItem', 'blackHistory'] as const).map((key) => {
                const labels: Record<string, string> = {
                  catchphrase: '口头禅',
                  iconicItem: '标志物',
                  blackHistory: '黑历史',
                };
                const value = background[key];
                return (
                  <div
                    key={key}
                    className={editClass(isEditing)}
                    onClick={() => handleText(['background', key], labels[key], value)}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>{labels[key]}：</span>
                    <span style={{ color: 'var(--text-primary)' }}>{value}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}