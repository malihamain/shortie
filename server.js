const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const { nanoid } = require('nanoid')
const app = express()

// In-memory store as fallback
const memoryStore = new Map()
let useMemoryStore = false

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/urlShortener'

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    bufferCommands: false,
    bufferMaxEntries: 0
}).then(() => {
    console.log('✅ Connected to MongoDB')
    useMemoryStore = false
}).catch(err => {
    console.log('⚠️  MongoDB not available, using in-memory store')
    console.log('   (Data will reset on server restart)')
    if (process.env.NODE_ENV === 'production') {
        console.log('   ⚠️  WARNING: In-memory store in production! Set MONGODB_URI environment variable.')
    }
    useMemoryStore = true
})

mongoose.connection.on('error', () => {
    useMemoryStore = true
})

const isConnected = () => {
    return mongoose.connection.readyState === 1 && !useMemoryStore
}

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.get('/', async(req, res) => {
    try {
        let shortUrls = []
        if (isConnected()) {
            shortUrls = await ShortUrl.find().limit(100).sort({ createdAt: -1 })
        } else {
            // Use memory store
            shortUrls = Array.from(memoryStore.values()).reverse()
        }
        const baseUrl = `${req.protocol}://${req.get('host')}`
        res.render('index', { shortUrls: shortUrls, baseUrl: baseUrl })
    } catch (error) {
        console.error('Error fetching URLs:', error)
        const shortUrls = useMemoryStore ? Array.from(memoryStore.values()).reverse() : []
        res.render('index', { shortUrls: shortUrls, baseUrl: `${req.protocol}://${req.get('host')}` })
    }
})

app.post('/shortUrls', async(req, res) => {
    try {
        const fullUrl = req.body.fullUrl
        if (isConnected()) {
            await ShortUrl.create({ full: fullUrl })
        } else {
            // Use memory store
            const short = nanoid(8)
            memoryStore.set(short, {
                full: fullUrl,
                short: short,
                clicks: 0
            })
        }
        res.redirect('/')
    } catch (error) {
        console.error('Error creating short URL:', error)
        res.redirect('/')
    }
})

app.get('/:shortUrl', async(req, res) => {
    try {
        let shortUrl = null
        
        if (isConnected()) {
            shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
            if (shortUrl) {
                shortUrl.clicks++
                await shortUrl.save()
            }
        } else {
            // Use memory store
            const stored = memoryStore.get(req.params.shortUrl)
            if (stored) {
                stored.clicks++
                shortUrl = stored
            }
        }
        
        if (!shortUrl) return res.sendStatus(404)
        res.redirect(shortUrl.full)
    } catch (error) {
        console.error('Error redirecting:', error)
        res.sendStatus(500)
    }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});