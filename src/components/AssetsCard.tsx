'use client';

import { motion } from 'framer-motion';
import { AssetsData } from '@/lib/types';
import { useEditContext } from '@/context/EditContext';

interface Props {
  assets: AssetsData;
  onUpdate?: (path: string[], value: unknown) => void;
}

export default function AssetsCard({ assets, onUpdate }: Props) {
  const { isEditing, openModal } = useEditContext();

  const fmt = (v: number) => Math.abs(v) >= 10000 ? (v / 10000).toFixed(1) + '万' : v.toLocaleString();
  const netWorth = assets.gold - assets.debt + assets.fixedAssets.length * 500000;

  return (
    <motion.div className="game-panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h3 className="section-title">💰 资产面板</h3>

      <div className="mb-4 text-center">
        <motion.div
          className={`text-3xl font-display mb-1 editable-area ${isEditing ? 'editing' : ''}`}
          style={{ color: 'var(--accent)' }}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
          onClick={isEditing && onUpdate ? () => openModal({ type: 'text', label: '金币', value: String(assets.gold), onSave: (v: string) => onUpdate(['assets', 'gold'], Number(v) || 0) }) : undefined}
        >
          🪙 {fmt(assets.gold)}
        </motion.div>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>金币储备</span>
      </div>

      <div className="flex justify-between items-center mb-4 p-2 rounded text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>净值估算</span>
        <span className="font-bold" style={{ color: netWorth >= 0 ? 'var(--success)' : 'var(--danger)' }}>{fmt(netWorth)}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h4 className="font-bold mb-1" style={{ color: 'var(--success)' }}>🏠 固定资产</h4>
          <div
            className={`editable-area ${isEditing ? 'editing' : ''}`}
            onClick={isEditing && onUpdate ? () => openModal({ type: 'tags', label: '固定资产', value: assets.fixedAssets, onSave: (v: string[]) => onUpdate(['assets', 'fixedAssets'], v) }) : undefined}
          >
            {assets.fixedAssets.length > 0
              ? assets.fixedAssets.map((a, i) => <div key={i} style={{ color: 'var(--text-primary)' }}>• {a}</div>)
              : <span style={{ color: 'var(--text-secondary)' }}>暂无</span>}
          </div>
        </div>

        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h4 className="font-bold mb-1" style={{ color: 'var(--danger)' }}>📉 负债</h4>
          <span
            className={`text-lg font-display editable-area ${isEditing ? 'editing' : ''}`}
            style={{ color: 'var(--danger)' }}
            onClick={isEditing && onUpdate ? () => openModal({ type: 'text', label: '负债', value: String(assets.debt), onSave: (v: string) => onUpdate(['assets', 'debt'], Number(v) || 0) }) : undefined}
          >{fmt(assets.debt)}</span>
        </div>
      </div>

      <div className="mt-3 p-2 rounded text-center text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>⏳ 空闲时间：</span>
        <span className="font-bold" style={{ color: 'var(--accent)' }}>{assets.freeTime}</span>
      </div>
    </motion.div>
  );
}
