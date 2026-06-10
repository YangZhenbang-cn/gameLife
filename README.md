# 地球OL 个人人物卡（Earth OL Character Card）

RPG 风格游戏化个人状态面板 — 你的真实世界角色档案。

## 快速开始

```bash
npm install
npm run dev        # 开发模式 http://localhost:3000
npm run build      # 构建静态站点 → out/
```

## 功能特性

- **6 个标签页**：档案 / 属性 / 技能 / 关系 / 成就与任务 / 资产与日程
- **三套主题**：像素勇者（pixel）/ 终端黑客（terminal）/ 星界魔法（arcane），持久化到 localStorage
- **六维雷达图**（智魅体耐谋创），颜色动态适配主题
- **完整数据驱动**：JSON 导入/导出 + 导出为 PNG 图片（可选简洁/完整范围）
- **Framer Motion 动效**：标签页切换、进度条、任务完成闪烁、心形好感度

## JSON 数据字段说明

编辑 `data/example-profile.json` 即可自定义人物卡内容。

### character — 角色信息

| 字段 | 说明 |
|------|------|
| `character.basic.realName` | 真实姓名 |
| `character.basic.nickname` | 昵称 / 游戏 ID |
| `character.basic.gender` | 性別 |
| `character.basic.birthDate` | 出生日期 (`YYYY-MM-DD`) |
| `character.basic.birthPlace` | 出生地 |
| `character.basic.residence` | 现居地 |
| `character.basic.occupation` | 职业 |
| `character.basic.affiliation` | 所属组织 |
| `character.basic.height` | 身高 (cm) |
| `character.basic.weight` | 体重 (kg) |
| `character.basic.bloodType` | 血型 |
| `character.basic.earthOL.server` | 地球OL 服务器 |
| `character.basic.earthOL.status` | 在线状态 |
| `character.basic.earthOL.vipLevel` | VIP 等级 (1-7 星) |
| `character.title` | 称号 |
| `character.level` | 当前等级 |
| `character.experience` | 当前经验值 |
| `character.maxExperience` | 升级所需经验 |

### attributes — 属性

| 字段 | 说明 |
|------|------|
| `attributes.hexagram` | 六维属性（intelligence 智力 / charisma 魅力 / strength 力量 / endurance 耐力 / tactics 策略 / creativity 创造力），1-10 |
| `attributes.custom[]` | 自定义属性条（key / label / value / max / desc） |
| `attributes.health.constitution` | 体质类型 |
| `attributes.health.medicalHistory[]` | 病史列表 |
| `attributes.health.allergies[]` | 过敏源列表（警示色展示） |

### skills — 技能

| 字段 | 说明 |
|------|------|
| `skills.professional[]` | 专业技能（name / level / icon / description） |
| `skills.life[]` | 生活技能 |
| `skills.interests[]` | 兴趣爱好 |
| `skills.passive[]` | 被动技能（字符串数组，标签展示） |

### background — 背景

| 字段 | 说明 |
|------|------|
| `background.summary` | 个人简介 |
| `background.education[]` | 教育经历（time / event） |
| `background.career[]` | 工作经历 |
| `background.turningPoints[]` | 人生转折点 |
| `background.personality` | 性格描述 |
| `background.coreValues` | 核心价值观 |
| `background.lifeGoals` | 人生目标 |
| `background.likes[]` | 喜好列表 |
| `background.dislikes[]` | 讨厌列表 |
| `background.redLines[]` | 红线 / 底线 |
| `background.catchphrase` | 口头禅 |
| `background.iconicItem` | 标志物 |
| `background.blackHistory` | 黑历史 |

### relationships — 关系网络

| 字段 | 说明 |
|------|------|
| `relationships.family[]` | 家庭成员（name / role / affection 1-10） |
| `relationships.closeFriends[]` | 好友（name / affection） |
| `relationships.enemies[]` | 宿敌 |
| `relationships.crush` | 暗恋对象（name / affection） |

好感度 >= 8 全红心，>= 5 半红，< 5 灰色。

### achievements — 成就

| 字段 | 说明 |
|------|------|
| `achievements[].id` | 成就 ID |
| `achievements[].name` | 成就名称 |
| `achievements[].desc` | 成就描述 |
| `achievements[].unlocked` | 是否解锁 |

### tasks — 任务

| 字段 | 说明 |
|------|------|
| `tasks.main` | 主线任务（title / progress 0-100 / deadline） |
| `tasks.side[]` | 支线任务（title / done） |
| `tasks.daily[]` | 每日任务（title / done） |

每日任务可勾选，状态仅在当前会话保留（刷新丢失）。

### assets — 资产

| 字段 | 说明 |
|------|------|
| `assets.gold` | 金币储备（元） |
| `assets.fixedAssets[]` | 固定资产列表 |
| `assets.debt` | 负债总额（元） |
| `assets.freeTime` | 空闲时间描述 |

### schedule — 作息

| 字段 | 说明 |
|------|------|
| `schedule.wakeUp` | 起床时间 |
| `schedule.sleep` | 入睡时间 |
| `schedule.workHours` | 工作时间段 |
| `schedule.lunchBreak` | 午休时间 |
| `schedule.weekend` | 周末作息 |
| `schedule.commute` | 通勤方式 |
| `schedule.frequentPlaces[]` | 常去地点 |
| `schedule.diet` | 饮食习惯 |
| `schedule.entertainment[]` | 娱乐方式 |

### systemMessages — 系统旁白

字符串数组，底部随机轮播展示。

## 自定义主题

编辑 `src/styles/themes.css` 中的 `[data-theme="..."]` 块，修改 CSS 变量即可。三套预设：

- `[data-theme="pixel"]` — 像素勇者（蓝紫调）
- `[data-theme="terminal"]` — 终端黑客（CRT 扫描线 + 绿色）
- `[data-theme="arcane"]` — 星界魔法（金紫调）

## 技术栈

Next.js 14 (App Router) / TypeScript 严格模式 / Tailwind CSS 3 / Framer Motion / Recharts / html-to-image / React Icons

## 构建产物

`npm run build` → `out/` 目录，可直接部署到 GitHub Pages 或任意静态托管。
