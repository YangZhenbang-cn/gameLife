'use client';

import { motion } from 'framer-motion';
import { SkillsData, SkillItem } from '@/lib/types';

interface SkillListProps {
  skills: SkillsData;
}

const CATEGORY_CONFIG: Record<string, { label: string; icon: string }> = {
  professional: { label: '专业技能', icon: '⚙' },
  life: { label: '生活技能', icon: '🏠' },
  interests: { label: '兴趣爱好', icon: '🎨' },
  passive: { label: '被动技能', icon: '✨' },
};

function SkillRow({ skill, index }: { skill: SkillItem; index: number }) {
  const percent = Math.min(Math.round(skill.level), 100);
  return (
    <motion.div
      className="p-3 rounded"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
      }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 10px var(--border-glow)',
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">{skill.icon}</span>
        <span className="font-mono text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
          {skill.name}
        </span>
        <span className="level-badge text-xs ml-auto">Lv.{skill.level}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          熟练度
        </span>
        <div className="flex-1 progress-bar" style={{ height: '8px' }}>
          <motion.div
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            style={{ borderRadius: '4px' }}
          />
        </div>
        <span className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
          {skill.level}%
        </span>
      </div>

      {skill.description && (
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
          {skill.description}
        </p>
      )}
    </motion.div>
  );
}

export default function SkillList({ skills }: SkillListProps) {
  const activeCategories = ['professional', 'life', 'interests'] as const;

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="section-title">⚔ 技能列表</h3>

      <div className="space-y-5">
        {activeCategories.map((cat) => {
          const catSkills = skills[cat] as SkillItem[];
          if (!catSkills || catSkills.length === 0) return null;
          const cfg = CATEGORY_CONFIG[cat];

          return (
            <div key={cat}>
              <h4
                className="font-display text-sm mb-3 pb-1"
                style={{
                  color: 'var(--accent)',
                  borderBottom: '1px dashed var(--border-color)',
                }}
              >
                {cfg.icon} {cfg.label}
              </h4>
              <div className="space-y-3">
                {catSkills.map((skill, i) => (
                  <SkillRow key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </div>
          );
        })}

        {/* 被动技能（标签展示） */}
        {skills.passive.length > 0 && (
          <div>
            <h4
              className="font-display text-sm mb-3 pb-1"
              style={{
                color: 'var(--accent)',
                borderBottom: '1px dashed var(--border-color)',
              }}
            >
              {CATEGORY_CONFIG.passive.icon} {CATEGORY_CONFIG.passive.label}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skills.passive.map((name, i) => (
                <motion.span
                  key={name}
                  className="tag text-xs"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
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