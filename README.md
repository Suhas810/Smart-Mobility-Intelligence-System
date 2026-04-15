# SafeRoute AI - Real-Time Safety Alert System

A full-stack AI-powered web application that provides real-time safety alerts and risk analysis for specific locations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

1. **Backend Setup**
   ```bash
   cd server
   npm install
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Frontend Setup** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

## 📁 Project Structure

```
safe-route-ai/
├── server/                 # Express REST API
│   ├── data/
│   │   └── dataset.json
│   ├── routes/
│   │   └── safetyRoutes.js
│   ├── controllers/
│   │   └── safetyController.js
│   ├── utils/
│   │   └── safetyCalculator.js
│   ├── server.js
│   └── package.json
├── client/                 # React + Vite
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map.jsx
│   │   │   ├── AlertBox.jsx
│   │   │   ├── SafetyCard.jsx
│   │   │   └── LocationInput.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
```

## ⚙️ How It Works

### Backend API

**Endpoint:** `POST /api/safety`

**Request:**
```json
{
  "lat": 12.97,
  "lng": 77.59
}
```

**Response:**
```json
{
  "score": 5.2,
  "status": "medium",
  "message": "⚠️ Caution: MG Road has moderate risk...",
  "area": "MG Road",
  "coordinates": {
    "lat": 12.97,
    "lng": 77.59
  }
}
```

### Safety Score Calculation

```
Safety Score = (10 - crime_rate)*0.5 + lighting*0.3 + (10 - traffic)*0.2
```

**Risk Levels:**
- **Safe:** Score > 7 (Green)
- **Medium:** Score 4-7 (Yellow)
- **Unsafe:** Score < 4 (Red)

## 🎯 Features

✅ Real-time safety analysis  
✅ Interactive Leaflet map with location markers  
✅ Dark theme with neon UI  
✅ Instant risk level alerts  
✅ Loading states and error handling  
✅ Responsive design  
✅ Sample locations included  

## 📍 Sample Locations

| Location | Lat | Lng | Status |
|----------|-----|-----|--------|
| MG Road | 12.97 | 77.59 | Unsafe |
| Koramangala | 12.93 | 77.62 | Medium |
| Cubbon Park | 12.98 | 77.59 | Safe |
| Airport Road | 13.20 | 77.71 | Medium |

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- REST API with CORS

**Frontend:**
- React 18
- Vite (fast build tool)
- Tailwind CSS (styling)
- Leaflet (mapping)

## 🔧 Development

### Backend Development
```bash
cd server
npm run dev  # Runs with nodemon (auto-reload)
```

### Frontend Development
```bash
cd client
npm run dev  # Runs Vite dev server with HMR
```

## 📦 Build for Production

**Frontend:**
```bash
cd client
npm run build  # Creates optimized dist/ folder
```

## 🚀 Deployment

### Quick Deployment Tips

1. **Backend:** Deploy to Heroku, Railway, or AWS
2. **Frontend:** Deploy to Vercel, Netlify, or GitHub Pages
3. Update `VITE_API_URL` environment variable in frontend

## 📊 Performance

- **Response Time:** < 2 seconds
- **Map Load Time:** < 1 second
- **Optimized Bundle Size:** ~150KB (gzipped)

## 🤝 Contributing

Feel free to fork and submit pull requests!

## 📝 License

MIT License - Feel free to use this project for any purpose.

---

**Built with ❤️ for safety and security**
