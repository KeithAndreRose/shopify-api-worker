import validatePostRequest from "../../utils/validatePostRequest"
import baseHeaders from "../../utils/baseHeaders"

export default async function(request){
  const {url, shop, token, json:payload} = validatePostRequest(request)
  const res = await fetch(`https://${shop}.myshopify.com/admin/api/2020-04/collects.json`, {
    method: 'POST',
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