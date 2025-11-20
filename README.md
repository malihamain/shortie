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

**🚂 Railway (Recommended - Easiest):**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `shortie` repository
5. Add MongoDB:
   - Click "+ New" → "Database" → "Add MongoDB"
   - Railway will automatically set `MONGODB_URI`
6. Your app will auto-deploy! 🎉

**🎨 Render (Free Tier Available):**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. Add Environment Variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string (use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud DB)
7. Click "Create Web Service"

**☁️ MongoDB Atlas (Free Cloud Database):**
1. Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string from "Connect" → "Connect your application"
4. Use this as your `MONGODB_URI` environment variable

**⚠️ Note about Netlify/Vercel:**
These platforms are designed for static sites and serverless functions. For a full Express app like this, use Railway or Render instead.

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose) - Optional
- EJS templating
- Custom CSS with ruler-themed design

## License

ISC

