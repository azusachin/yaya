# 高中化学实验室（Chem Lab Visual）

一个面向高中生的可视化化学实验网站，提供双语实验资料、交互式实验动画与快速检索功能。

## 功能概览

- 🧪 每个实验包含步骤、原理与反应方程式（中英文）
- 🎥 使用 D3.js 渲染动态实验可视化
- 🔍 标签与搜索过滤，快速定位实验内容
- 🌐 支持中英文切换
- 🚀 GitHub + Cloudflare Pages 自动部署

## 仓库结构

```text
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
├── src/
│   ├── components/
│   │   ├── ExperimentCard.jsx
│   │   ├── ExperimentPage.jsx
│   │   ├── ExperimentVisual.jsx
│   │   ├── Header.jsx
│   │   ├── HomePage.jsx
│   │   ├── LanguageContext.jsx
│   │   ├── LanguageToggle.jsx
│   │   ├── Layout.jsx
│   │   ├── SearchBar.jsx
│   │   └── TagFilter.jsx
│   ├── data/
│   │   └── experiments.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## 本地运行

```bash
npm install
npm run dev
```

## Cloudflare 自动部署（GitHub Actions）

1. 在 Cloudflare Pages 创建站点，并连接 GitHub 仓库。
2. 在仓库 Settings → Secrets 添加以下变量：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_PROJECT_NAME`
3. 推送代码后，GitHub Actions 会自动构建并发布。

## 可视化实验实现思路

- 使用 D3.js 在 SVG 中绘制两个“反应容器”。
- 通过粒子（圆形）模拟反应物移动与混合过程。
- 动画结束后将颜色过渡为产物颜色，帮助理解反应发生的阶段。

如需扩展为更真实的模拟，可进一步引入：

- D3.js 的力导向布局模拟碰撞
- Three.js 构建三维分子结构
- WebGL 或 Canvas 渲染更复杂的粒子系统

## 许可

MIT
