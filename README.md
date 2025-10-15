# 📹 ActionCam Data

**Extract GPS, speed, and sensor data from your action camera videos + Create custom overlays!**

Works with: GoPro Hero 5-13, Insta360 X5/X4/X3/X2, DJI Action, and more!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 What This Does

Your action cameras record hidden data inside every video:
- 📍 **GPS location** (latitude, longitude, altitude)
- 🏃 **Speed** (from GPS)
- 📊 **Accelerometer** (G-forces)
- 🔄 **Gyroscope** (rotation)
- 📷 **Camera settings** (ISO, shutter, etc.)

This tool **extracts** that data AND creates **custom video overlays** with gauges!

## ⚡ Quick Start

### 1. Extract Telemetry Data

```bash
# Clone and install
git clone https://github.com/Borderlessaviation/actioncam-data.git
cd actioncam-data
npm install

# Extract from your video
node src/extract.js YOUR_VIDEO.MP4

# Results saved to output/
```

### 2. Create Custom Overlays (NEW! 🎬)

```bash
# Install overlay dependencies
npm install canvas ffmpeg-static fluent-ffmpeg

# Generate video with overlays
node src/overlay-generator.js \
  YOUR_VIDEO.MP4 \
  output/YOUR_VIDEO_telemetry.json \
  configs/aviation-sixpack.json \
  final_video.mp4
```

**[📖 Full Overlay Guide](docs/OVERLAYS.md)**

## 🎨 Activity Templates

Choose from pre-designed overlay templates:

- ✈️ **Aviation** - Six-pack instruments (airspeed, altitude, heading, VSI, attitude indicator, GPS)
- 🏎️ **Motorsports** - Speed, RPM, gear, G-force, lap time, track map
- 🚴 **Cycling** - Speed, distance, elevation, heart rate, cadence, route map
- ⛷️ **Skiing** - Speed, altitude, vertical drop, run count, slope angle, trail map
- ⛵ **Marine** - Speed, heading, depth, wind speed, position, nautical chart

**All customizable!** Change colors, units (mph/km/h/knots), position, and opacity.

## 📦 What You Get

- **GPX** - GPS tracks for Google Earth, Strava, mapping apps
- **KML** - Google Earth format
- **CSV** - Excel/spreadsheet compatible
- **JSON** - Raw data for programming
- **GeoJSON** - Web mapping
- **🎬 Video Overlays** - Professional gauges on your videos!

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

- **Sports Analysis** - Track performance metrics with overlays
- **Aviation** - Professional six-pack instrument overlays
- **Motorsports** - Racing dashboard with lap times
- **Adventure Logging** - Map your routes with stats
- **Insurance Claims** - Document incidents with data + overlays
- **Content Creation** - Professional-looking videos for YouTube/social

## 🔧 Advanced Features

### Customizable Units
- Speed: mph, km/h, knots, m/s
- Altitude: feet, meters
- Distance: miles, km, nautical miles
- Vertical speed: fpm, mpm

### Widget Types
- **Gauges** - Circular dials for speed, altitude, etc.
- **Compass** - Heading indicator
- **Displays** - Simple text values
- **Horizon** - Artificial horizon (aviation)
- **Maps** - GPS route with current position
- **Graphs** - Elevation profiles

### Layout Options
- Bottom bar (most common)
- Top bar
- Left/right sidebars
- Corners (4-widget layout)
- Custom positions

## 📊 Example Configs

```bash
# Aviation six-pack
node src/overlay-generator.js video.mp4 telemetry.json configs/aviation-sixpack.json

# Racing dashboard
node src/overlay-generator.js video.mp4 telemetry.json configs/racing-dash.json

# Cycling fitness
node src/overlay-generator.js video.mp4 telemetry.json configs/cycling-fitness.json
```

## 🐛 Troubleshooting

**"No telemetry data found"**
- GoPro: GPS not enabled or QuickCapture used
- Insta360: No GPS device connected or phone screen off
- Camera was indoors without GPS lock

**GPS track looks wrong**
- Use quality filters (see docs)
- Make sure camera had clear sky view
- Wait for GPS lock before recording

## 💻 Installation

### Prerequisites
- Node.js 14+ or Python 3.8+
- FFmpeg (for overlays)

### Node.js (Recommended)
```bash
npm install
```

### For Overlays
```bash
npm install canvas ffmpeg-static fluent-ffmpeg
```

## 📚 Documentation

- **[Quick Start](QUICKSTART.md)** - Get started in 3 minutes
- **[Overlay Guide](docs/OVERLAYS.md)** - Create custom video overlays
- **[Camera Setup](docs/CAMERA_SETUP.md)** - Detailed camera configuration
- **[API Docs](docs/API.md)** - Use as a library

## 🤝 Contributing

Contributions welcome! Ideas for new widgets or activity templates? Open an issue!

## 📄 License

MIT License - see LICENSE file

Built with:
- [gopro-telemetry](https://github.com/JuanIrache/gopro-telemetry) by Juan Irache
- [gpmf-extract](https://github.com/JuanIrache/gpmf-extract)
- GoPro's [GPMF format](https://github.com/gopro/gpmf-parser)
- [canvas](https://www.npmjs.com/package/canvas) for overlay rendering

## ⭐ Support

Like this project? Give it a star! ⭐

Need help? Open an [issue](https://github.com/Borderlessaviation/actioncam-data/issues)

---

**Made with ❤️ for the action sports community**