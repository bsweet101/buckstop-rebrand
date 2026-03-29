// Generate pre-projected SVG paths from US GeoJSON
import { geoAlbersUsa, geoPath } from '../src/node_modules/d3-geo/src/index.js';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'src', 'app', 'rut-calendar', 'us-map-paths.ts');

const FIPS_TO_STATE = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '12': 'FL', '13': 'GA',
  '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN', '19': 'IA',
  '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME', '24': 'MD',
  '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS', '29': 'MO',
  '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH', '34': 'NJ',
  '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND', '39': 'OH',
  '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI', '45': 'SC',
  '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT', '50': 'VT',
  '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI', '56': 'WY',
};

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

const geojson = await fetchJSON('https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json');
console.log(`Got ${geojson.features.length} features`);

const projection = geoAlbersUsa().scale(1200).translate([480, 300]);
const pathGen = geoPath().projection(projection);

const paths = [];
for (const f of geojson.features) {
  const code = FIPS_TO_STATE[f.id];
  if (!code) continue;
  const d = pathGen(f);
  if (!d) { console.log(`  Skip ${code}`); continue; }
  paths.push({ code, d });
  console.log(`  ${code} OK`);
}

console.log(`\n${paths.length} states generated`);

const ts = `// Auto-generated US state SVG paths (d3.geoAlbersUsa, scale 1200)
// ViewBox: 0 0 960 600

export interface StatePathData {
  code: string;
  d: string;
}

export const STATE_PATHS: StatePathData[] = ${JSON.stringify(paths, null, 2)};
`;

fs.writeFileSync(OUTPUT_FILE, ts);
console.log(`Written to ${OUTPUT_FILE}`);
