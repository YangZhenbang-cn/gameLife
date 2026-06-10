'use client';

import { motion } from 'framer-motion';
import { useEditContext } from '@/context/EditContext';

export default function EditToggle() {
  const { isEditing, setIsEditing } = useEditContext();

  return (
    <button
      className="game-button relative"
      onClick={() => setIsEditing(!isEditing)}
      style={{
        borderColor: isEditing ? 'var(--warning)' : undefined,
        boxShadow: isEditing ? '0 0 12px var(--warning)' : undefined,
      }}
    >
      <motion.span
        animate={{ rotate: isEditing ? 0 : 180 }}
        transition={{ duration: 0.3 }}
        className="text-lg"
      >
        {isEditing ? '✏️' : '🔒'}
      </motion.span>
      <span className="text-xs font-mono" style={{ color: isEditing ? 'var(--warning)' : 'var(--text-secondary)' }}>
        {isEditing ? '编辑中' : '编辑模式'}
      </span>
    </button>
  );
}