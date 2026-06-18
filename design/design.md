# AI聚合平台导航站设计文档

## 全局概念

- **产品名称**：AI聚合平台导航站
- **目标用户**：AI开发者、API采购者、技术爱好者，需要快速找到优质AI中转站与聚合平台的用户。
- **核心体验**：以精美网格矩阵展示50个优质AI网站，提供分类筛选、实时搜索、状态概览的导航体验。
- **单页应用**：仅一个路由 `/`，所有内容在同一页内通过锚点或滚动切换。

## 页面结构与路由

| 路由 | 用途 | 备注 |
|------|------|------|
| `/` | 首页 | 唯一路由，包含所有区块 |

**首页区块顺序**：
1. **Hero** — 大标题 + 副标题 + 动态统计 + 背景装饰
2. **Filter Bar** — 分类筛选 + 实时搜索
3. **Card Grid** — 50个网站卡片矩阵（主体内容）
4. **Footer** — 简洁页脚

## 色彩系统

**背景层**：
- `bg-base`：`#0a0a0f` — 页面最底层背景，极深近黑带微蓝紫倾向
- `bg-card`：`#1a1a24` — 卡片背景，比底层略浅，区分层次
- `bg-hover`：`#252532` — 卡片悬停态背景，柔和过渡
- `bg-input`：`#14141c` — 搜索框、筛选器等输入区域背景
- `bg-overlay`：`rgba(10,10,15,0.85)` — 模态框遮罩层

**文字层**：
- `text-primary`：`#f5f5f5` — 主标题、网站名称，高对比度
- `text-secondary`：`#9ca3af` — 副标题、描述、次要信息
- `text-muted`：`#6b7280` — 页脚、版权等最低层级文字
- `text-accent`：`#f59e0b` — 用于需要强调的数字、高亮词、激活态标签

**点缀色（暖色）**：
- `accent-amber`：`#f59e0b` — 主点缀色，统计数字、激活筛选、重要图标
- `accent-orange`：`#f97316` — 次级点缀，渐变或悬停辅助
- `accent-gold`：`#d97706` — 金色，用于特殊标记或 premium 感

**状态色**：
- `status-online`：`#22c55e` — 在线/正常/检测通过
- `status-warn`：`#eab308` — 注意/预警/中等风险
- `status-danger`：`#ef4444` — 危险/离线/高掺水率

**边框/分隔线**：
- `border-default`：`#27272a` — 卡片默认边框，极弱对比
- `border-hover`：`#3f3f46` — 悬停时边框提亮
- `border-active`：`#f59e0b` — 激活状态边框（如激活的分类标签）

**渐变规则**：
- 仅允许使用深色到更深色的微妙渐变，如 `linear-gradient(180deg, #1a1a24 0%, #13131b 100%)` 用于卡片内阴影层。
- 禁止高饱和蓝紫渐变。
- 允许使用暖色渐变：`linear-gradient(135deg, #f59e0b 0%, #f97316 100%)` 仅用于小面积高亮元素（如统计数字、激活指示器）。

## 字体排版

**字体栈**：
- 主字体：`Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- 数字/等宽：`JetBrains Mono, "Fira Code", monospace` — 用于统计数字、状态数据

**字体层级**：

| 层级 | 大小 | 字重 | 字间距 | 用途 |
|------|------|------|--------|------|
| Display | 48px / 3rem | 800 | -0.02em | Hero 大标题 |
| H1 | 32px / 2rem | 700 | -0.01em | 区块标题 |
| H2 | 20px / 1.25rem | 600 | 0 | 卡片标题（网站名） |
| Body | 14px / 0.875rem | 400 | 0 | 描述、标签文字 |
| Caption | 12px / 0.75rem | 500 | 0.02em | 分类标签、状态文字 |
| Mono | 28px / 1.75rem | 700 | -0.02em | 动态统计数字 |

**行高**：
- 标题：1.2
- 正文：1.6
- 标签/按钮：1

## 布局规则

**容器**：
- 最大宽度：`max-w-7xl`（1280px）
- 水平内边距：`px-4`（移动端）→ `px-6`（平板）→ `px-8`（桌面）
- 内容居中：`mx-auto`

**网格系统**：
- 桌面端（≥1024px）：`grid-cols-4` 或 `grid-cols-5`（卡片网格）
- 平板端（768px–1023px）：`grid-cols-3`
- 移动端（<768px）：`grid-cols-2`
- 网格间距：`gap-4`（16px）→ `gap-5`（20px，桌面）

**间距节奏**：
- 区块间：`py-20`（80px）或 `py-16`（64px）
- 元素间：`space-y-4` 或 `gap-4`
- 卡片内边距：`p-5`（20px）

**断点**：
- `sm`：640px
- `md`：768px
- `lg`：1024px
- `xl`：1280px

## 共享组件

### 1. Header（固定导航栏）
- 高度：64px
- 背景：`bg-base/80` + `backdrop-blur-md`（毛玻璃效果）
- 底部边框：`border-b border-border-default`
- 内容：左侧 Logo（"AI Hub" 文字 + 小图标），右侧搜索框（小尺寸，仅图标触发时展开）
- 固定在顶部：`fixed top-0 w-full z-50`

### 2. Filter Bar（分类筛选栏）
- 位置：Hero 下方，固定吸顶（`sticky top-16`）或随页面滚动
- 布局：左侧横向滚动标签组（4个分类 + 全部），右侧搜索框
- 标签样式：
  - 默认：`bg-card text-secondary border border-border-default rounded-full px-4 py-1.5 text-sm`
  - 激活：`bg-accent-amber/10 text-accent-amber border-accent-amber`
  - 悬停：`border-border-hover text-primary`
- 搜索框：
  - 背景：`bg-input`
  - 圆角：`rounded-lg`
  - 左侧带搜索图标（Lucide Search），占位符文字 "搜索平台..."
  - 高度：40px，宽度自适应（移动端全宽，桌面 240px）

### 3. Card（网站卡片）
- 尺寸：自适应网格宽度，高度约 160px（固定）
- 背景：`bg-card`
- 边框：`border border-border-default rounded-xl`
- 内部结构：
  - 顶部行：网站名称（H2） + 状态指示灯（12px 圆形，带微弱脉冲动画）
  - 中间：简短描述（Body，2 行截断，`line-clamp-2`）
  - 底部：分类标签（Caption，Tag 组件） + 特色图标（Lucide，如 Zap、Shield、BarChart3 等）
- 悬停态：
  - 背景变为 `bg-hover`
  - 边框变为 `border-hover`
  - 添加阴影：`shadow-lg shadow-black/20`
  - 微微上浮：`translateY(-4px)`
  - 过渡：`transition-all duration-300 ease-out`

### 4. Tag（分类标签）
- 尺寸：Caption 大小
- 样式：
  - 中转站检测：`bg-green-500/10 text-green-400 border border-green-500/20`
  - 聚合平台：`bg-amber-500/10 text-amber-400 border border-amber-500/20`
  - 国内中转站：`bg-blue-500/10 text-blue-400 border border-blue-500/20`
  - 开源工具：`bg-purple-500/10 text-purple-400 border border-purple-500/20`
- 圆角：`rounded-full px-2.5 py-0.5`

### 5. Modal（详情模态框）
- 遮罩：`bg-overlay` + `backdrop-blur-sm`
- 面板：居中，最大宽度 480px，宽度 90vw
- 背景：`bg-card` + `border border-border-default rounded-2xl`
- 内部结构：
  - 顶部：网站名称（H1） + 关闭按钮（右上角，圆形 hover bg）
  - 内容区：URL（可点击，Mono 字体，下划线）、完整描述、标签组、状态详情（如有）
  - 底部："访问网站" 主按钮（暖色渐变）+ "复制URL" 次按钮
- 入场动画：遮罩 `opacity 0→1`，面板 `scale 0.95→1 + opacity 0→1`，duration 200ms，ease-out
- 退场动画：反向，duration 150ms
- 关闭方式：点击遮罩、点击关闭按钮、ESC 键

### 6. Stat Counter（动态统计数字）
- 位置：Hero 区域
- 样式：Mono 字体，accent-amber 颜色，数字从 0 滚动增长至目标值
- 下方配小字标签（Caption，text-muted）
- 三个数字："50+" 平台、"4" 大分类、"24/7" 更新

## 交互与动画规范

### 1. 入场动画（Framer Motion）
- **Hero 元素**：
  - 标题：从下方 30px 滑入 + 淡入，`duration: 0.6s`，`ease: [0.22, 1, 0.36, 1]`（ease-out-cubic）
  - 副标题：延迟 0.1s，同上
  - 统计数字：延迟 0.2s，stagger 0.1s，从下方 20px 滑入 + 淡入
- **卡片网格**：
  - 使用 `staggerChildren: 0.03`（每张卡片间隔 30ms）
  - 每张卡片：`y: 20 → 0`, `opacity: 0 → 1`, `duration: 0.4s`, `ease: easeOut`
  - 筛选切换时：重新触发 stagger 入场
- **筛选标签**：
  - 激活切换时：下划线或背景色平滑过渡，`layoutId` 实现滑动指示器效果（pill 在标签间滑动）

### 2. 悬停效果
- **卡片**：
  - `transform: translateY(-4px)`
  - `box-shadow: 0 12px 24px -8px rgba(0,0,0,0.3)`
  - 边框色从 `border-default` 过渡到 `border-hover`
  - 时长：`300ms`，`ease-out`
- **按钮/标签**：
  - 背景色透明度提升或颜色提亮
  - 时长：`200ms`

### 3. 筛选与搜索交互
- **分类筛选**：
  - 点击标签：即时过滤卡片，无刷新
  - 过滤动画：未匹配的卡片 `opacity: 0, scale: 0.95, display: none`，匹配卡片保持/重新入场
  - 使用 `AnimatePresence` 处理卡片进出
- **实时搜索**：
  - 输入时防抖 150ms 后触发过滤
  - 过滤逻辑：匹配网站名称或描述（不区分大小写）
  - 无结果态：展示 "未找到匹配平台" 空状态（带搜索图标 + 提示文字）

### 4. 滚动行为
- 页面整体平滑滚动：`scroll-behavior: smooth`
- 筛选栏在滚动时保持可见（`sticky` 或固定定位）
- 可选：向下滚动时 Header 隐藏（`transform: translateY(-100%)`），向上滚动时显示，提升沉浸感

### 5. 模态框交互
- 触发：点击卡片任意区域（除按钮外）
- 打开：遮罩淡入，面板从底部滑入（移动端）或缩放淡入（桌面端）
- 关闭：点击遮罩、点击关闭按钮、按 ESC
- 背景锁定：打开时禁止 body 滚动

### 6. 状态指示灯动画
- 在线状态：绿色圆点，带微弱脉冲动画（`animate-pulse` 或自定义 keyframes，scale 1→1.2→1，opacity 1→0.7→1，周期 2s）
- 离线状态：红色圆点，静态无脉冲

### 7. 性能 guardrails
- 所有动画仅使用 `transform` 和 `opacity`
- 卡片数量多（50个），避免同时触发重布局
- 使用 `will-change: transform` 在卡片上（谨慎使用）
- 提供 `prefers-reduced-motion` 媒体查询降级：直接显示，无动画

## 依赖清单

```
framer-motion       — 入场动画、筛选过渡、模态框动画、layoutId 指示器
lucide-react        — 所有图标（Search, Zap, Shield, BarChart3, Globe, X, ExternalLink, Copy, Activity, Cpu, Code, Terminal, AlertCircle, CheckCircle, Wifi, WifiOff, ChevronDown, Sparkles, Grid, Layers, Server, Wrench, BookOpen, ArrowUpRight, Menu, Github, Twitter 等）
clsx / tailwind-merge  — 条件类名合并（如项目使用 Tailwind）
```

**技术栈假设**：
- React 18+
- Tailwind CSS（强烈推荐，与设计 tokens 完全对应）
- Vite（构建工具）

## 资源清单

| 文件名 | 类型 | 用途 | 说明 |
|--------|------|------|------|
| 无需自定义图片 | — | — | 本项目纯 UI 驱动，无需图片资源 |

**背景装饰（纯 CSS/Canvas 实现）**：
- **粒子网格效果**：Hero 区域背景使用轻量级 Canvas 或 CSS 实现：
  - 方案 A（推荐）：`radial-gradient` 叠加微弱网格点阵（CSS `background-image: radial-gradient(#27272a 1px, transparent 1px)` + `background-size: 32px 32px`）
  - 方案 B：极细线条构成的网格（类似 codexradar 的仪表感），低透明度（`opacity: 0.3`）
  - 方案 C：微弱的发光粒子（Canvas 绘制，数量<50，运动缓慢），颜色为 `accent-amber` 的极低透明度版本
- **光晕装饰**：Hero 区域左上角/右下角各一个大型模糊圆（`blur-3xl`），颜色为 `accent-amber` 的 5% 透明度，增加深度感，不抢主体视觉

**图标策略**：
- 所有功能图标使用 `lucide-react`，不引入自定义 SVG。
- 每个卡片根据分类展示一个代表图标：
  - 中转站检测：`Activity` 或 `BarChart3`
  - 聚合平台：`Layers` 或 `Grid`
  - 国内中转站：`Globe` 或 `Server`
  - 开源工具：`Code` 或 `Wrench`

---

## 设计原则总结

1. **深色优先**：全站以 `#0a0a0f` 为底，所有层级在此之上微妙提亮，避免使用纯白背景。
2. **暖色点睛**：琥珀/橙色系仅用于需要吸引注意的元素（统计数字、激活状态、主按钮），面积占比 < 5%。
3. **数据仪表感**：参考 hvoy.ai 的简洁数据展示，卡片信息密度适中，拒绝冗长，突出网站名称和状态。
4. **一致动效**：所有过渡统一使用 `ease-out` 或 `cubic-bezier(0.22, 1, 0.36, 1)`，时长在 200ms–400ms 之间，保持克制。
5. **响应式优先**：移动端确保 2 列网格可读，筛选栏支持横向滚动，搜索框在移动端置顶展开。
