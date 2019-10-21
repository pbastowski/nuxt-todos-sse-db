const basicAuth = require('express-basic-auth')

console.log('basic-auth initialised')

console.log(
    basicAuth({
        users: {
            admin: 'admin',
            user: 'user'
        }
    })
)

// export default {
//     handler: basicAuth({
//         users: {
//             admin: 'admin',
//             user: 'user'
//         }
//     })
// }
