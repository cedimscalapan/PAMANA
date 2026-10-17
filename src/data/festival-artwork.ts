import type { FestivalTheme, Municipality } from './festival-themes';
import art0 from '../assets/theme-scenes/baco.svg';
import art1 from '../assets/theme-scenes/bansud.svg';
import art2 from '../assets/theme-scenes/bongabong.svg';
import art3 from '../assets/theme-scenes/bulalacao.svg';
import art4 from '../assets/theme-scenes/calapan-city.svg';
import art5 from '../assets/theme-scenes/gloria.svg';
import art6 from '../assets/theme-scenes/mansalay.svg';
import art7 from '../assets/theme-scenes/naujan.svg';
import art8 from '../assets/theme-scenes/pinamalayan.svg';
import art9 from '../assets/theme-scenes/pola.svg';
import art10 from '../assets/theme-scenes/puerto-galera.svg';
import art11 from '../assets/theme-scenes/roxas.svg';
import art12 from '../assets/theme-scenes/san-teodoro.svg';
import art13 from '../assets/theme-scenes/socorro.svg';
import art14 from '../assets/theme-scenes/victoria.svg';
import heritageArt from '../assets/theme-scenes/heritage.svg';

/** Bundled decorative concepts, not documentary photos or authorized Indigenous imagery. */
export const hometownArt: Record<Municipality,string> = {
  'Baco': art0,
  'Bansud': art1,
  'Bongabong': art2,
  'Bulalacao': art3,
  'Calapan City': art4,
  'Gloria': art5,
  'Mansalay': art6,
  'Naujan': art7,
  'Pinamalayan': art8,
  'Pola': art9,
  'Puerto Galera': art10,
  'Roxas': art11,
  'San Teodoro': art12,
  'Socorro': art13,
  'Victoria': art14,
};
export const artworkForHometown = (town:string): string => town in hometownArt ? hometownArt[town as Municipality] : heritageArt;
export const artworkForTheme = (theme:FestivalTheme): string => artworkForHometown(theme.municipality);
