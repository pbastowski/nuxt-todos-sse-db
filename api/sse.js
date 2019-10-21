var SSE = require('express-sse')

export const sse = new SSE(['add', 'update', 'delete'])

export default {
    path: '/stream',
    handler: sse
}
