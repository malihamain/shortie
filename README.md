# mini-mal

A minimal URL shortener - make your url mini ✨

## Features

- Clean, minimal design with ruler-themed UI
- Shorten any URL instantly
- Track click counts
- Works with or without MongoDB (in-memory fallback)
- Responsive design

## Installation

```bash
npm install
```

## Configuration

### Environment Variables

- `PORT` - Server port (default: 4000)
- `MONGODB_URI` - MongoDB connection string (default: `mongodb://localhost/urlShortener`)
- `NODE_ENV` - Environment mode (`production` or `development`)

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. (Optional) Start MongoDB:
   ```bash
   brew services start mongodb-community
   ```
   Or use MongoDB Atlas (cloud database)

3. Start the development server:
   ```bash
   npm run devStart
   ```

4. Open http://localhost:4000

### Production Deployment

#### Option 1: With MongoDB (Recommended)

1. Set environment variables:
   ```bash
   export MONGODB_URI="mongodb://your-mongodb-connection-string"
   export PORT=4000
   export NODE_ENV="production"
   ```

2. Start the server:
   ```bash
   npm start
   ```

#### Option 2: Without MongoDB (In-Memory)

The app will automatically use an in-memory store if MongoDB is not available. **Note:** Data will be lost on server restart.

#### Deployment Platforms

**Heroku:**
```bash
heroku create your-app-name
heroku config:set MONGODB_URI="your-mongodb-uri"
git push heroku main
```

**Railway:**
- Add MongoDB service or set `MONGODB_URI` environment variable
- Deploy from GitHub

**Render:**
- Set `MONGODB_URI` in environment variables
- Set build command: `npm install`
- Set start command: `npm start`

**Vercel/Netlify:**
- These platforms are better for static sites. Consider using a Node.js hosting service instead.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose) - Optional
- EJS templating
- Custom CSS with ruler-themed design

## License

ISC

