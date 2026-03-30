# AI 背景移除工具

基于 Next.js + Tailwind CSS + Remove.bg API 的在线图片背景移除工具。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS
- **AI 服务**: Remove.bg API
- **部署**: Cloudflare Pages

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Remove.bg API Key：

```
REMOVEBG_API_KEY=your_api_key_here
```

获取 API Key：https://www.remove.bg/api

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 4. 构建生产版本

```bash
npm run build
npm start
```

## 功能特性

- ✅ 一键移除图片背景
- ✅ 支持 JPG、PNG、WEBP 格式
- ✅ 文件大小限制 10MB
- ✅ 实时预览对比
- ✅ 下载处理后的 PNG 图片
- ✅ 响应式设计，支持移动端
- ✅ API Key 服务端保护

## 部署到 Cloudflare Pages

1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 输出目录：`.next`
4. 环境变量：添加 `REMOVEBG_API_KEY`

## 项目结构

```
├── app/
│   ├── api/remove-bg/    # API 路由
│   ├── globals.css       # 全局样式
│   ├── layout.js         # 根布局
│   └── page.js           # 主页面
├── public/               # 静态资源
├── .env.example          # 环境变量示例
└── package.json
```

## 许可

MIT
