'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import CharacterCard from '@/components/CharacterCard';
import AttributePanel from '@/components/AttributePanel';
import SkillList from '@/components/SkillList';
import AchievementWall from '@/components/AchievementWall';
import TaskPanel from '@/components/TaskPanel';
import SystemMessage from '@/components/SystemMessage';
import DataManager from '@/components/DataManager';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ProfileData } from '@/lib/types';
import exampleData from '../../data/example-profile.json';

const defaultProfile = exampleData as unknown as ProfileData;

export default function Home() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  const handleImport = useCallback((data: ProfileData) => {
    setProfile(data);
  }, []);

  const handleSideQuestToggle = useCallback((questId: string) => {
    setProfile((prev) => ({
      ...prev,
      quests: {
        ...prev.quests,
        side: prev.quests.side.map((q) =>
          q.id === questId ? { ...q, completed: !q.completed } : q
        ),
      },
    }));
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage:
            'radial-gradient(circle, var(--border-glow) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* 顶部导航栏 */}
      <header
        className="sticky top-0 z-50 px-4 py-3 backdrop-blur-sm"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--bg-primary) 90%, transparent)',
          borderBottom: '2px solid var(--border-color)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚔️</span>
            <h1 className="font-display text-lg md:text-xl" style={{ color: 'var(--accent)' }}>
              Game Life
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <DataManager
              profile={profile}
              onImport={handleImport}
              characterCardId="character-card-export"
            />
            <button
              className="game-button"
              onClick={() => setShowThemeSwitcher(!showThemeSwitcher)}
            >
              🎨 主题
            </button>
          </div>
        </div>
      </header>

      {/* 主题选择器弹出层 */}
      {showThemeSwitcher && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="sticky top-[73px] z-40 px-4 py-4"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--bg-secondary) 95%, transparent)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div className="max-w-7xl mx-auto">
            <ThemeSwitcher onClose={() => setShowThemeSwitcher(false)} />
          </div>
        </motion.div>
      )}

      {/* 主内容区 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* 角色卡片 */}
        <section>
          <CharacterCard character={profile.character} />
        </section>

        {/* 属性面板 */}
        <section>
          <AttributePanel attributes={profile.attributes} />
        </section>

        {/* 双列布局：技能 + 成就 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <SkillList skills={profile.skills} />
          </section>
          <section>
            <AchievementWall achievements={profile.achievements} />
          </section>
        </div>

        {/* 任务面板 */}
        <section>
          <TaskPanel
            quests={profile.quests}
            onSideQuestToggle={handleSideQuestToggle}
          />
        </section>

        {/* 系统旁白 */}
        <section>
          <SystemMessage messages={profile.systemMessages} />
        </section>

        {/* 页脚 */}
        <footer className="text-center py-8 opacity-50" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
          <p>Game Life v{profile.meta.version} — 你的 RPG 人生面板</p>
          <p className="mt-1">数据仅存储于本地，无任何网络上传 — {profile.meta.lastModified.slice(0, 10)}</p>
        </footer>
      </div>
    </main>
  );
}