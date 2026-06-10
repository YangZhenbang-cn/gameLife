'use client';

import { useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
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
          const message =
            err instanceof Error ? err.message : '未知错误';
          alert('导入失败：' + message);
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    },
    [onImport]
  );

  const handleExportImage = useCallback(async () => {
    const element = document.getElementById(characterCardId);
    if (!element) {
      alert('未找到角色卡片元素');
      return;
    }

    try {
      const dataUrl = await toPng(element, {
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `game-life-card-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      alert('图片导出失败，请重试。');
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
        📥 导入
      </button>

      <button className="game-button" onClick={handleExportJSON}>
        📤 导出
      </button>

      <button className="game-button" onClick={handleExportImage}>
        🖼️ 卡片
      </button>
    </>
  );
}