'use client';

import { motion } from 'framer-motion';
import { RelationshipsData } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  relationships: RelationshipsData;
  onUpdate?: (path: string[], value: unknown) => void;
}

function HeartIcon({ affection }: { affection: number }) {
  const fillColor = affection >= 8 ? 'var(--danger)' : affection >= 5 ? 'var(--warning)' : 'var(--text-secondary)';
  const opacity = affection < 5 ? 0.3 : 1;
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ opacity, flexShrink: 0 }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={fillColor} stroke="var(--border-color)" strokeWidth="0.5" />
    </svg>
  );
}

export default function RelationshipList({ relationships, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();

  const mkRel = (path: string[], label: string, items: Array<{ name: string; role?: string; affection: number }>) => ({
    className: `editable-area ${isEditing ? 'editing' : ''}`,
    onClick: isEditing && onUpdate ? () => openModal({ type: 'relationships', label, value: items, onSave: (v: Array<{ name: string; role?: string; affection: number }>) => onUpdate(path, v) }) : undefined,
  });

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="section-title">🤝 关系网络</h3>
      <div className="space-y-4">
        {/* 家庭 */}
        {relationships.family.length > 0 && (
          <div {...mkRel(['relationships', 'family'], '家庭成员', relationships.family)}>
            <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>👪 家庭成员</h4>
            {relationships.family.map((f, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded text-sm" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <HeartIcon affection={f.affection} />
                <span style={{ color: 'var(--text-primary)' }}>{f.name}</span>
                {f.role && <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{f.role}</span>}
                <span className="text-xs font-mono ml-auto" style={{ color: f.affection >= 8 ? 'var(--danger)' : f.affection >= 5 ? 'var(--warning)' : 'var(--text-secondary)' }}>{f.affection}/10</span>
              </div>
            ))}
          </div>
        )}

        {/* 好友 */}
        {relationships.closeFriends.length > 0 && (
          <div {...mkRel(['relationships', 'closeFriends'], '好友', relationships.closeFriends.map(f => ({ ...f, role: '' })) )}>
            <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>🤝 好友</h4>
            {relationships.closeFriends.map((f, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded text-sm" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <HeartIcon affection={f.affection} />
                <span style={{ color: 'var(--text-primary)' }}>{f.name}</span>
                <span className="text-xs font-mono ml-auto" style={{ color: f.affection >= 8 ? 'var(--danger)' : f.affection >= 5 ? 'var(--warning)' : 'var(--text-secondary)' }}>{f.affection}/10</span>
              </div>
            ))}
          </div>
        )}

        {/* 暗恋 */}
        {relationships.crush && (
          <div>
            <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--danger)' }}>💘 暗恋</h4>
            <div className="flex items-center gap-2 p-2 rounded text-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--danger)' }}>
              <HeartIcon affection={relationships.crush.affection} />
              <span
                className={`editable-area ${isEditing ? 'editing' : ''}`}
                style={{ color: 'var(--text-primary)' }}
                onClick={isEditing && onUpdate ? () => openModal({ type: 'text', label: '暗恋对象', value: relationships.crush!.name, onSave: (v: string) => onUpdate(['relationships', 'crush'], { ...relationships.crush!, name: v }) }) : undefined}
              >
                {relationships.crush.name}
              </span>
              <span
                className={`text-xs font-mono ml-auto editable-area ${isEditing ? 'editing' : ''}`}
                style={{ color: relationships.crush.affection >= 8 ? 'var(--danger)' : relationships.crush.affection >= 5 ? 'var(--warning)' : 'var(--text-secondary)' }}
                onClick={isEditing && onUpdate ? () => openModal({
                  type: 'text',
                  label: '好感度',
                  value: String(relationships.crush!.affection),
                  onSave: (v: string) => {
                    const val = Math.min(10, Math.max(1, Number(v) || 1));
                    onUpdate(['relationships', 'crush'], { ...relationships.crush!, affection: val });
                  },
                }) : undefined}
              >
                {relationships.crush.affection}/10
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
