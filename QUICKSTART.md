# Quick Start Guide

Get GPS and sensor data from your action camera videos in 3 minutes!

## Step 1: Install

```bash
# Clone the repo
git clone https://github.com/Borderlessaviation/actioncam-data.git
cd actioncam-data

# Install dependencies
npm install
```

## Step 2: Make Sure GPS Was Recording

### GoPro Hero 9/10/11/13
- Go to: Settings → Regional → GPS = **ON**
- **Before recording:** Turn on with Power button (not Record button)
- Wait for GPS icon to appear on screen
- ⚠️ **Hero 12 has NO GPS!**

### Insta360 X5/X4/X3
- **Best option:** Use GPS Action Remote ($50)
- **OR** use phone app with screen ON entire recording
- **For non-360 modes:** Must use Pro mode or Active HDR

## Step 3: Extract Data

```bash
# Single video
node src/extract.js YOUR_VIDEO.MP4

# Multiple videos (merges them)
node src/extract.js VIDEO1.MP4 VIDEO2.MP4 VIDEO3.MP4
```

## Step 4: Check Results

Open the `output/` folder:

```
output/
├── YOUR_VIDEO_gps.gpx        ← Open in Google Earth
├── YOUR_VIDEO_gps.kml        ← Google Earth format
├── YOUR_VIDEO_GPS5.csv       ← Open in Excel
└── YOUR_VIDEO_telemetry.json ← All data
```

## What To Do With The Files

### GPX Files
- **Google Earth:** File → Open → select .kml file
- **Strava:** Upload → Activities
- **Google Maps:** My Maps → Import

### CSV Files
- Open in Excel / Google Sheets
- See all GPS points with timestamps
- Analyze speed, altitude, etc.

### JSON Files
- Use in programming (Python, JavaScript)
- Complete raw data

## Troubleshooting

### "No telemetry data found"

**GoPro:**
1. GPS was OFF in settings
2. QuickCapture mode was used (turn on with Power button instead)
3. Camera was indoors (no GPS lock)
4. Camera was upside down

**Insta360:**
1. No GPS remote or phone connected
2. Phone screen turned off during recording
3. Used Basic/Quick mode without GPS remote

### GPS Track Looks Wrong

Add quality filters to `src/extract.js`:

```javascript
const telemetryData = await goproTelemetry(extracted, {
  stream: ['GPS5', 'GPS9'],
  GPSPrecision: 500,  // Only good GPS locks
  GPSFix: 3,          // Only 3D fixes
  WrongSpeed: 100     // Remove impossible speeds > 100 m/s
});
```

## Examples

### Export Just GPS Track
```bash
node src/extract.js --format gpx VIDEO.MP4
```

### Merge Split Videos
GoPro splits long videos into multiple files:
```bash
node src/extract.js GH010123.MP4 GH020123.MP4 GH030123.MP4
# Creates: output/merged_gps.gpx
```

## Need Help?

- 📖 [Full README](README.md)
- 🐛 [Report Issues](https://github.com/Borderlessaviation/actioncam-data/issues)
- ⭐ [Star the repo](https://github.com/Borderlessaviation/actioncam-data) if this helped!

## Camera Recommendations

**Best GPS Performance:**
- ✅ GoPro Hero 13/11/10/9 (Hero 12 has NO GPS!)
- ✅ Insta360 X5/X4/X3 with GPS Remote
- ✅ DJI Action 5 Pro / 4 Pro

**For Insta360:** Get the GPS Action Remote - much better than using phone!