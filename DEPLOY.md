# Cloudflare Pages 部署配置

## 构建设置

- **构建命令**: `npm run build`
- **构建输出目录**: `dist`
- **根目录**: `/`
- **Node 版本**: `18` 或更高

## 环境变量

在 Cloudflare Pages 项目设置中添加：

```
VITE_REMOVEBG_API_KEY=your_actual_api_key
```

## 部署步骤

1. 登录 Cloudflare Dashboard
2. 进入 Pages 页面
3. 点击 "Create a project"
4. 连接 Git 仓库或直接上传
5. 配置构建设置（如上）
6. 添加环境变量
7. 点击 "Save and Deploy"

## 自定义域名（可选）

在项目设置中可以添加自定义域名。
