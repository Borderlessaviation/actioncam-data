# 📹 ActionCam Data

**Extract GPS, speed, and sensor data from your action camera videos**

Works with: GoPro Hero 5-13, Insta360 X5/X4/X3/X2, DJI Action, and more!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 What This Does

Your action cameras record hidden data inside every video:
- 📍 **GPS location** (latitude, longitude, altitude)
- 🏃 **Speed** (from GPS)
- 📊 **Accelerometer** (G-forces)
- 🔄 **Gyroscope** (rotation)
- 📷 **Camera settings** (ISO, shutter, etc.)

This tool extracts all that data and exports it to useful formats!

## ⚡ Quick Start

```bash
# Clone and install
git clone https://github.com/Borderlessaviation/actioncam-data.git
cd actioncam-data
npm install

# Extract from your video
node src/extract.js YOUR_VIDEO.MP4

# Results saved to output/
```

## 📦 What You Get

- **GPX** - GPS tracks for Google Earth, Strava, mapping apps
- **KML** - Google Earth format
- **CSV** - Excel/spreadsheet compatible
- **JSON** - Raw data for programming
- **GeoJSON** - Web mapping

## 📹 Camera Setup (IMPORTANT!)

### GoPro Hero 9/10/11/13
✅ Enable GPS in Settings → Regional  
✅ Turn on with **Power button** (not Record)  
✅ Wait for GPS lock before recording  
❌ Don't use QuickCapture mode  

⚠️ **GoPro Hero 12 has NO GPS!**

### Insta360 X5/X4/X3
✅ Need GPS Action Remote ($50) - **BEST option**  
OR ✅ Use phone app (keep screen ON entire recording)  
OR ✅ Use smartwatch app  

For non-360 modes: Must use Pro mode or Active HDR

## 🎓 Use Cases

- **Sports Analysis** - Track your performance
- **Adventure Logging** - Map your routes
- **Motorsports** - Analyze lap times
- **Insurance Claims** - Document incidents with data
- **Scientific Research** - Field data collection
- **Real Estate** - Geo-tag property footage

## 🔧 Advanced Usage

### Merge Split Videos
GoPro splits long recordings:
```bash
node src/extract.js video1.MP4 video2.MP4 video3.MP4
```

### Filter GPS Quality
Edit `extract.js` to add:
```javascript
GPSPrecision: 500,  // Only good GPS locks
GPSFix: 3,          // Only 3D fixes
WrongSpeed: 100     // Remove impossible speeds
```

## 🐛 Troubleshooting

**"No telemetry data found"**
- GoPro: GPS not enabled or QuickCapture used
- Insta360: No GPS device connected or phone screen off
- Camera was indoors without GPS lock

**GPS track looks wrong**
- Use quality filters above
- Make sure camera had clear sky view
- Wait for GPS lock before recording

## 💻 Installation

### Prerequisites
- Node.js 14+ or Python 3.8+
- FFmpeg (for Python version)

### Node.js
```bash
npm install
```

### Python
```bash
pip install -r requirements.txt
# Also need: brew install ffmpeg (macOS)
```

## 📊 Output Examples

```
output/
├── video_gps.gpx        (GPS track)
├── video_gps.kml        (Google Earth)
├── video_GPS5.csv       (GPS data spreadsheet)
├── video_ACCL.csv       (Accelerometer)
├── video_GYRO.csv       (Gyroscope)
└── video_telemetry.json (All data)
```

## 🤝 Contributing

Contributions welcome! Open an issue or PR.

## 📄 License

MIT License - see LICENSE file

Built with:
- [gopro-telemetry](https://github.com/JuanIrache/gopro-telemetry) by Juan Irache
- [gpmf-extract](https://github.com/JuanIrache/gpmf-extract)
- GoPro's [GPMF format](https://github.com/gopro/gpmf-parser)

## ⭐ Support

Like this project? Give it a star! ⭐

Need help? Open an [issue](https://github.com/Borderlessaviation/actioncam-data/issues)

---

**Made with ❤️ for the action sports community**