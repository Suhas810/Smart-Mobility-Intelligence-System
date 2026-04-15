# 🚀 SafeRoute AI - Setup & Running Guide

## ⚡ Quick Start (Fastest Way)

### Option 1: Using Command Prompt/Terminal

**Step 1: Start the Backend**
```bash
cd e:\projects\Smart Mobility Intelligence System\safe-route-ai\server
npm install
npm start
```
✅ Backend will run on `http://localhost:5000`

**Step 2: Start the Frontend** (Open a new terminal)
```bash
cd e:\projects\Smart Mobility Intelligence System\safe-route-ai\client
npm install
npm run dev
```
✅ Frontend will open on `http://localhost:3000`

---

## 🧪 Testing the Application

Once both servers are running:

1. **Open browser** → `http://localhost:3000`
2. **Try these sample locations:**

| Location | Lat | Lng | Expected Status |
|----------|-----|-----|-----------------|
| MG Road (High Crime) | 12.97 | 77.59 | 🔴 UNSAFE |
| Koramangala (Mixed) | 12.93 | 77.62 | 🟡 MEDIUM |
| Cubbon Park (Safe) | 12.98 | 77.59 | 🟢 SAFE |
| Whitefield (Safe) | 12.97 | 77.74 | 🟢 SAFE |
| Commerce Street (Dangerous) | 12.98 | 77.60 | 🔴 UNSAFE |

---

## 📦 Installation Details

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "leaflet": "^1.9.4",
  "tailwindcss": "^3.3.3",
  "vite": "^4.4.5"
}
```

---

## 🔌 API Testing with Curl

Test the backend directly:

```bash
curl -X POST http://localhost:5000/api/safety \
  -H "Content-Type: application/json" \
  -d "{\"lat\": 12.97, \"lng\": 77.59}"
```

**Expected Response:**
```json
{
  "score": 4.85,
  "status": "medium",
  "message": "⚠️ Caution: MG Road has moderate risk...",
  "area": "MG Road",
  "coordinates": {
    "lat": 12.97,
    "lng": 77.59
  }
}
```

---

## 🆚 Frontend vs Backend

| Component | Port | Tech | Status |
|-----------|------|------|--------|
| Frontend | 3000 | Vite + React | http://localhost:3000 |
| Backend | 5000 | Express API | http://localhost:5000 |
| Health Check | 5000 | GET /health | http://localhost:5000/health |

---

## 🛠️ Development Mode

### Backend (with auto-reload)
```bash
cd server
npm run dev
# Uses nodemon for automatic restart on file changes
```

### Frontend (with HMR)
```bash
cd client
npm run dev
# Uses Vite with Hot Module Replacement
```

---

## 🏗️ Production Build

### Build Frontend
```bash
cd client
npm run build
# Creates optimized dist/ folder
npm run preview  # Preview the build locally
```

---

## 📝 Environment Variables

### Frontend (.env file)
```
VITE_API_URL=http://localhost:5000
```

**Or** for production:
```
VITE_API_URL=https://your-api-domain.com
```

---

## ❌ Troubleshooting

### Port 5000 Already in Use
```bash
# Windows - Find process on port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F
```

### Port 3000 Already in Use
Vite will automatically use port 3001 or higher.

### CORS Errors
- Make sure backend server is running on localhost:5000
- Check CORS is enabled in `server/server.js`

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -r node_modules package-lock.json
npm install
```

### Map Not Loading
- Ensure Leaflet CSS is imported (already done in components/Map.jsx)
- Check browser console for errors
- Verify internet connection (tiles load from CDN)

---

## ✨ Features Included

✅ Real-time safety scoring  
✅ Interactive map with Leaflet  
✅ Dark theme neon UI  
✅ Instant risk alerts  
✅ 10 predefined locations  
✅ Responsive design  
✅ Error handling  
✅ Loading states  

---

## 📊 How Safety Score is Calculated

```
Safety Score = (10 - crime_rate)*0.5 + lighting*0.3 + (10 - traffic)*0.2

Components:
- Crime Rate: 50% weight (inverse)
- Lighting: 30% weight (direct)
- Traffic: 20% weight (inverse)

Risk Levels:
- Score > 7 → GREEN ✅ SAFE
- Score 4-7 → YELLOW ⚠️ MEDIUM
- Score < 4 → RED 🚨 UNSAFE
```

---

## 🎯 Next Steps

1. ✅ Install dependencies with `npm install`
2. ✅ Start the backend server
3. ✅ Start the frontend dev server
4. ✅ Open http://localhost:3000
5. ✅ Test with sample coordinates
6. ✅ Check the alerts and map display
7. ✅ Build for production when ready

---

## 📞 Need Help?

- Check `README.md` for project overview
- Review `server.js` for backend configuration
- Check `vite.config.js` for frontend configuration
- Review component files for implementation details

**Enjoy your Safety Alert System! 🚀**
