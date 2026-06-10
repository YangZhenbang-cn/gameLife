# 游戏化个人状态面板 – 框架搭建需求文档（多主题·本地优先·导入导出）

## 0\. 项目定位与设计理念

这是一个**纯前端、本地优先**的 RPG 风格个人状态面板网站。

- 所有数据由用户自己掌控：通过导入/导出 JSON 文件来加载或备份个人资料，也可将面板导出为图片卡片。

- 网站不收集、不存储任何用户信息，无后端，无数据库。

- 提供**多套游戏视觉风格**，用户可通过卡片式界面一键切换，满足不同审美偏好（像素风、终端风、奇幻风等）。

- 本阶段目标：搭建**可扩展的游戏化框架**，内置主题系统与数据管理功能，所有展示数据使用占位示例。

## 1\. MVP 交付范围（第一阶段）

构建一个包含以下模块的单页面角色面板，所有内容均由用户数据驱动。

### 1\.1 角色基础信息

- 头像、昵称、称号、等级、经验条

- 等级可根据成就数量自动计算或直接配置

### 1\.2 属性面板（可扩展）

- 可配置的属性列表，每项含名称、数值、最大值、描述

- 进度条动画，悬停/点击显示描述文本

### 1\.3 技能列表（可扩展）

- 技能按类别分组，每项含名称、图标、熟练度、等级标签

- 完全由数据配置

### 1\.4 成就陈列室

- 网格展示已解锁/未解锁成就，点击弹出详情

- 成就数据全配置化

### 1\.5 任务面板

- 主线任务（标题、进度条、截止日期）

- 支线任务列表，可勾选完成（带完成动画）

### 1\.6 系统旁白

- 随机显示鼓励/提示性文字，文案从配置读取

### 1\.7 数据管理（导入/导出）—— 核心交互

- **导入 JSON**：用户选择本地`.json` 文件，解析后更新整个面板

- **导出 JSON**：将当前面板数据（含任务勾选等临时状态）导出为 `.json` 文件

- **导出资料卡片**：将角色卡片区域渲染为 PNG 图片并下载（使用 `html-to-image`）

- 所有操作在浏览器端完成，无数据上传

### 1\.8 主题切换系统 —— 新增核心模块

- **预设多套游戏主题**：每套主题包含独立的配色、字体、边框样式、装饰元素等

- **主题选择界面**：以“主题卡片”网格展示各主题的缩略图/预览，点击卡片即可切换

- **主题持久化**：用户选择的主题保存到 `localStorage`，下次访问自动应用

- **扩展性**：主题定义为独立的样式配置对象，未来可轻松增加新主题，甚至支持用户自定义

- **框架阶段至少内置 3 套示例主题**，建议类型：


    - 🎮 像素勇者（8bit 风格，明亮像素色块，`nes.css` 风格）

    - 💻 终端黑客（黑底绿字，等宽字体，CRT 扫描线效果）

    - 🌌 星界魔法（深紫/金色渐变，柔和发光，卷轴装饰元素）

## 2\. 框架扩展性要求

- **全数据驱动**：界面完全由 `profile.json` 驱动，不硬编码任何具体属性名或数量

- **模块化组件**：每个面板、任务、成就、主题选择器等均为独立组件

- **类型安全**：TypeScript 定义完整的数据接口与主题配置接口

- **主题引擎**：采用 CSS 变量 \+ Tailwind 预设或 `data-theme` 属性切换，组件样式通过变量引用，实现动态换肤

- **隐私设计**：数据仅存在于用户本地文件或浏览器状态中，无网络外传

## 3\. 数据流程说明

- 首次访问加载内置 `example-profile.json`（占位数据）和默认主题

- 用户可随时导入自定义 JSON 覆盖当前数据

- 任务勾选状态等临时交互保留在组件状态中，刷新后丢失（如需保留可导出新 JSON 再导入）

- 主题选择后立即生效，刷新后仍然保持

## 4\. 技术栈与工具

- **框架**：Next\.js 14（App Router），静态导出模式（`next export`）

- **样式方案**：Tailwind CSS，结合 CSS 变量实现主题切换；也可搭配 `nes.css` 等像素风库

- **动效**：Framer Motion（进度条、卡片切换、任务完成粒子）

- **图标**：react\-icons 或 emoji

- **数据加载**：默认加载示例 JSON，通过 React 状态管理当前数据；文件读取使用 FileReader API

- **图片导出**：`html-to-image` 或 `dom-to-image`

- **主题持久化**：`localStorage` \+ 自定义 React Hook

- **部署**：GitHub Pages \+ GitHub Actions 自动部署

- **类型检查**：TypeScript 严格模式

## 5\. 项目结构约定

```plain
/
├── public/
│   ├── avatar.png
│   └── themes/ # 主题预览缩略图（可选）
├── data/
│   └── example-profile.json # 示例数据
├── src/
│   ├── app/
│   │   ├── page.tsx # 主页面
│   │   └── layout.tsx
│   ├── components/
│   │   ├── CharacterCard.tsx
│   │   ├── AttributePanel.tsx
│   │   ├── SkillList.tsx
│   │   ├── AchievementWall.tsx
│   │   ├── TaskPanel.tsx
│   │   ├── SystemMessage.tsx
│   │   ├── DataManager.tsx # 导入导出按钮组件
│   │   └── ThemeSwitcher.tsx # 主题卡片选择器
│   ├── lib/
│   │   ├── types.ts # 数据与主题类型定义
│   │   ├── defaultData.ts # 默认数据加载
│   │   └── themes.ts # 主题配置定义
│   └── styles/
│       └── themes.css # 各主题 CSS 变量
├── .github/workflows/deploy.yml
└── next.config.js
```

## 6\. 主题配置结构示例

`lib/themes.ts` 中定义主题对象数组：

```typescript
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  preview: string;          // 预览图路径或 emoji 示意
  variables: Record<string, string>; // CSS 变量映射
}

export const themes: ThemeConfig[] = [
  {
    id: 'pixel',
    name: '像素勇者',
    description: '8bit 复古游戏风格',
    preview: '🎮',
    variables: {
      '--bg-primary': '#fce18a',
      '--text-primary': '#2e2e2e',
      '--border-glow': '#e76e55',
      '--font-mono': '"Press Start 2P"',
    },
  },
  {
    id: 'terminal',
    name: '终端黑客',
    description: '绿屏终端，极客风范',
    preview: '💻',
    variables: {
      '--bg-primary': '#0a0a0a',
      '--text-primary': '#00ff41',
      '--border-glow': '#00ff41',
      '--font-mono': '"Fira Code", monospace',
    },
  },
  {
    id: 'arcane',
    name: '星界魔法',
    description: '魔法卷轴，紫金幻境',
    preview: '🌌',
    variables: {
      '--bg-primary': '#1a1025',
      '--text-primary': '#e0d7ff',
      '--border-glow': '#c084fc',
      '--font-mono': '"Cinzel", serif',
    },
  },
];
```

在全局样式中通过 `[data-theme="..."]` 选择器应用对应变量，`ThemeSwitcher` 组件负责设置 `document.documentElement` 的 `data-theme` 属性并存储到 `localStorage`。

## 7\. 页面布局与交互

- 顶部：角色卡片 \+ 数据管理按钮（导入/导出 JSON、导出图片）\+ 主题切换入口（按钮或图标）

- 点击主题入口，弹出/展开“主题卡片选择器”，以 3 列网格展示各主题的预览卡片，当前使用主题高亮标记，点击卡片立即切换

- 下方按区块展示属性、技能、成就、任务、旁白

- 响应式：移动端卡片选择器变为横向滚动

## 8\. 设计风格指南（默认主题）

- 默认激活“终端黑客”或“像素勇者”，体现游戏感

- 所有主题均保持暗色为主（也可有一套亮色主题），确保发光边框、半透明面板等游戏元素清晰

- 主题卡片选择器设计：每个卡片显示主题名称、描述、配色预览条和一个小 icon，选中时边框发光
