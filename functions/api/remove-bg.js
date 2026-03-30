export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const formData = await request.formData()
  const imageFile = formData.get('image_file')

  if (!imageFile) {
    return Response.json({ error: '请上传图片' }, { status: 400 })
  }

  const apiKey = env.REMOVEBG_API_KEY || 'XZ47JcE5SFopkYN5SPzrAWiV'

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
      { error: err?.errors?.[0]?.title || '处理失败' },
      { status: response.status }
    )
  }

  const buffer = await response.arrayBuffer()
  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
