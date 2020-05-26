export default async function(request){
  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')
  if(!shop){
    return new Response(`Missing shop parameter. Please add ?shop=your-shopify-shop-name to your request`, {
      status: 400,
      headers: baseHeaders
    })
  }

  const token = request.headers.get('X-Shopify-Access-Token')
  if(!token){
    return new Response(`Missing access token`, {
      status: 400,
      headers: baseHeaders
    })
  }

  const json = await request.clone().json()

  return {url, shop, token, json}
}