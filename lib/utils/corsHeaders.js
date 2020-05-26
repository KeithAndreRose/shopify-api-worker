// We support the GET, POST, HEAD, and OPTIONS methods from any origin,
// and accept the Content-Type header on requests. These headers must be
// present on all responses to all CORS requests. In practice, this means
// all responses to OPTIONS or POST requests.
export default {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS, PUT",
  "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Shopify-Access-Token",
  "Access-Control-Allow-Credentials": "true",
}