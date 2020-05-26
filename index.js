const Router = require('./router')
import handleOptions from './lib/handleOptions'
import {
  handleGetToken,
  handleGetAuthorization,
  handlePostProduct,
  handleGetAllProducts,
  handleGetCollect,
  handlePostToCollect,
  handleGetShopMetafields,
  handlePostToShopMetafields,
  handlePutShopMetafield,
  handleDeleteShopMetafield,
  handleDeleteCollect,
} from './lib/functions'
import baseHeaders from './lib/utils/baseHeaders'

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

function handler(request) {
  const init = {
    headers: baseHeaders,
  }
  const body = JSON.stringify({ some: 'json' })
  return new Response(body, init)
}

async function handleRequest(request) {
  // Handle Options (Preflight)
  if (request.method === 'OPTIONS') {
    return handleOptions(request)
  }

  const r = new Router()

  // Replace with the approriate paths and handlers
  r.get('/authorize', request => handleGetAuthorization(request))
  r.post('/getToken', request => handleGetToken(request))

  r.get('/allProducts', request => handleGetAllProducts(request))
  r.post('/createProduct', request => handlePostProduct(request))

  r.get('/collect', request => handleGetCollect(request))
  r.post('/collect', request => handlePostToCollect(request))
  r.delete('/collect', request => handleDeleteCollect(request))

  r.get('/shopMetafields', request => handleGetShopMetafields(request))
  r.post('/shopMetafields', request => handlePostToShopMetafields(request))
  r.put('/shopMetafield', request => handlePutShopMetafield(request))
  r.delete('/shopMetafield', request => handleDeleteShopMetafield(request))

  // r.get('.*/bar', () => new Response('responding for /bar', { headers: baseHeaders}))
  // r.get('.*/foo', request => handler(request))
  // r.post('.*/foo.*', request => handler(request))
  // r.get('/demos/router/foo', request => fetch(request)) // return the response from the origin

  // Root route response
  r.get(
    '/',
    () => new Response('You found a shopify API', { headers: baseHeaders })
  )

  // Catch all route response
  r.get(
    '/.*',
    () =>
      new Response("Nothing's Here", {
        status: 404,
        statusText: 'Not Found',
        headers: baseHeaders,
      })
  ) // return a default message for the root route

  const resp = await r.route(request)
  return resp
}
