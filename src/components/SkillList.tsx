'use client';

import { motion } from 'framer-motion';
import { SkillCategory } from '@/lib/types';

interface SkillListProps {
  skills: SkillCategory[];
}

export default function SkillList({ skills }: SkillListProps) {
  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="section-title">⚔️ 技能列表</h3>

      <div className="space-y-5">
        {skills.map((category, catIndex) => (
          <div key={category.category}>
            <h4
              className="font-display text-sm mb-3 pb-1"
              style={{
                color: 'var(--accent)',
                borderBottom: `1px dashed var(--border-color)`,
              }}
            >
              {category.category}
            </h4>

            <div className="space-y-3">
              {category.items.map((skill, skillIndex) => {
                const percent = Math.min(
                  Math.round((skill.mastery / 100) * 100),
                  100
                );
                return (
                  <motion.div
                    key={skill.name}
                    className="p-3 rounded"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: `1px solid var(--border-color)`,
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.15 + skillIndex * 0.1,
                    }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 10px var(--border-glow)`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{skill.icon}</span>
                      <span
                        className="font-mono text-sm font-bold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {skill.name}
                      </span>
                      <span className="level-badge text-xs ml-auto">
                        Lv.{skill.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        熟练度
                      </span>
                      <div className="flex-1 progress-bar" style={{ height: '8px' }}>
                        <motion.div
                          className="progress-bar-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{
                            duration: 0.6,
                            delay: catIndex * 0.15 + skillIndex * 0.1,
                            ease: 'easeOut',
                          }}
                          style={{ borderRadius: '4px' }}
                        />
                      </div>
                      <span
                        className="text-xs font-mono"
                        style={{ color: 'var(--accent)' }}
                      >
                        {skill.mastery}%
                      </span>
                    </div>

                    <p
                      className="text-xs mt-1"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {skill.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}