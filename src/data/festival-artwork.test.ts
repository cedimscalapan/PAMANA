import {describe,expect,it} from 'vitest';
import {municipalities,festivalThemes} from './festival-themes';
import {hometownArt,artworkForHometown,artworkForTheme,generatedTileForHometown,generatedHometownSprite} from './festival-artwork';
describe('hometown illustration assets',()=>{
 it('includes a bundled illustration for all 15 localities',()=>{
  expect(Object.keys(hometownArt)).toHaveLength(15);
  for(const town of municipalities){expect(typeof artworkForHometown(town)).toBe('string');expect(artworkForHometown(town)).toBeTruthy();}
 });
 it('shares a locality image across its alternate festival palettes',()=>{
  const city=festivalThemes.filter(t=>t.municipality==='Calapan City');
  expect(city.length).toBeGreaterThan(1);
  for(const theme of city)expect(artworkForTheme(theme)).toBe(hometownArt['Calapan City']);
 });
 it('maps all 15 generated illustration panels without overlap',()=>{
  const positions=municipalities.map(town=>generatedTileForHometown(town));
  expect(positions.every(Boolean)).toBe(true);
  expect(new Set(positions.map(point=>`${point?.col}:${point?.row}`)).size).toBe(15);
  for(const point of positions){expect(point!.col).toBeGreaterThanOrEqual(0);expect(point!.col).toBeLessThan(5);expect(point!.row).toBeGreaterThanOrEqual(0);expect(point!.row).toBeLessThan(3);}
  expect(generatedHometownSprite).toBeTruthy();
 });
 it('all alternate Calapan themes resolve to the same generated image panel',()=>expect(generatedTileForHometown('Calapan City')).toEqual({col:4,row:0}));
 it('has a fallback when no hometown is provided',()=>{expect(artworkForHometown('')).toBeTruthy();expect(generatedTileForHometown('')).toBeUndefined();});
});