'use client';

import { motion } from 'framer-motion';
import { BasicInfo, ProfileData } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  basic: BasicInfo;
  title: string;
  level: number;
  experience: number;
  maxExperience: number;
  onUpdate?: (path: string[], value: unknown) => void;
}

export default function BasicInfoCard({ basic, title, level, experience, maxExperience, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();

  const mk = (path: string[], label: string, value: string) => ({
    className: `editable-area ${isEditing ? 'editing' : ''}`,
    onClick: isEditing && onUpdate ? () => openModal({ type: 'text', label, value, onSave: (v: string) => onUpdate(path, v) }) : undefined,
  });

  const xpPct = Math.min(Math.round((experience / maxExperience) * 100), 100);

  return (
    <motion.div className="game-panel" id="character-card-export" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col sm:flex-row gap-6">
        {/* 头像区 */}
        <div className="flex-shrink-0 text-center">
          <div className="w-24 h-24 mx-auto rounded-full border-4 overflow-hidden" style={{ borderColor: 'var(--accent)' }}>
            <div className="w-full h-full flex items-center justify-center text-4xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>🌍</div>
          </div>
          <div className="mt-2">
            <span className="tag text-xs">{basic.earthOL.status}</span>
          </div>
        </div>

        {/* 信息网格 */}
        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <h2 {...mk(['character', 'basic', 'realName'], '姓名', basic.realName)} style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {basic.realName}
              </h2>
              <span {...mk(['character', 'basic', 'nickname'], '昵称', basic.nickname)} className="text-sm font-mono" style={{ color: 'var(--accent)' }}>
                「{basic.nickname}」
              </span>
            </div>
            <span {...mk(['character', 'title'], '称号', title)} className="level-badge text-sm">
              {title}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-xs font-mono">
            {[
              ['性别', basic.gender],
              ['生日', basic.birthDate],
              ['出生地', basic.birthPlace],
              ['现居', basic.residence],
              ['身高', `${basic.height}cm`],
              ['体重', `${basic.weight}kg`],
              ['血型', basic.bloodType],
            ].map(([label, val]) => (
              <div key={label}>
                <span style={{ color: 'var(--text-secondary)' }}>{label}：</span>
                <span style={{ color: 'var(--text-primary)' }}>{val}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-x-4 text-xs font-mono">
            <div {...mk(['character', 'basic', 'occupation'], '职业', basic.occupation)}>
              <span style={{ color: 'var(--text-secondary)' }}>职业：</span>
              <span style={{ color: 'var(--accent)' }}>{basic.occupation}</span>
            </div>
            <div {...mk(['character', 'basic', 'affiliation'], '单位', basic.affiliation)}>
              <span style={{ color: 'var(--text-secondary)' }}>单位：</span>
              <span style={{ color: 'var(--text-primary)' }}>{basic.affiliation}</span>
            </div>
          </div>

          {/* 地球OL */}
          <div className="flex items-center gap-3 text-xs font-mono pt-2" style={{ borderTop: '1px dashed var(--border-color)' }}>
            <span className="tag" style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}>
              🌐 {basic.earthOL.server}
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              VIP {basic.earthOL.vipLevel}
              {'★'.repeat(basic.earthOL.vipLevel)}{'☆'.repeat(7 - basic.earthOL.vipLevel)}
            </span>
          </div>

          {/* 经验条 */}
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1 font-mono">
              <span style={{ color: 'var(--text-secondary)' }}>Lv.{level}</span>
              <span style={{ color: 'var(--accent)' }}>{experience} / {maxExperience}</span>
            </div>
            <div className="progress-bar" style={{ height: '10px' }}>
              <motion.div className="progress-bar-fill" initial={{ width: 0 }} animate={{ width: `${xpPct}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
