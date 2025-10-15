// ActionCam Data Extractor
// Extract GPS, speed, and sensor data from action camera videos
// npm install gpmf-extract gopro-telemetry

const gpmfExtract = require('gpmf-extract');
const goproTelemetry = require('gopro-telemetry');
const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = 'output';
const EXPORT_FORMATS = {
  json: true,    // Raw JSON data
  gpx: true,     // GPS tracks (Google Earth, Strava)
  csv: true,     // Excel/spreadsheet
  kml: true,     // Google Earth
  geojson: true  // Web mapping
};

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

async function extractTelemetry(videoPath) {
  console.log(`\n📹 Processing: ${path.basename(videoPath)}`);
  
  try {
    const file = fs.readFileSync(videoPath);
    
    console.log('⚙️  Extracting telemetry data...');
    const extracted = await gpmfExtract(file);
    
    if (!extracted || !extracted.rawData) {
      throw new Error('No telemetry data found');
    }
    
    const baseFilename = path.basename(videoPath, path.extname(videoPath));
    
    // Extract JSON (full data)
    if (EXPORT_FORMATS.json) {
      const telemetryData = await goproTelemetry(extracted, {
        stream: ['GPS5', 'GPS9', 'ACCL', 'GYRO'],
        repeatSticky: true,
        repeatHeaders: true
      });
      
      const jsonPath = path.join(OUTPUT_DIR, `${baseFilename}_telemetry.json`);
      fs.writeFileSync(jsonPath, JSON.stringify(telemetryData, null, 2));
      console.log(`✓ JSON: ${jsonPath}`);
    }
    
    // Extract GPX (GPS track)
    if (EXPORT_FORMATS.gpx) {
      const gpxData = await goproTelemetry(extracted, {
        preset: 'gpx',
        name: baseFilename
      });
      
      const gpxPath = path.join(OUTPUT_DIR, `${baseFilename}_gps.gpx`);
      fs.writeFileSync(gpxPath, gpxData);
      console.log(`✓ GPX: ${gpxPath}`);
    }
    
    // Extract KML (Google Earth)
    if (EXPORT_FORMATS.kml) {
      const kmlData = await goproTelemetry(extracted, {
        preset: 'kml'
      });
      
      const kmlPath = path.join(OUTPUT_DIR, `${baseFilename}_gps.kml`);
      fs.writeFileSync(kmlPath, kmlData);
      console.log(`✓ KML: ${kmlPath}`);
    }
    
    // Extract GeoJSON
    if (EXPORT_FORMATS.geojson) {
      const geojsonData = await goproTelemetry(extracted, {
        preset: 'geojson'
      });
      
      const geojsonPath = path.join(OUTPUT_DIR, `${baseFilename}_gps.geojson`);
      fs.writeFileSync(geojsonPath, geojsonData);
      console.log(`✓ GeoJSON: ${geojsonPath}`);
    }
    
    // Extract CSV (Spreadsheet)
    if (EXPORT_FORMATS.csv) {
      const csvData = await goproTelemetry(extracted, {
        preset: 'csv'
      });
      
      for (const [streamName, csvContent] of Object.entries(csvData)) {
        const csvPath = path.join(OUTPUT_DIR, `${baseFilename}_${streamName}.csv`);
        fs.writeFileSync(csvPath, csvContent);
        console.log(`✓ CSV: ${csvPath}`);
      }
    }
    
    console.log('\n✅ Success! Files saved to:', OUTPUT_DIR);
    displaySummary(extracted);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    if (error.message.includes('No telemetry data')) {
      console.log('\n💡 Possible reasons:');
      console.log('  • GoPro: GPS not enabled in settings');
      console.log('  • GoPro: QuickCapture mode used');
      console.log('  • Insta360: No GPS remote/phone connected');
      console.log('  • Camera had no GPS lock (indoors)');
    }
  }
}

function displaySummary(extracted) {
  console.log('\n📊 Summary:');
  console.log(`  Duration: ${(extracted.timing.videoDuration / 60).toFixed(2)} minutes`);
  console.log(`  Start: ${extracted.timing.start}`);
  console.log(`  Samples: ${extracted.timing.samples.length}`);
}

async function extractMultiple(videoPaths) {
  console.log(`\n🎬 Merging ${videoPaths.length} videos...\n`);
  
  const extractedFiles = [];
  
  for (const videoPath of videoPaths) {
    console.log(`Reading: ${path.basename(videoPath)}`);
    const file = fs.readFileSync(videoPath);
    const extracted = await gpmfExtract(file);
    extractedFiles.push(extracted);
  }
  
  const mergedTelemetry = await goproTelemetry(extractedFiles, {
    preset: 'gpx',
    name: 'merged_track'
  });
  
  const outputPath = path.join(OUTPUT_DIR, 'merged_gps.gpx');
  fs.writeFileSync(outputPath, mergedTelemetry);
  console.log(`\n✅ Merged track: ${outputPath}`);
}

// Main execution
if (require.main === module) {
  console.log('📹 ActionCam Data Extractor');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (process.argv.length > 2) {
    const files = process.argv.slice(2);
    
    if (files.length > 1) {
      // Multiple files - merge them
      extractMultiple(files);
    } else {
      // Single file
      extractTelemetry(files[0]);
    }
  } else {
    console.log('Usage:');
    console.log('  node src/extract.js VIDEO.MP4');
    console.log('  node src/extract.js VIDEO1.MP4 VIDEO2.MP4  (merge)');
    console.log('\nSupported: GoPro Hero 5-13, Insta360, DJI Action');
  }
}

module.exports = { extractTelemetry, extractMultiple };