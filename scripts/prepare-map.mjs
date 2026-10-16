import { readFileSync, writeFileSync } from 'node:fs';
const collection = JSON.parse(readFileSync(new URL('../src/data/mindoro-boundary.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));
const polygons = collection.features.flatMap(feature => feature.geometry.type === 'MultiPolygon' ? feature.geometry.coordinates : [feature.geometry.coordinates]);
const project = ([lon, lat]) => [28 + (lon - 120.2) * 220, 34 + (13.65 - lat) * 220];
const rings = polygons.filter(polygon => {
  const ring = polygon[0];
  const lon = ring.reduce((sum, point) => sum + point[0], 0) / ring.length;
  const lat = ring.reduce((sum, point) => sum + point[1], 0) / ring.length;
  return lon > 120.2 && lon < 121.6 && lat > 12.1 && lat < 13.65;
}).map(polygon => polygon[0].filter((_, index) => index % 3 === 0).map(project)).filter(ring => ring.length >= 3);
const paths = rings.map(ring => `M${ring.map(point => point.map(value => value.toFixed(1)).join(',')).join('L')}Z`);
writeFileSync(new URL('../src/data/mindoro-map.ts', import.meta.url), `// Derived from geoBoundaries gbOpen PHL ADM1 (41af8f1), CC BY 3.0 IGO.\n// Mindoro coastline only; no invented provincial boundary.\nexport const mindoroPaths = ${JSON.stringify(paths)};\nexport const projectMindoro = (longitude: number, latitude: number) => [28 + (longitude - 120.2) * 220, 34 + (13.65 - latitude) * 220];\n`);
console.log(`Prepared ${paths.length} Mindoro coastline paths.`);
