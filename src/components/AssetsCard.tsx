'use client';

import { motion } from 'framer-motion';
import { AssetsData } from '@/lib/types';

interface AssetsCardProps {
  assets: AssetsData;
}

export default function AssetsCard({ assets }: AssetsCardProps) {
  const netWorth = assets.gold - assets.debt + (assets.fixedAssets.length > 0 ? assets.fixedAssets.length * 500000 : 0);

  const formatGold = (v: number) => {
    if (Math.abs(v) >= 10000) {
      return (v / 10000).toFixed(1) + '万';
    }
    return v.toLocaleString();
  };

  return (
    <motion.div
      className="game-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="section-title">&#x1f4b0; 资产面板</h3>

      {/* 金币 */}
      <div className="mb-4 text-center">
        <motion.div
          className="text-3xl font-display mb-1"
          style={{ color: 'var(--accent)' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          &#x1fa99; {formatGold(assets.gold)}
        </motion.div>
        <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          金币储备
        </span>
      </div>

      {/* 净值 */}
      <div className="flex justify-between items-center mb-4 p-2 rounded text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>净值估算</span>
        <span className="font-bold" style={{ color: netWorth >= 0 ? 'var(--success)' : 'var(--danger)' }}>
          {formatGold(netWorth)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* 固定资产 */}
        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h4 className="font-bold mb-1" style={{ color: 'var(--success)' }}>
            &#x1f3e0; 固定资产
          </h4>
          {assets.fixedAssets.length > 0 ? (
            <ul className="space-y-1" style={{ color: 'var(--text-primary)' }}>
              {assets.fixedAssets.map((item, i) => (
                <li key={i}>&#x2022; {item}</li>
              ))}
            </ul>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>暂无</span>
          )}
        </div>

        {/* 负债 */}
        <div className="p-3 rounded" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h4 className="font-bold mb-1" style={{ color: 'var(--danger)' }}>
            &#x1f4c9; 负债
          </h4>
          <span className="text-lg font-display" style={{ color: 'var(--danger)' }}>
            {formatGold(assets.debt)}
          </span>
        </div>
      </div>

      {/* 空闲时间 */}
      <div className="mt-3 p-2 rounded text-center text-xs" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <span style={{ color: 'var(--text-secondary)' }}>&#x23f3; 空闲时间：</span>
        <span className="font-bold" style={{ color: 'var(--accent)' }}>
          {assets.freeTime}
        </span>
      </div>
    </motion.div>
  );
}
