import baseHeaders from "../../utils/baseHeaders"

export default async function(request){
  const url = new URL(request.url)
  const shop = url.searchParams.get('shop')
  if(!shop){
    return new Response('Missing shop parameter. Please add ?shop=your-store-name to your request',{
      status: 400,
      headers: baseHeaders
    })
  }

  const res = await fetch(`https://${shop}.myshopify.com/admin/api/2020-04/products.json`, {
    method: 'GET',
    headers: new Headers({
      "Accept": "application/json",
      "X-Shopify-Access-Token": token
    })
  }).then(res => res.json())

  return new Response(JSON.stringify(res),{
    headers: baseHeaders,
    status: 200
  })
}