import baseHeaders from '../../utils/baseHeaders'


export default async function(request){
  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')
  if(!shop){
    return new Response(`Missing shop parameter. Please add ?shop=your-shopify-shop-name to your request`, {
      status: 400,
      headers: baseHeaders
    })
  }

  const {code} = await request.clone().json()
  if(!code){
    return new Response(`Missing code data. Please add your "code" as a property to your request body`, {
      status: 400,
      headers: baseHeaders
    })
  }

  const accessTokenPayload = {
    client_id: API_KEY,
    client_secret: API_SECRET,
    code,
  }

  const token = await fetch(`https://${shop}.myshopify.com/admin/oauth/access_token`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(accessTokenPayload)
  }).then(res => res.json())

  return new Response(JSON.stringify(token),{
    headers: baseHeaders,
    status: 200
  })
}