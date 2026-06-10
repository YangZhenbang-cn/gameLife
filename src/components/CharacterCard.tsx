'use client';

import { motion } from 'framer-motion';
import { CharacterInfo } from '@/lib/types';

interface CharacterCardProps {
  character: CharacterInfo;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const expPercent = Math.min(
    Math.round((character.experience / character.experienceToNextLevel) * 100),
    100
  );

  return (
    <motion.div
      id="character-card-export"
      className="game-panel relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* 头像 */}
        <div className="relative flex-shrink-0">
          <div
            className="w-24 h-24 md:w-32 md:h-32 border-4 flex items-center justify-center text-4xl"
            style={{
              borderColor: 'var(--border-glow)',
              backgroundColor: 'var(--bg-secondary)',
              boxShadow: `0 0 20px var(--border-glow)`,
            }}
          >
            {character.avatar ? (
              <img
                src={character.avatar}
                alt={character.nickname}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span>🧑‍💻</span>
            )}
          </div>
          {/* 等级徽章 */}
          <div
            className="absolute -bottom-2 -right-2 level-badge text-sm font-bold px-3 py-1"
            style={{
              border: '2px solid var(--bg-primary)',
            }}
          >
            Lv.{character.level}
          </div>
        </div>

        {/* 角色信息 */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2
              className="font-display text-xl md:text-2xl"
              style={{ color: 'var(--accent)' }}
            >
              {character.nickname}
            </h2>
            <span className="tag">{character.title}</span>
          </div>

          <div
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>
                职业：
              </span>
              {character.class}
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>
                旅团：
              </span>
              {character.guild}
            </p>
          </div>

          <p
            className="text-sm italic"
            style={{
              color: 'var(--text-secondary)',
              borderLeft: `3px solid var(--accent)`,
              paddingLeft: '0.75rem',
            }}
          >
            &ldquo;{character.bio}&rdquo;
          </p>

          {/* 经验条 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span style={{ color: 'var(--text-secondary)' }}>EXP</span>
              <span style={{ color: 'var(--accent)' }}>
                {character.experience} / {character.experienceToNextLevel}
              </span>
            </div>
            <div className="xp-bar">
              <motion.div
                className="xp-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${expPercent}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>

          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            加入日期：{character.joinDate}
          </p>
        </div>
      </div>
    </motion.div>
  );
}