# 🎬 Custom Video Overlays Guide

Create professional telemetry overlays for your action cam videos!

## 🎯 What You Can Do

**Activity-Specific Templates:**
- ✈️ **Aviation** - Six-pack instruments (airspeed, altitude, heading, VSI, attitude, GPS)
- 🏎️ **Motorsports** - Speed, RPM, gear, G-force, lap time, track map
- 🚴 **Cycling** - Speed, distance, elevation, heart rate, cadence, route
- ⛷️ **Skiing** - Speed, altitude, vertical drop, runs, slope angle, trail map
- ⛵ **Marine** - Speed, heading, depth, wind, position, nautical chart

**Customizable Features:**
- ✅ Choose which widgets to display
- ✅ Select units (mph/km/h, feet/meters, knots, etc.)
- ✅ Customize colors and styles
- ✅ Adjust position and opacity
- ✅ Multiple layout options

## 🚀 Quick Start

### Step 1: Extract Telemetry Data

```bash
# Extract telemetry from your video
node src/extract.js YOUR_VIDEO.MP4

# This creates: output/YOUR_VIDEO_telemetry.json
```

### Step 2: Design Your Overlay

**Option A: Use Web Interface** (Coming Soon)
Open `web/overlay-designer.html` in browser

**Option B: Create Config Manually**

Create a JSON config file like this:

```json
{
  "activity": "aviation",
  "widgets": [
    {
      "id": "airspeed",
      "name": "Airspeed",
      "type": "gauge",
      "config": {
        "unit": "knots",
        "color": "#3b82f6"
      }
    },
    {
      "id": "altitude",
      "name": "Altitude",
      "type": "gauge",
      "config": {
        "unit": "feet",
        "color": "#10b981"
      }
    },
    {
      "id": "heading",
      "name": "Heading",
      "type": "compass",
      "config": {
        "color": "#f59e0b"
      }
    }
  ],
  "position": "bottom",
  "opacity": 80
}
```

### Step 3: Generate Overlay

```bash
# Install additional dependencies
npm install canvas ffmpeg-static fluent-ffmpeg

# Generate video with overlay
node src/overlay-generator.js \
  YOUR_VIDEO.MP4 \
  output/YOUR_VIDEO_telemetry.json \
  aviation-config.json \
  output_with_overlay.mp4
```

## 📊 Available Widgets

### Gauge Widgets
Display values with circular gauges:
- Speed (mph, km/h, knots)
- Altitude (feet, meters)
- RPM
- Heart Rate (bpm)
- G-Force
- Vertical Speed (fpm, mpm)

### Compass Widget
Shows heading with cardinal directions

### Display Widgets
Simple text displays for:
- Distance
- Time
- Lap Time
- Gear
- Run Count

### Artificial Horizon
Shows pitch and roll (aviation)

### Map Widget
GPS route with current position

### Graph Widget
Elevation profile or other metrics over time

## 🎨 Customization Examples

### Aviation Six-Pack

```json
{
  "activity": "aviation",
  "widgets": [
    { "id": "airspeed", "type": "gauge", "config": { "unit": "knots", "color": "#3b82f6" } },
    { "id": "altitude", "type": "gauge", "config": { "unit": "feet", "color": "#10b981" } },
    { "id": "heading", "type": "compass", "config": { "color": "#f59e0b" } },
    { "id": "vsi", "type": "gauge", "config": { "unit": "fpm", "color": "#8b5cf6" } },
    { "id": "attitude", "type": "horizon" },
    { "id": "gps", "type": "map" }
  ],
  "position": "corners",
  "opacity": 85
}
```

### Racing Dashboard

```json
{
  "activity": "motorsports",
  "widgets": [
    { "id": "speed", "type": "gauge", "config": { "unit": "mph", "color": "#ef4444" } },
    { "id": "rpm", "type": "gauge", "config": { "unit": "rpm", "color": "#f59e0b" } },
    { "id": "gear", "type": "display" },
    { "id": "laptime", "type": "display" },
    { "id": "gforce", "type": "gauge", "config": { "color": "#8b5cf6" } }
  ],
  "position": "bottom",
  "opacity": 80
}
```

### Cycling Fitness

```json
{
  "activity": "cycling",
  "widgets": [
    { "id": "speed", "type": "gauge", "config": { "unit": "mph", "color": "#3b82f6" } },
    { "id": "heartrate", "type": "gauge", "config": { "unit": "bpm", "color": "#ef4444" } },
    { "id": "cadence", "type": "gauge", "config": { "unit": "rpm", "color": "#10b981" } },
    { "id": "distance", "type": "display", "config": { "unit": "miles" } },
    { "id": "elevation", "type": "graph" }
  ],
  "position": "left",
  "opacity": 75
}
```

## 🔧 Unit Conversions

The system automatically converts between:

**Speed:**
- mph (miles per hour)
- km/h (kilometers per hour)
- knots
- m/s (meters per second)

**Altitude/Distance:**
- feet
- meters
- fathoms (marine)

**Vertical Speed:**
- fpm (feet per minute)
- mpm (meters per minute)

**Temperature:**
- °F (Fahrenheit)
- °C (Celsius)

## 💡 Pro Tips

### Better GPS Accuracy
Before recording:
- **GoPro:** Enable GPS, use Power button to start, wait for lock
- **Insta360:** Use GPS Remote (best) or keep phone screen ON

### Overlay Design
- Use 3-6 widgets for best readability
- Match colors to your activity (blue for water, green for cycling, etc.)
- Bottom position works best for most videos
- 75-85% opacity is ideal

### Performance
- Lower resolution videos process faster
- Limit widgets to 6 for smooth playback
- Use "corners" layout for minimal obstruction

## 🎬 Example Workflows

### Workflow 1: Quick & Simple
1. Extract telemetry: `node src/extract.js video.mp4`
2. Use pre-made config: `configs/aviation-basic.json`
3. Generate: `node src/overlay-generator.js video.mp4 output/video_telemetry.json configs/aviation-basic.json`

### Workflow 2: Custom Design
1. Extract telemetry
2. Open overlay designer web app
3. Choose activity and widgets
4. Customize units and colors
5. Export config
6. Generate overlay video

### Workflow 3: Batch Processing
Process multiple videos with same overlay:

```bash
for video in *.MP4; do
  node src/extract.js "$video"
  node src/overlay-generator.js "$video" "output/${video%.MP4}_telemetry.json" my-config.json "overlay_$video"
done
```

## 🐛 Troubleshooting

### "No telemetry data"
- Check camera GPS was enabled
- Verify video file has GPMF track
- Try with known good GoPro video first

### Overlay looks wrong
- Check units match your data source
- Verify config JSON syntax
- Test with example configs first

### Video processing slow
- Use lower resolution source
- Reduce number of widgets
- Update ffmpeg to latest version

### Colors not showing
- Use hex colors: `#3b82f6` not `blue`
- Check opacity setting (0-100)
- Verify widget is enabled in config

## 📚 Pre-made Configs

Check the `configs/` folder for ready-to-use templates:
- `aviation-sixpack.json` - Complete six-pack instruments
- `racing-dash.json` - Racing dashboard
- `cycling-fitness.json` - Cycling metrics
- `skiing-stats.json` - Ski/snowboard stats
- `marine-nav.json` - Marine navigation

## 🎓 Advanced: Custom Widgets

Want to create your own widget types? Edit `src/overlay-generator.js`:

```javascript
// Add custom widget
case 'custom-widget':
  this.drawCustomWidget(ctx, position.x, position.y, dataPoint);
  break;

// Implement drawing function
drawCustomWidget(ctx, x, y, data) {
  // Your custom drawing code here
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(x, y, 100, 100);
  // ... etc
}
```

## 🌟 Examples Gallery

Check out example videos:
- [Aviation - Cessna Flight](examples/aviation/)
- [Motorsports - Track Day](examples/motorsports/)
- [Cycling - Mountain Ride](examples/cycling/)
- [Skiing - Powder Run](examples/skiing/)

## 💬 Support

- 🐛 [Report Issues](https://github.com/Borderlessaviation/actioncam-data/issues)
- 💡 [Request Features](https://github.com/Borderlessaviation/actioncam-data/issues/new)
- ⭐ [Star the Project](https://github.com/Borderlessaviation/actioncam-data)

---

**Ready to create amazing videos? Start with Step 1! 🚀**