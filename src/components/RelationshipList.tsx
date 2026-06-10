'use client';

import { motion } from 'framer-motion';
import { RelationshipItem, RelationshipsData } from '@/lib/types';

interface RelationshipListProps {
  relationships: RelationshipsData;
}

/** 心形 SVG 根据好感度填充 */
function HeartIcon({ affection }: { affection: number }) {
  const fillColor = affection >= 8 ? 'var(--danger)' : affection >= 5 ? 'var(--warning)' : 'var(--text-secondary)';
  const opacity = affection < 5 ? 0.3 : 1;

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ opacity, flexShrink: 0 }}>
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={fillColor}
        stroke="var(--border-color)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

/** 好感度文字 */
function AffectionBadge({ value }: { value: number }) {
  const color = value >= 8 ? 'var(--danger)' : value >= 5 ? 'var(--warning)' : 'var(--text-secondary)';
  return (
    <span className="text-xs font-mono" style={{ color }}>
      {value}/10
    </span>
  );
}

function RelationshipSection({
  title,
  icon,
  items,
}: {
  title: string;
  icon: string;
  items: RelationshipItem[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--accent)' }}>
        {icon} {title}
      </h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 p-2 rounded"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <HeartIcon affection={item.affection} />
            <span className="text-sm font-bold flex-1" style={{ color: 'var(--text-primary)' }}>
              {item.name}
            </span>
            {item.role && (
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {item.role}
              </span>
            )}
            <AffectionBadge value={item.affection} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function RelationshipList({ relationships }: RelationshipListProps) {
  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="section-title">🤝 关系网络</h3>

      <div className="space-y-4">
        <RelationshipSection title="家庭成员" icon="👪" items={relationships.family} />
        <RelationshipSection title="好友" icon="🤽" items={relationships.closeFriends} />

        {/* 暗恋对象 */}
        {relationships.crush && (
          <div>
            <h4 className="text-xs font-mono mb-2" style={{ color: 'var(--danger)' }}>
              💘 暗恋
            </h4>
            <motion.div
              className="flex items-center gap-2 p-2 rounded"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--danger)',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <HeartIcon affection={relationships.crush.affection} />
              <span className="text-sm font-bold flex-1" style={{ color: 'var(--text-primary)' }}>
                {relationships.crush.name}
              </span>
              <AffectionBadge value={relationships.crush.affection} />
            </motion.div>
          </div>
        )}

        {/* 敌人 */}
        {relationships.enemies.length > 0 && (
          <RelationshipSection title="宿敌" icon="⚔" items={relationships.enemies} />
        )}
      </div>
    </motion.div>
  );
}
