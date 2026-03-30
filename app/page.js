'use client'

import { useState } from 'react'

export default function Home() {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('图片大小不能超过 10MB')
        return
      }
      setError('')
      const reader = new FileReader()
      reader.onload = () => setImage({ url: reader.result, file })
      reader.readAsDataURL(file)
    }
  }

  const removeBackground = async () => {
    if (!image) return
    setLoading(true)
    setError('')
    
    try {
      const formData = new FormData()
      formData.append('image_file', image.file)

      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        setResult(URL.createObjectURL(blob))
      } else {
        const err = await response.json()
        setError(err.error || '处理失败')
      }
    } catch (err) {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          AI 背景移除工具
        </h1>
        <p className="text-purple-200 text-center mb-8">一键移除图片背景，无需注册，即用即走</p>

        {/* 上传区域 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <label
            htmlFor="upload"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <svg className="w-12 h-12 text-purple-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-purple-500 font-medium">点击上传或拖拽图片到此处</p>
            <p className="text-gray-400 text-sm mt-1">支持 JPG、PNG、WEBP，最大 10MB</p>
            <input id="upload" type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleUpload} />
          </label>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6 text-center">
            {error}
          </div>
        )}

        {/* 图片预览区 */}
        {image && (
          <div className={`grid gap-6 mb-6 ${result ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'}`}>
            {/* 原图 */}
            <div className="bg-white rounded-2xl shadow-2xl p-4">
              <p className="text-gray-500 text-sm font-medium mb-3 text-center">原图</p>
              <img src={image.url} alt="原图" className="w-full rounded-xl object-contain max-h-80" />
            </div>

            {/* 结果图 */}
            {result && (
              <div className="bg-white rounded-2xl shadow-2xl p-4">
                <p className="text-gray-500 text-sm font-medium mb-3 text-center">处理结果</p>
                <div
                  className="rounded-xl overflow-hidden max-h-80 flex items-center justify-center"
                  style={{ background: 'repeating-conic-gradient(#e5e7eb 0% 25%, white 0% 50%) 0 0 / 20px 20px' }}
                >
                  <img src={result} alt="结果" className="w-full object-contain max-h-80" />
                </div>
                <a
                  href={result}
                  download="removed-bg.png"
                  className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载 PNG
                </a>
              </div>
            )}
          </div>
        )}

        {/* 处理按钮 */}
        {image && (
          <div className="text-center">
            <button
              onClick={removeBackground}
              disabled={loading}
              className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-xl shadow-lg transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  处理中...
                </span>
              ) : '移除背景'}
            </button>
          </div>
        )}

        {/* 底部说明 */}
        <p className="text-center text-purple-200 text-sm mt-8">
          图片仅在内存中处理，不会存储到服务器 · Powered by Remove.bg
        </p>
      </div>
    </div>
  )
}
