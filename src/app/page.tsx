'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditModal from '@/components/EditModal';
import EditToggle from '@/components/EditToggle';
import BasicInfoCard from '@/components/BasicInfo';
import Background from '@/components/Background';
import HexagramChart from '@/components/HexagramChart';
import AttributePanel from '@/components/AttributePanel';
import HealthCard from '@/components/HealthCard';
import SkillList from '@/components/SkillList';
import AchievementWall from '@/components/AchievementWall';
import TaskPanel from '@/components/TaskPanel';
import RelationshipList from '@/components/RelationshipList';
import AssetsCard from '@/components/AssetsCard';
import ScheduleTable from '@/components/ScheduleTable';
import SystemMessage from '@/components/SystemMessage';
import DataManager from '@/components/DataManager';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { ProfileData } from '@/lib/types';
import exampleData from '../../data/example-profile.json';

const defaultProfile = exampleData as unknown as ProfileData;

const TAB_LIST = [
  { key: 'profile', label: '📋 档案' },
  { key: 'attributes', label: '⭐ 属性' },
  { key: 'skills', label: '⚔️ 技能' },
  { key: 'relations', label: '🤝 关系' },
  { key: 'quests', label: '🏆 成就与任务' },
  { key: 'assets', label: '💰 资产与日程' },
] as const;

type TabKey = (typeof TAB_LIST)[number]['key'];

export default function Home() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [activeTab, setActiveTab] = useState<TabKey>('profile');
  const [showThemeSwitcher, setShowThemeSwitcher] = useState(false);

  const handleImport = useCallback((data: ProfileData) => {
    setProfile(data);
  }, []);

  const handleSideTaskToggle = useCallback((index: number) => {
    setProfile((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        side: prev.tasks.side.map((t, i) =>
          i === index ? { ...t, done: !t.done } : t
        ),
      },
    }));
  }, []);

  const handleDailyTaskToggle = useCallback((index: number) => {
    setProfile((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        daily: prev.tasks.daily.map((t, i) =>
          i === index ? { ...t, done: !t.done } : t
        ),
      },
    }));
  }, []);

  /** 通用更新函数：深路径设置 */
  const updateProfile = useCallback((path: string[], value: unknown) => {
    setProfile((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const next = JSON.parse(JSON.stringify(prev)) as Record<string, any>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let node: Record<string, any> = next;
      for (let i = 0; i < path.length - 1; i++) {
        node = node[path[i]] as Record<string, any>;
      }
      node[path[path.length - 1]] = value;
      return next as ProfileData;
    });
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03]" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: 'radial-gradient(circle, var(--border-glow) 1px, transparent 1px)',
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
            <span className="text-2xl">🌍</span>
            <h1 className="font-display text-lg md:text-xl" style={{ color: 'var(--accent)' }}>
              地球OL · 个人人物卡
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <EditToggle />
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
      <AnimatePresence>
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
      </AnimatePresence>

      {/* 标签页导航 */}
      <nav
        className="sticky z-30 px-4 py-2 overflow-x-auto"
        style={{
          top: showThemeSwitcher ? 'auto' : '73px',
          backgroundColor: 'color-mix(in srgb, var(--bg-primary) 95%, transparent)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="max-w-7xl mx-auto flex gap-1 flex-nowrap min-w-max">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.key}
              className="px-4 py-2 text-xs font-mono whitespace-nowrap rounded-t transition-all duration-200"
              style={{
                backgroundColor: activeTab === tab.key ? 'var(--bg-card)' : 'transparent',
                color: activeTab === tab.key ? 'var(--accent)' : 'var(--text-secondary)',
                border: activeTab === tab.key ? '2px solid var(--border-color)' : '2px solid transparent',
                borderBottom: activeTab === tab.key ? '2px solid var(--bg-card)' : '2px solid transparent',
                position: 'relative',
                top: '1px',
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 主内容区 */}
        <div id="main-content" className="relative z-10 max-w-7xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence mode="wait">
            {/* 标签1：档案 */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <BasicInfoCard
                  basic={profile.character.basic}
                  title={profile.character.title}
                  level={profile.character.level}
                  experience={profile.character.experience}
                  maxExperience={profile.character.maxExperience}
                  onUpdate={updateProfile}
                />
                <Background background={profile.background} onUpdate={updateProfile} />
              </motion.div>
            )}

            {/* 标签2：属性 */}
            {activeTab === 'attributes' && (
              <motion.div
                key="attributes"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <HexagramChart hexagram={profile.attributes.hexagram} />
                <AttributePanel attributes={profile.attributes.custom} />
                <HealthCard health={profile.attributes.health} onUpdate={updateProfile} />
              </motion.div>
            )}

            {/* 标签3：技能 */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <SkillList skills={profile.skills} onUpdate={updateProfile} />
              </motion.div>
            )}

            {/* 标签4：关系 */}
            {activeTab === 'relations' && (
              <motion.div
                key="relations"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <RelationshipList relationships={profile.relationships} onUpdate={updateProfile} />
              </motion.div>
            )}

            {/* 标签5：成就与任务 */}
            {activeTab === 'quests' && (
              <motion.div
                key="quests"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <AchievementWall achievements={profile.achievements} onUpdate={updateProfile} />
                <TaskPanel
                  tasks={profile.tasks}
                  onSideTaskToggle={handleSideTaskToggle}
                  onDailyTaskToggle={handleDailyTaskToggle}
                  onUpdate={updateProfile}
                />
              </motion.div>
            )}

            {/* 标签6：资产与日程 */}
            {activeTab === 'assets' && (
              <motion.div
                key="assets"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <AssetsCard assets={profile.assets} onUpdate={updateProfile} />
                <ScheduleTable schedule={profile.schedule} onUpdate={updateProfile} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 系统旁白 */}
          <section>
            <SystemMessage messages={profile.systemMessages} />
          </section>

          {/* 页脚 */}
          <footer className="text-center py-8 opacity-50" style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            <p>地球OL · 个人人物卡 v{profile.meta.version} — 你的真实世界角色档案</p>
            <p className="mt-1">数据仅存储于本地，无任何网络上传 — {profile.meta.lastModified.slice(0, 10)}</p>
          </footer>
        </div>
    <EditModal />
    </main>
  );
}
