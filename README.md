# AI 背景移除工具

基于 Remove.bg API 的在线图片背景移除工具，部署在 Cloudflare Pages。

## 功能特性

- 🎨 一键移除图片背景
- 🚀 纯前端实现，无需服务器
- 💾 内存处理，不存储用户数据
- 📱 响应式设计，支持移动端

## 快速开始

### 1. 获取 Remove.bg API Key

访问 [Remove.bg](https://www.remove.bg/api) 注册并获取 API Key（免费版每月 50 次）

### 2. 配置 API Key

编辑 `src/App.jsx`，将 `YOUR_API_KEY_HERE` 替换为你的 API Key

### 3. 本地开发

```bash
npm install
npm run dev
```

### 4. 部署到 Cloudflare Pages

```bash
npm run build
```

然后将 `dist` 目录上传到 Cloudflare Pages，或连接 GitHub 仓库自动部署。

## 部署配置

**Cloudflare Pages 设置：**
- 构建命令：`npm run build`
- 构建输出目录：`dist`
- Node 版本：18+

## 技术栈

- React 18
- Vite
- Remove.bg API

## 许可

MIT
