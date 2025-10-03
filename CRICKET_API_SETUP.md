# 🏏 Real-Time Cricket Data Integration Setup

This guide will help you set up real-time cricket data APIs to get live match scores, upcoming events, and ongoing tournaments in your AI-generated blog content.

## 🚀 Quick Start (Free Option)

### 1. ESPN Cricinfo API (Already Working!)
- **Status**: ✅ Already integrated and working
- **Cost**: Free
- **API Key**: Not required
- **Data**: Live matches, upcoming matches, recent results

### 2. Add API Keys for Enhanced Data

Add these to your `server/.env` file:

```env
# Cricket APIs
CRICAPI_KEY=your_cricapi_key_here
CRICKET_API_KEY=your_cricket_api_key_here

# News API for cricket news
NEWS_API_KEY=your_news_api_key_here
```

## 📡 Available Cricket APIs

### 1. ESPN Cricinfo API (Free)
- **URL**: `https://site.api.espn.com/apis/site/v2/sports/cricket/scoreboard`
- **Cost**: Free
- **Data**: Live scores, upcoming matches, recent results
- **Status**: ✅ Already integrated

### 2. CricAPI (Paid)
- **URL**: `https://api.cricapi.com/`
- **Cost**: Free tier available (100 requests/month)
- **Sign up**: https://cricapi.com/
- **Data**: Live matches, player stats, series info

### 3. Cricket API (Paid)
- **URL**: `https://cricket-api.com/`
- **Cost**: Free tier available
- **Sign up**: https://cricket-api.com/
- **Data**: Matches, series, player statistics

### 4. News API (Paid)
- **URL**: `https://newsapi.org/`
- **Cost**: Free tier available (1000 requests/month)
- **Sign up**: https://newsapi.org/
- **Data**: Cricket news and articles

## 🔧 Setup Instructions

### Step 1: Get API Keys

1. **CricAPI** (Optional but recommended):
   - Go to https://cricapi.com/
   - Sign up for free account
   - Get your API key
   - Add to `.env`: `CRICAPI_KEY=your_key_here`

2. **News API** (For cricket news):
   - Go to https://newsapi.org/
   - Sign up for free account
   - Get your API key
   - Add to `.env`: `NEWS_API_KEY=your_key_here`

3. **Cricket API** (Optional):
   - Go to https://cricket-api.com/
   - Sign up for free account
   - Get your API key
   - Add to `.env`: `CRICKET_API_KEY=your_key_here`

### Step 2: Update Environment Variables

Add to your `server/.env` file:

```env
# Existing variables...
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=your_mongodb_uri
# ... other existing variables

# New cricket data APIs
CRICAPI_KEY=your_cricapi_key_here
CRICKET_API_KEY=your_cricket_api_key_here
NEWS_API_KEY=your_news_api_key_here
```

### Step 3: Restart Server

```bash
cd server
npm start
```

## 🎯 What You'll Get

### Live Cricket Data:
- **Live Matches**: Current ongoing cricket matches with scores
- **Upcoming Matches**: Scheduled matches and tournaments
- **Recent Results**: Completed matches and series results
- **Cricket News**: Latest cricket news and developments

### AI Blog Enhancement:
When you create a cricket blog, the AI will now include:
- Real-time match scores and standings
- Current player statistics and rankings
- Recent tournament results
- Latest cricket news and developments
- Upcoming match schedules

## 🧪 Testing

1. **Create a cricket blog** with title like:
   - "India vs Australia Test Series"
   - "IPL 2024 Analysis"
   - "T20 World Cup Preview"

2. **Select category**: "Cricket"

3. **Click "AI Generate"**

4. **Check the server logs** to see:
   ```
   🏏 Detected cricket-related content, fetching live data...
   📡 Fetching data from ESPN Cricinfo...
   ✅ ESPN data fetched successfully
   📊 Cricket data summary: Live cricket data fetched: 2 live matches, 5 upcoming matches, 3 recent results, 5 news articles
   ```

## 🔍 Data Sources

### ESPN Cricinfo (Free)
- Live cricket scores
- Match schedules
- Recent results
- Tournament standings

### CricAPI (Paid)
- Detailed match information
- Player statistics
- Series data
- Historical records

### News API (Paid)
- Latest cricket news
- Player transfers
- Tournament updates
- Analysis articles

## 🚨 Troubleshooting

### No Live Data?
1. Check your internet connection
2. Verify API keys in `.env` file
3. Check server logs for error messages
4. Ensure APIs are not rate-limited

### API Errors?
1. Check API key validity
2. Verify API quotas haven't been exceeded
3. Check API service status
4. Review error logs in console

## 💡 Pro Tips

1. **Start with ESPN**: It's free and works immediately
2. **Add CricAPI**: For more detailed match data
3. **Use News API**: For cricket news and articles
4. **Monitor Usage**: Keep track of API quotas
5. **Cache Data**: Consider caching to reduce API calls

## 🎉 Result

Your AI-generated cricket blogs will now include:
- ✅ Live match scores and ongoing tournaments
- ✅ Upcoming match schedules
- ✅ Recent results and player performances
- ✅ Latest cricket news and developments
- ✅ Real-time statistics and rankings

The AI will automatically detect cricket-related content and fetch live data to create more engaging and current blog posts!
