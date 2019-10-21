const DATABASE = 'api/db.json'

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(DATABASE)
const middlewares = jsonServer.defaults()

var SSE = require('express-sse')
export const sse = new SSE(/*['add', 'update', 'delete']*/)
server.use('/sse', sse.init)

server.use(middlewares)
// server.use(router)

server.use((req, res, next) => {
    router(req, res, next)
    trap(req, res, next)
})

function trap(req, res, next) {
    if (req.method !== 'GET') {
        setTimeout(() => {
            sse.send({
                type: 'update',
                method: req.method,
                cookie: req.headers.cookie
            })
            // console.log('SSE', Object.keys(req))
            // console.log('SSE', req.headers)
        }, 100)
    }
}

console.log('json-server initialised')

export default {
    path: '/api',
    handler: server
}
