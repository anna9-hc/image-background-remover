import './globals.css'

export const metadata = {
  title: 'AI 背景移除工具',
  description: '一键移除图片背景，无需专业技能',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
