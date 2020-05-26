import baseHeaders from '../../utils/baseHeaders'

export default async function(request) {
  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')
  if (shop) {
    const redirect_uri = url.searchParams.get('redirect')
    if (!redirect_uri) {
      return new Response(`
      URL: ${url}
      Shop Param: ${shop}
      Missing the redirect parameter. Please add ?redirect=your-app-redirect to your request
      `, {
        status: 400,
        headers: baseHeaders
      })
    }

    const api_key = API_KEY
    const scopes = 'read_orders,write_products'
    const nonce = 'fc3n8nf92dx'
    const access_mode = 'per-user'
    const installUrl = `https://${shop}.myshopify.com/admin/oauth/authorize?client_id=${api_key}&scope=${scopes}&redirect_uri=${redirect_uri}&state=${nonce}&grant_options[]=${access_mode}`
    
    return Response.redirect(installUrl)
  }

  return new Response('Missing shop parameter. Please add ?shop=your-development-shop to your request',{
    status: 400,
    headers: baseHeaders
  })
}
