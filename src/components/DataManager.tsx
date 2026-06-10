'use client';

import { useRef, useCallback, useState } from 'react';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileData } from '@/lib/types';
import { exportProfileAsJSON, parseProfileJSON } from '@/lib/defaultData';

interface DataManagerProps {
  profile: ProfileData;
  onImport: (data: ProfileData) => void;
  characterCardId: string;
}

export default function DataManager({
  profile,
  onImport,
  characterCardId,
}: DataManagerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExportJSON = useCallback(() => {
    exportProfileAsJSON(profile);
  }, [profile]);

  const handleImportJSON = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result;
          if (typeof text !== 'string') return;
          const data = parseProfileJSON(text);
          onImport(data);
          alert('个人资料导入成功！');
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : '未知错误';
          alert('导入失败：' + message);
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    },
    [onImport]
  );

  const handleExportImage = useCallback(async (mode: 'card' | 'full') => {
    setShowExportMenu(false);

    if (mode === 'card') {
      const element = document.getElementById(characterCardId);
      if (!element) {
        alert('未找到角色卡片元素');
        return;
      }
      try {
        const dataUrl = await toPng(element, { pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = `earthol-card-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = dataUrl;
        link.click();
      } catch {
        alert('图片导出失败，请重试。');
      }
    } else {
      // 完整人物卡：截图整个主内容区
      const mainContent = document.getElementById('main-content');
      if (!mainContent) {
        alert('未找到页面内容');
        return;
      }
      try {
        const dataUrl = await toPng(mainContent, { pixelRatio: 1.5 });
        const link = document.createElement('a');
        link.download = `earthol-full-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = dataUrl;
        link.click();
      } catch {
        alert('完整导出失败，请重试。');
      }
    }
  }, [characterCardId]);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        className="hidden"
        aria-label="导入 JSON 文件"
      />

      <button
        className="game-button"
        onClick={() => fileInputRef.current?.click()}
      >
        &#x1f4e5; 导入
      </button>

      <button className="game-button" onClick={handleExportJSON}>
        &#x1f4e4; 导出
      </button>

      <div className="relative">
        <button
          className="game-button"
          onClick={() => setShowExportMenu(!showExportMenu)}
        >
          &#x1f5bc; 卡片
        </button>

        <AnimatePresence>
          {showExportMenu && (
            <motion.div
              className="absolute right-0 top-full mt-2 p-2 rounded z-50 min-w-[160px]"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <button
                className="w-full text-left px-3 py-2 rounded text-xs hover:opacity-80"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  marginBottom: '4px',
                }}
                onClick={() => handleExportImage('card')}
              >
                &#x1f4c7; 基本信息 + 雷达图
              </button>
              <button
                className="w-full text-left px-3 py-2 rounded text-xs hover:opacity-80"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                }}
                onClick={() => handleExportImage('full')}
              >
                &#x1f4dc; 完整人物卡
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}