import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import JourneyLevelMap from './JourneyLevelMap';
import {emptyJourney,heritageChapters} from '../../data/heritage-journey';
const render=(id=heritageChapters[0].id)=>renderToStaticMarkup(
 <JourneyLevelMap selected={heritageChapters.find(chapter=>chapter.id===id)!} progress={emptyJourney()}
  completedLessons={new Set<string>()} results={[]} onSelect={()=>{}} onStart={()=>{}} onDetails={()=>{}}/>
);
describe('interactive Journey level-map render',()=>{
 it('provides fifteen individually labeled buttons with no duplicate levels',()=>{
  const html=render();
  expect((html.match(/class="pamana-gameworld-node zone-/g)??[])).toHaveLength(15);
  for(const [index,chapter] of heritageChapters.entries())expect(html).toContain('Level '+(index+1)+': '+chapter.town);
  expect(html).toContain('Every level is open');
  expect(html).toContain('not a road, travel route or geographic municipality map');
 });
 it('has immediate action, chapter-details and accessible List View alternatives',()=>{
  const html=render();
  expect(html).toContain('Discover local history');
  expect(html).toContain('View chapter details');
  expect(html).toContain('Town list');
  expect(html).toContain('aria-label="Illustrated level trail with fifteen selectable hometown levels"');
 });
 it('shows the selected chapter without inventing completion',()=>{
  const html=render(heritageChapters[2].id);
  expect(html).toContain('0 of 3 discoveries completed');
  expect(html).toContain('aria-pressed="true"');
 });
});
