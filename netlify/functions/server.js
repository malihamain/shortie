// Ensure we can find dependencies from root
const path = require('path')
const Module = require('module')
const originalRequire = Module.prototype.require

// Add root node_modules to module path
const rootPath = path.resolve(__dirname, '../..')
if (!Module._nodeModulePaths.includes(path.join(rootPath, 'node_modules'))) {
    Module._nodeModulePaths.unshift(path.join(rootPath, 'node_modules'))
}

const serverless = require('serverless-http')
const app = require('../../server')

exports.handler = serverless(app, {
    binary: ['image/*', 'font/*']
})

