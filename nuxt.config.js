import purgecss from '@fullhuman/postcss-purgecss'

module.exports = {
    mode: 'spa',

    plugins: ['plugins/index.js', 'plugins/mini-toastr.js'],

    // modules: ['nuxt-basic-auth-module'],
    basic: {
        name: 'user',
        pass: 'user',
        enabled: false
        // enabled: process.env.BASIC_ENABLED === 'true' // require boolean value(nullable)
    },

    serverMiddleware: [
        // { path: '/', handler: '~/api/auth.js' },

        // Add json-server as a local database
        { path: '/api', handler: '~/api/db.js' }

        // SSE stream handling
        // { path: '/stream', handler: '~/api/sse.js' }
    ],

    buildModules: [
        // [
        //     '@nuxtjs/router-extras',
        //     {
        //         /* module options */
        //     }
        // ]
    ],

    build: {
        postcss: {
            plugins: [
                purgecss({
                    content: [
                        './pages/**/*.vue',
                        './layouts/**/*.vue',
                        './components/**/*.vue'
                    ],
                    whitelist: ['html', 'body']
                })
            ]
        }
    }
}
