'use client';

import { motion } from 'framer-motion';
import { BasicInfo } from '@/lib/types';

interface BasicInfoProps {
  basic: BasicInfo;
  title: string;
  level: number;
  experience: number;
  maxExperience: number;
}

export default function BasicInfoCard({
  basic,
  title,
  level,
  experience,
  maxExperience,
}: BasicInfoProps) {
  const expPercent = Math.min(Math.round((experience / maxExperience) * 100), 100);
  const vipStars = '★'.repeat(basic.earthOL.vipLevel) + '☆'.repeat(Math.max(0, 7 - basic.earthOL.vipLevel));

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
              boxShadow: '0 0 20px var(--border-glow)',
            }}
          >
            {basic.avatar ? (
              <img
                src={basic.avatar}
                alt={basic.nickname}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <span>🧑‍💻</span>
            )}
          </div>
          <div
            className="absolute -bottom-2 -right-2 level-badge text-sm font-bold px-3 py-1"
            style={{ border: '2px solid var(--bg-primary)' }}
          >
            Lv.{level}
          </div>
        </div>

        {/* 角色信息 */}
        <div className="flex-1 space-y-2 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-xl md:text-2xl" style={{ color: 'var(--accent)' }}>
              {basic.realName}
            </h2>
            <span className="tag">{title}</span>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              @{basic.nickname}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>性别：</span>
              {basic.gender}
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>生日：</span>
              {basic.birthDate}
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>籍贯：</span>
              {basic.birthPlace}
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>现居：</span>
              {basic.residence}
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>职业：</span>
              {basic.occupation}
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>单位：</span>
              {basic.affiliation}
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>身高：</span>
              {basic.height}cm
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>体重：</span>
              {basic.weight}kg
            </p>
            <p>
              <span className="font-bold" style={{ color: 'var(--accent)' }}>血型：</span>
              {basic.bloodType}型
            </p>
          </div>

          {/* 地球OL 信息 */}
          <div
            className="p-2 rounded flex flex-wrap items-center gap-3 text-xs"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <span style={{ color: 'var(--accent)' }}>🌐 地球OL</span>
            <span style={{ color: 'var(--text-primary)' }}>{basic.earthOL.server}</span>
            <span
              className="px-2 py-0.5 rounded"
              style={{
                backgroundColor: basic.earthOL.status === '在线活跃' ? 'var(--success)' : 'var(--warning)',
                color: 'var(--bg-primary)',
              }}
            >
              {basic.earthOL.status}
            </span>
            <span style={{ color: 'var(--accent)', letterSpacing: '2px' }}>
              VIP {vipStars}
            </span>
          </div>

          {/* 经验条 */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span style={{ color: 'var(--text-secondary)' }}>EXP</span>
              <span style={{ color: 'var(--accent)' }}>
                {experience} / {maxExperience}
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
        </div>
      </div>
    </motion.div>
  );
}
