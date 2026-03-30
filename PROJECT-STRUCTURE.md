# 项目结构说明

```
bg-remover/
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── App.jsx            # 主应用组件
│   ├── main.jsx           # 应用入口
│   └── index.css          # 全局样式
├── .env.example           # 环境变量示例
├── .gitignore             # Git 忽略文件
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── vite.config.js         # Vite 配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.node.json     # Node TypeScript 配置
├── README.md              # 项目说明
├── MVP-REQUIREMENTS.md    # MVP 需求文档
└── DEPLOY.md              # 部署说明

## 快速开始

1. 安装依赖：`npm install`
2. 复制 `.env.example` 为 `.env`
3. 在 `.env` 中填入你的 Remove.bg API Key
4. 启动开发服务器：`npm run dev`
5. 构建生产版本：`npm run build`
```
