import validatePostRequest from "../../utils/validatePostRequest"
import baseHeaders from "../../utils/baseHeaders"

export default async function(request){
  const {url, shop, token, json:payload} = validatePostRequest(request)
  const metafieldID = url.searchParams.get('metafield_id')
  if(!shop){
    return new Response('Missing shop parameter. Please add ?shop=your-store-name to your request',{
      status: 400,
      headers: baseHeaders
    })
  }

  if(!metafieldID){
    return new Response('Missing collectID parameter. Please add ?metafield_id=metafieldID to your request',{
      status: 400,
      headers: baseHeaders
    })
  }

  const res = await fetch(`https://${shop}.myshopify.com/admin/api/2020-04/metafields/${metafieldID}.json`, {
    method: 'PUT',
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token 
    }),
    body: JSON.stringify(payload)
  }).then(res => res.json())

  return new Response(JSON.stringify(res),{
    headers: baseHeaders,
    status: 200
  })
}