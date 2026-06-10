'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  achievements: Achievement[];
  onUpdate?: (path: string[], value: unknown) => void;
}

export default function AchievementWall({ achievements, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();
  const [selected, setSelected] = useState<Achievement | null>(null);

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="section-title">🏆 成就陈列室</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {achievements.map((ach, i) => (
          <motion.div
            key={ach.id}
            className="p-3 rounded text-center cursor-pointer"
            style={{
              backgroundColor: ach.unlocked ? 'var(--bg-secondary)' : 'var(--bg-primary)',
              border: `1px solid ${ach.unlocked ? 'var(--accent)' : 'var(--border-color)'}`,
              opacity: ach.unlocked ? 1 : 0.5,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: ach.unlocked ? 1 : 0.5, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(ach)}
            whileHover={{ scale: 1.03 }}
          >
            <span className="block text-2xl mb-1">{ach.unlocked ? '🏆' : '🔒'}</span>
            <span
              className={`block text-xs font-mono editable-area ${isEditing ? 'editing' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (isEditing && onUpdate) {
                  openModal({ type: 'text', label: '成就名称', value: ach.name, onSave: (v: string) => {
                    const arr = [...achievements];
                    arr[i] = { ...arr[i], name: v };
                    onUpdate(['achievements'], arr);
                  }});
                }
              }}
              style={{ color: ach.unlocked ? 'var(--accent)' : 'var(--text-secondary)' }}
            >
              {ach.name}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <div className="absolute inset-0 bg-black/50" />
            <motion.div
              className="relative p-6 rounded-lg max-w-sm w-full z-10"
              style={{ backgroundColor: 'var(--bg-card)', border: '2px solid var(--border-color)' }}
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-4xl block text-center mb-3">{selected.unlocked ? '🏆' : '🔒'}</span>
              <h3
                className={`text-lg font-display text-center editable-area ${isEditing ? 'editing' : ''}`}
                style={{ color: 'var(--accent)' }}
                onClick={isEditing && onUpdate ? () => openModal({ type: 'text', label: '成就名称', value: selected.name, onSave: (v: string) => {
                  const arr = achievements.map(a => a.id === selected.id ? { ...a, name: v } : a);
                  onUpdate(['achievements'], arr);
                  setSelected({ ...selected, name: v });
                }}) : undefined}
              >{selected.name}</h3>
              <p
                className={`text-sm text-center mt-2 editable-area ${isEditing ? 'editing' : ''}`}
                style={{ color: 'var(--text-secondary)' }}
                onClick={isEditing && onUpdate ? () => openModal({ type: 'text', label: '成就描述', value: selected.description, onSave: (v: string) => {
                  const arr = achievements.map(a => a.id === selected.id ? { ...a, description: v } : a);
                  onUpdate(['achievements'], arr);
                  setSelected({ ...selected, description: v });
                }}) : undefined}
              >{selected.description}</p>
              <button className="game-button text-xs w-full mt-4" onClick={() => setSelected(null)}>关闭</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
