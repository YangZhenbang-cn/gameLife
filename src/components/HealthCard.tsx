'use client';

import { motion } from 'framer-motion';
import { HealthInfo } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  health: HealthInfo;
  onUpdate?: (path: string[], value: unknown) => void;
}

export default function HealthCard({ health, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();

  const mk = (path: string[], label: string, value: string) => ({
    className: `editable-area ${isEditing ? 'editing' : ''}`,
    onClick: isEditing && onUpdate ? () => openModal({ type: 'text', label, value, onSave: (v: string) => onUpdate(path, v) }) : undefined,
  });

  const mkTags = (path: string[], label: string, value: string[]) => ({
    className: `editable-area ${isEditing ? 'editing' : ''}`,
    onClick: isEditing && onUpdate ? () => openModal({ type: 'tags', label, value, onSave: (v: string[]) => onUpdate(path, v) }) : undefined,
  });

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <h3 className="section-title">🏥 健康档案</h3>
      <div className="space-y-3">
        <div {...mk(['attributes', 'health', 'constitution'], '体质', health.constitution)}>
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>体质：</span>
          <span className="tag text-xs">{health.constitution}</span>
        </div>

        <div {...mkTags(['attributes', 'health', 'medicalHistory'], '病史', health.medicalHistory)}>
          <span className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>病史：</span>
          <div className="flex flex-wrap gap-1">
            {health.medicalHistory.map((h, i) => (
              <span key={i} className="tag text-xs" style={{ backgroundColor: 'var(--warning)' }}>{h}</span>
            ))}
          </div>
        </div>

        <div {...mkTags(['attributes', 'health', 'allergies'], '过敏源', health.allergies)}>
          <span className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>过敏源：</span>
          <div className="flex flex-wrap gap-1">
            {health.allergies.map((a, i) => (
              <span key={i} className="tag text-xs" style={{ backgroundColor: 'var(--danger)' }}>{a}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
