const serverless = require('serverless-http')

// Import app from root - Netlify will bundle dependencies
let app
try {
    app = require('../../server')
} catch (error) {
    // Fallback: require server directly
    const path = require('path')
    const serverPath = path.join(__dirname, '../../server.js')
    delete require.cache[require.resolve(serverPath)]
    app = require(serverPath)
}

exports.handler = serverless(app, {
    binary: ['image/*', 'font/*', 'text/css', 'application/javascript']
})

