import baseHeaders from '../../utils/baseHeaders'
import validatePostRequest from "../../utils/validatePostRequest"

export default async function(request){
  const {url, shop, token, json} = validatePostRequest(request)
  const res = await fetch(`https://${shop}.myshopify.com/admin/api/2020-04/products.json`, {
    method: 'POST',
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token
    }),
    body: JSON.stringify(json)
  }).then(res => res.json())

  return new Response(JSON.stringify(res),{
    headers: baseHeaders,
    status: 200
  })

}