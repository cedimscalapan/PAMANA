import { describe,expect,it } from 'vitest';
import { festivalThemes,municipalities } from './festival-themes';
import { hometownVisualForTown } from './festival-artwork';
describe('crisp offline hometown personalization',()=>{
 it('renders a theme for each of 15 localities without external images',()=>{
  expect(municipalities).toHaveLength(15);
  for(const town of municipalities){
   const visual=hometownVisualForTown(town);
   expect(visual.emoji.length).toBeGreaterThan(0);
   expect(visual.primary).toMatch(/^#[0-9A-F]{6}$/i);
   expect(JSON.stringify(visual)).not.toMatch(/https?:\/\/|\.avif|\.webp|\.png|\.jpg/i);
  }
 });
 it('keeps alternate festival palettes for Calapan City',()=>{
   expect(festivalThemes.filter(x=>x.municipality==='Calapan City').length).toBeGreaterThan(1);
 });
 it('falls back to the classic motif without a hometown',()=>{
  expect(hometownVisualForTown('').emoji).toBe('🌿');
 });
});
