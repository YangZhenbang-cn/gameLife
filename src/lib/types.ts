// ============================================================
// 地球OL 个人人物卡 — TypeScript 类型定义（完整版）
// ============================================================

/** 地球OL 服务器信息 */
export interface EarthOLInfo {
  server: string;
  status: string;
  vipLevel: number;
}

/** 角色基础身份 */
export interface BasicInfo {
  realName: string;
  nickname: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  residence: string;
  occupation: string;
  affiliation: string;
  height: number;
  weight: number;
  bloodType: string;
  avatar: string;
  earthOL: EarthOLInfo;
}

/** 角色顶层信息 */
export interface CharacterData {
  basic: BasicInfo;
  title: string;
  level: number;
  experience: number;
  maxExperience: number;
}

/** 六维属性值 */
export interface HexagramAttributes {
  intelligence: number;
  charisma: number;
  strength: number;
  endurance: number;
  tactics: number;
  creativity: number;
}

/** 可自定义属性条 */
export interface CustomAttribute {
  key: string;
  label: string;
  value: number;
  max: number;
  desc: string;
}

/** 健康信息 */
export interface HealthInfo {
  constitution: string;
  medicalHistory: string[];
  allergies: string[];
}

/** 属性模块 */
export interface AttributesData {
  hexagram: HexagramAttributes;
  custom: CustomAttribute[];
  health: HealthInfo;
}

/** 技能项（通用） */
export interface SkillItem {
  name: string;
  level: number;
  icon: string;
  description?: string;
}

/** 技能模块（四类分组） */
export interface SkillsData {
  professional: SkillItem[];
  life: SkillItem[];
  interests: SkillItem[];
  passive: string[];
}

/** 时间线条目 */
export interface TimelineEntry {
  time: string;
  event: string;
}

/** 背景模块 */
export interface BackgroundData {
  summary: string;
  education: TimelineEntry[];
  career: TimelineEntry[];
  turningPoints: TimelineEntry[];
  personality: string;
  coreValues: string;
  lifeGoals: string;
  likes: string[];
  dislikes: string[];
  redLines: string[];
  catchphrase: string;
  iconicItem: string;
  blackHistory: string;
}

/** 关系条目 */
export interface RelationshipItem {
  name: string;
  role?: string;
  affection: number; // 1-10
}

/** 关系模块 */
export interface RelationshipsData {
  family: RelationshipItem[];
  closeFriends: RelationshipItem[];
  enemies: RelationshipItem[];
  crush: RelationshipItem | null;
}

/** 成就 */
export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  unlockDate?: string;
}

/** 主线任务 */
export interface MainTask {
  title: string;
  progress: number;
  deadline: string;
}

/** 支线任务 */
export interface SideTask {
  title: string;
  done: boolean;
}

/** 每日任务 */
export interface DailyTask {
  title: string;
  done: boolean;
}

/** 任务模块 */
export interface TasksData {
  main: MainTask;
  side: SideTask[];
  daily: DailyTask[];
}

/** 资产模块 */
export interface AssetsData {
  gold: number;
  fixedAssets: string[];
  debt: number;
  freeTime: string;
}

/** 日程模块 */
export interface ScheduleData {
  wakeUp: string;
  sleep: string;
  workHours: string;
  lunchBreak: string;
  weekend: string;
  commute: string;
  frequentPlaces: string[];
  diet: string;
  entertainment: string[];
}

/** 个人资料元信息 */
export interface ProfileMeta {
  version: string;
  lastModified: string;
  theme: string;
}

/** 顶层个人资料结构 */
export interface ProfileData {
  character: CharacterData;
  attributes: AttributesData;
  skills: SkillsData;
  background: BackgroundData;
  relationships: RelationshipsData;
  achievements: Achievement[];
  tasks: TasksData;
  assets: AssetsData;
  schedule: ScheduleData;
  systemMessages: string[];
  meta: ProfileMeta;
}

/** 主题配置 */
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  preview: string;
  variables: Record<string, string>;
}

// ---------- 向后兼容（旧组件过渡期使用） ----------

/** @deprecated 使用 CharacterData.basic */
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

/** @deprecated 使用 CustomAttribute */
export interface Attribute {
  name: string;
  icon: string;
  value: number;
  max: number;
  description: string;
}

/** @deprecated 使用 SkillsData */
export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

/** @deprecated 使用 TasksData */
export interface MainQuest {
  id: string;
  title: string;
  progress: number;
  deadline: string;
  description: string;
}

/** @deprecated 使用 SideTask */
export interface SideQuest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

/** @deprecated 使用 TasksData */
export interface Quests {
  main: MainQuest[];
  side: SideQuest[];
}
