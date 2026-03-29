// Generate pre-projected SVG paths from US GeoJSON
// This runs at build time, not in the browser

const https = require('https');
const fs = require('fs');
const path = require('path');
const d3Geo = require('../src/node_modules/d3-geo/d3-geo.js');

const GEOJSON_URL = 'https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json';
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'src', 'app', 'rut-calendar', 'us-map-paths.ts');

// FIPS code to state abbreviation mapping
const FIPS_TO_STATE = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
  '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
  '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
  '56': 'WY',
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading US GeoJSON...');
  const geojson = await fetchJSON(GEOJSON_URL);
  console.log(`Got ${geojson.features.length} features`);

  // Create Albers USA projection (standard for US maps)
  const projection = d3Geo.geoAlbersUsa()
    .scale(1200)
    .translate([480, 300]);

  const pathGenerator = d3Geo.geoPath().projection(projection);

  const paths = [];

  for (const feature of geojson.features) {
    const stateCode = FIPS_TO_STATE[feature.id];
    if (!stateCode) {
      console.log(`  Skipping FIPS ${feature.id} (${feature.properties.name})`);
      continue;
    }

    const d = pathGenerator(feature);
    if (!d) {
      console.log(`  No path for ${stateCode} (${feature.properties.name})`);
      continue;
    }

    paths.push({ code: stateCode, d });
    console.log(`  ${stateCode}: ${d.substring(0, 40)}...`);
  }

  console.log(`\nGenerated ${paths.length} state paths`);

  // Write TypeScript file
  const tsContent = `// Auto-generated US state SVG paths
// Projected using d3.geoAlbersUsa() at scale 1200, translate [480, 300]
// ViewBox: 0 0 960 600
// Generated: ${new Date().toISOString()}

export interface StatePathData {
  code: string;
  d: string;
}

export const STATE_PATHS: StatePathData[] = ${JSON.stringify(paths, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, tsContent);
  console.log(`\nWritten to ${OUTPUT_FILE}`);
}

main().catch(console.error);
