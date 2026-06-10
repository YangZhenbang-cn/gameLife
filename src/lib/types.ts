export interface CharacterInfo {
  nickname: string;
  title: string;
  level: number;
  avatar: string;
  class: string;
  guild: string;
  bio: string;
  experience: number;
  experienceToNextLevel: number;
  joinDate: string;
}

export interface Attribute {
  name: string;
  icon: string;
  value: number;
  max: number;
  description: string;
}

export interface SkillItem {
  name: string;
  icon: string;
  level: number;
  mastery: number;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockDate?: string;
}

export interface MainQuest {
  id: string;
  title: string;
  progress: number;
  deadline: string;
  description: string;
}

export interface SideQuest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Quests {
  main: MainQuest[];
  side: SideQuest[];
}

export interface ProfileMeta {
  version: string;
  lastModified: string;
  theme: string;
}

export interface ProfileData {
  character: CharacterInfo;
  attributes: Attribute[];
  skills: SkillCategory[];
  achievements: Achievement[];
  quests: Quests;
  systemMessages: string[];
  meta: ProfileMeta;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  preview: string;
  variables: Record<string, string>;
}