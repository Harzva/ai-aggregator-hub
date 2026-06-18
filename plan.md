# AI聚合平台导航站 — 执行计划

## 目标
构建一个漂亮的AI聚合平台/中转站/雷达导航站，汇集50个优质网站，以精美格子矩阵展示，最终提交到GitHub `just-agent` 账号。

## 参考网站
- https://hvoy.ai/ — API中转站纯度检测（掺水率/在线率/延迟检测）
- https://codexradar.com/ — Codex雷达（IQ指数/速度/费用/cache命中率）
- https://codex-reset-radar.pages.dev/ — Codex Reset Radar（额度重置监控）
- https://github.com/mn-api/awesome-ai-proxy — 中转站列表
- https://www.aiapipk.com — API中转站竞技场
- https://aiapidoctor.com — AI API Doctor检测工具

## 阶段

### Stage 1: 研究（已完成）
- 已搜集50个网站，覆盖：中转站纯度检测、聚合平台、中转站、Codex雷达、开源工具
- 数据文件：`src/data/sites.ts`

### Stage 2: 设计（当前）
- 加载技能：读取swarm-coding references/webapp-design.md
- 输出：design/design.md 含视觉系统、配色、布局、交互
- 风格：深色科技风 + 暖色点缀，卡片矩阵，悬停动效，响应式

### Stage 3: 开发（swarm-coding）
- 技术栈：React + Vite + TypeScript + Tailwind CSS + Framer Motion
- 单页面应用：Hero + 分类筛选 + 50卡片网格矩阵 + 搜索 + 详情模态框
- 子任务划分：
  - Scaffold：项目初始化 + 全局样式 + 布局框架
  - Hero组件：标题动画 + 统计数字 + 背景效果
  - SiteCard组件：卡片设计 + 悬停动效 + 标签系统
  - Filter/Search：分类筛选 + 搜索 + 排序
  - 数据整合：50个网站数据 + 分类标签

### Stage 4: GitHub提交
- 提交到 https://github.com/just-agent/ai-aggregator-hub
- 配置GitHub Pages部署

## 网站分类（50个）

### 1. 中转站纯度检测 / 雷达 (8)
1. hvoy.ai — API中转站纯度检测
2. codexradar.com — Codex模型质量雷达
3. aiapidoctor.com — AI API Doctor检测
4. aiapipk.com — API中转站竞技场
5. codex-reset-radar.pages.dev — Codex Reset Radar
6. api-check (github.com/october-coder/api-check) — 开源检测
7. cctest — 中转站检测工具
8. chatgpt.top — 中转站导航与FAQ

### 2. 聚合平台 / 一站式接入 (12)
9. openrouter.ai — 全球模型聚合（343+模型）
10. mnapi.com — All in One中转站聚合
11. poloapi.com — 企业级聚合平台
12. apiyi.com — API易（400+模型）
13. 302.ai — 应用市场型聚合
14. nonelinear.com — 非线智能API（480+模型）
15. tokenriver.ai — 快速接入聚合
16. shiyunapi.com — 诗云API
17. 4ksapi.com — 4ksApi
18. aihubmix.com — 模型混合聚合
19. dmxapi.com — 多模型API
20. uiuiapi.com — 一站式聚合

### 3. 国内中转站 (20)
21. siliconflow.com.cn — 硅基流动（开源模型）
22. api.chatfire.cn — ChatFire
23. api.aabao.top — Aabao
24. gptgod.cloud — GPTGod
25. yunwu.ai — 云雾AI
26. api1.zhtec.xyz — ZHTEC
27. api.bltcy.ai — BLTCY
28. www.gptapi.us — GPTAPI
29. api.tomchat.fun — TomChat
30. api.v3.cm — V3 API
31. api.ephone.ai — ePhone
32. go.sbgpt.site — SBGPT
33. www.ggwk1.online — GGWK1
34. api.openai-ch.top — GalaxyAPI
35. oneapi.paintbot.top — PaintBot
36. opus.gptuu.com — GPTUU
37. open.api.gu28.top — BoneAPI
38. api.yuegle.com — YuegleAPI
39. cnapi.kksj.org — KKSJ
40. api.gptoai.cc — ShawnAPI

### 4. 开源/自建工具 (10)
41. github.com/Calcium-Ion/new-api — NewAPI（4k+ stars）
42. github.com/songquanpeng/one-api — OneAPI
43. github.com/mn-api/awesome-ai-proxy — awesome-ai-proxy导航
44. github.com/JustinXai/ai-api-doctor-site — AI API Doctor开源
45. github.com/october-coder/api-check — api-check开源
46. aiapi.market — AI算力超市
47. kfcv50.link — KFCV50API
48. api.nio.gs — Nio API
49. api.gueai.com — GueAi
50. azapi.com.cn — AZAPI
