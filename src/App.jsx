import { useState } from 'react'

export default function App() {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const removeBackground = async () => {
    if (!image) return
    setLoading(true)
    
    try {
      const formData = new FormData()
      const blob = await fetch(image).then(r => r.blob())
      formData.append('image_file', blob)
      formData.append('size', 'auto')

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': 'YOUR_API_KEY_HERE'
        },
        body: formData
      })

      if (response.ok) {
        const blob = await response.blob()
        setResult(URL.createObjectURL(blob))
      }
    } catch (error) {
      alert('处理失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>AI 背景移除工具</h1>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload}
          style={{ display: 'none' }}
          id="upload"
        />
        <label 
          htmlFor="upload"
          style={{
            padding: '12px 30px',
            background: '#4F46E5',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'inline-block'
          }}
        >
          选择图片
        </label>
      </div>

      {image && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button
            onClick={removeBackground}
            disabled={loading}
            style={{
              padding: '12px 30px',
              background: loading ? '#ccc' : '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '处理中...' : '移除背景'}
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: result ? '1fr 1fr' : '1fr', gap: '20px' }}>
        {image && (
          <div>
            <h3>原图</h3>
            <img src={image} alt="原图" style={{ width: '100%', borderRadius: '8px' }} />
          </div>
        )}
        {result && (
          <div>
            <h3>处理结果</h3>
            <img src={result} alt="结果" style={{ width: '100%', borderRadius: '8px' }} />
            <a 
              href={result} 
              download="removed-bg.png"
              style={{
                display: 'block',
                marginTop: '10px',
                padding: '10px',
                background: '#3B82F6',
                color: 'white',
                textAlign: 'center',
                borderRadius: '8px',
                textDecoration: 'none'
              }}
            >
              下载图片
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
