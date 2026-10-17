import {describe,expect,it} from 'vitest';
import {municipalities,festivalThemes} from './festival-themes';
import {hometownArt,artworkForHometown,artworkForTheme} from './festival-artwork';
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
 it('has a fallback when no hometown is provided',()=>expect(artworkForHometown('')).toBeTruthy());
});