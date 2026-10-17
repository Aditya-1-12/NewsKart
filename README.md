# NewsKart

A responsive news app built with React, JavaScript, News API and Bootstrap.

## Features
- Real-time headlines from News API (Fetch API)
- Category filtering (General, Business, Sports, Technology, etc.)
- Infinite scrolling
- Responsive Bootstrap UI
- Deployed on Netlify

## Run locally
1. Get a free API key from https://newsapi.org
2. Copy `.env.example` to `.env` and paste your key:
   `VITE_NEWS_API_KEY=your_key`
3. Install and start:
   ```
   npm install
   npm run dev
   ```

## Deploy on Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Add `VITE_NEWS_API_KEY` under Site settings > Environment variables

## Note
The free News API plan only allows browser requests from `localhost`.
For the live Netlify site, use a paid plan, or add a small Netlify Function
as a proxy for the API call.
