const Router = require('./router')
import handleOptions from './lib/handleOptions'

const myHeaders = {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

/**
 * Example of how router can be used in an application
 *  */
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(request) {
    const init = {
        headers: myHeaders,
    }
    const body = JSON.stringify({ some: 'json' })
    return new Response(body, init)
}

async function handleRequest(request) {
    // Handle Options (Preflight)
    if (request.method === "OPTIONS") {
        return handleOptions(request)
    }
    
    const r = new Router()
    // Replace with the approriate paths and handlers
    r.get('.*/bar', () => new Response('responding for /bar', { headers: myHeaders}))
    r.get('.*/foo', request => handler(request))
    r.post('.*/foo.*', request => handler(request))
    r.get('/demos/router/foo', request => fetch(request)) // return the response from the origin
    
    // Root route response 
    r.get('/', () => new Response('You found something', { headers: myHeaders })) 
    
    // Catch all route response 
    r.get('/.*', () => new Response("Nothing's Here", { 
        status: 404,
        statusText: "Not Found",
        headers: myHeaders 
    })) // return a default message for the root route


    const resp = await r.route(request)
    return resp
}