'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/lib/ThemeProvider';
import { ThemeConfig } from '@/lib/types';

interface ThemeSwitcherProps {
  onClose: () => void;
}

export default function ThemeSwitcher({ onClose }: ThemeSwitcherProps) {
  const { currentTheme, setTheme, themes } = useTheme();

  const handleSelect = (themeId: string) => {
    setTheme(themeId);
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3
          className="font-display text-sm"
          style={{ color: 'var(--accent)' }}
        >
          🎨 选择主题风格
        </h3>
        <button
          className="text-xs"
          style={{ color: 'var(--text-secondary)' }}
          onClick={onClose}
        >
          ✕ 关闭
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {themes.map((theme: ThemeConfig, index: number) => {
          const isActive = theme.id === currentTheme;
          return (
            <motion.button
              key={theme.id}
              className="p-4 rounded cursor-pointer text-left"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: isActive
                  ? '2px solid var(--border-glow)'
                  : '1px solid var(--border-color)',
                boxShadow: isActive
                  ? '0 0 15px var(--border-glow)'
                  : 'var(--card-shadow)',
              }}
              onClick={() => handleSelect(theme.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* 预览图 */}
              <div
                className="flex items-center justify-center gap-1 mb-3 text-3xl"
              >
                {/* 配色预览条 */}
                <div className="flex gap-1">
                  <div
                    className="w-4 h-10 rounded"
                    style={{ backgroundColor: theme.variables['--bg-primary'] || '#333' }}
                  />
                  <div
                    className="w-4 h-10 rounded"
                    style={{ backgroundColor: theme.variables['--accent'] || '#888' }}
                  />
                  <div
                    className="w-4 h-10 rounded"
                    style={{ backgroundColor: theme.variables['--bg-secondary'] || '#555' }}
                  />
                </div>
                <span>{theme.preview}</span>
              </div>

              {/* 主题信息 */}
              <div className="text-center">
                <div
                  className="font-mono text-sm font-bold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {theme.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {theme.description}
                </div>
              </div>

              {/* 选中标记 */}
              {isActive && (
                <motion.div
                  className="mt-2 text-center text-xs font-mono"
                  style={{ color: 'var(--accent)' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✦ 当前主题 ✦
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}