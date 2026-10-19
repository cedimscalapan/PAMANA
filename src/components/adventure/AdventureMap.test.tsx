import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import AdventureMap,{IslandOutline} from './AdventureMap';
import {emptyJourney} from '../../data/heritage-journey';
describe('Phase 05 accessible 2D adventure world',()=>{
 it('uses only the bundled SVG coastline and states limits of precision',()=>{
  const html=renderToStaticMarkup(<IslandOutline/>);
  expect(html).toContain('geoBoundaries');
  expect(html).toContain('municipality boundaries');
  expect(html).not.toContain('<image');
 });
 it('shows all fifteen chapter choices without forcing travel or accounts',()=>{
  const html=renderToStaticMarkup(<AdventureMap selected="baco" onSelect={()=>{}} progress={emptyJourney()} completedLessons={new Set()} results={[]}/>);
  expect((html.match(/class="pamana5-trail-stop"/g)??[])).toHaveLength(15);
  expect(html).toContain('not geographical map pins');
  expect(html).toContain('aria-pressed="true"');
 });
});
