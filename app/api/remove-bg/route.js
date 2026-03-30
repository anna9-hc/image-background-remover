export async function POST(request) {
  const formData = await request.formData()
  const imageFile = formData.get('image_file')

  if (!imageFile) {
    return Response.json({ error: '请上传图片' }, { status: 400 })
  }

  // 文件大小限制 10MB
  if (imageFile.size > 10 * 1024 * 1024) {
    return Response.json({ error: '图片大小不能超过 10MB' }, { status: 400 })
  }

  const apiKey = process.env.REMOVEBG_API_KEY
  if (!apiKey) {
    return Response.json({ error: 'API Key 未配置' }, { status: 500 })
  }

  const bgFormData = new FormData()
  bgFormData.append('image_file', imageFile)
  bgFormData.append('size', 'auto')

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': apiKey },
    body: bgFormData,
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    return Response.json(
      { error: err?.errors?.[0]?.title || '处理失败，请稍后重试' },
      { status: response.status }
    )
  }

  const buffer = await response.arrayBuffer()
  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment; filename="removed-bg.png"',
    },
  })
}
