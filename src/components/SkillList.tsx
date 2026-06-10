'use client';

import { motion } from 'framer-motion';
import { SkillsData, SkillItem } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  skills: SkillsData;
  onUpdate?: (path: string[], value: unknown) => void;
}

const CATS = [
  { key: 'professional' as const, label: '⚙️ 专业技能' },
  { key: 'life' as const, label: '🏠 生活技能' },
  { key: 'interests' as const, label: '🎨 兴趣爱好' },
];

export default function SkillList({ skills, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();

  const renderSkill = (skill: SkillItem, cat: string, index: number) => {
    const pct = Math.min(skill.level, 100);
    return (
      <div
        key={skill.name}
        className="p-3 rounded"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{skill.icon}</span>
          <span
            className={`font-mono text-sm font-bold editable-area ${isEditing ? 'editing' : ''}`}
            style={{ color: 'var(--text-primary)' }}
            onClick={isEditing && onUpdate ? () => {
              openModal({
                type: 'text',
                label: '技能名称',
                value: skill.name,
                onSave: (v: string) => {
                  const arr = [...(skills[cat as keyof SkillsData] as SkillItem[])];
                  arr[index] = { ...arr[index], name: v };
                  onUpdate(['skills', cat], arr);
                },
              });
            } : undefined}
          >
            {skill.name}
          </span>
          <span className="level-badge text-xs ml-auto">Lv.{skill.level}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>熟练度</span>
          <div className="flex-1 progress-bar" style={{ height: '8px' }}>
            <motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} />
          </div>
          <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{skill.level}%</span>
        </div>
        {skill.description && (
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{skill.description}</p>
        )}
      </div>
    );
  };

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="section-title">⚔️ 技能列表</h3>
      <div className="space-y-5">
        {CATS.map(({ key, label }) => {
          const catSkills = skills[key] as SkillItem[];
          if (!catSkills?.length) return null;
          return (
            <div key={key}>
              <h4 className="font-display text-sm mb-3 pb-1" style={{ color: 'var(--accent)', borderBottom: '1px dashed var(--border-color)' }}>{label}</h4>
              <div className="space-y-3">
                {catSkills.map((s, i) => renderSkill(s, key, i))}
              </div>
            </div>
          );
        })}

        {skills.passive.length > 0 && (
          <div>
            <h4 className="font-display text-sm mb-3 pb-1" style={{ color: 'var(--accent)', borderBottom: '1px dashed var(--border-color)' }}>✨ 被动技能</h4>
            <div className="flex flex-wrap gap-2">
              {skills.passive.map((name, i) => (
                <motion.span
                  key={name}
                  className={`tag text-xs editable-area ${isEditing ? 'editing' : ''}`}
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
                  onClick={isEditing && onUpdate ? () => {
                    openModal({
                      type: 'text',
                      label: '被动技能',
                      value: name,
                      onSave: (v: string) => {
                        const arr = [...skills.passive];
                        arr[i] = v;
                        onUpdate(['skills', 'passive'], arr);
                      },
                    });
                  } : undefined}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08, type: 'spring' }}
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
