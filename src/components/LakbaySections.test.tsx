import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {MemoryRouter} from 'react-router-dom';
import LakbaySections from './LakbaySections';
describe('consolidated Lakbay exploration',()=>{
 it('provides three clear working deep links without duplicating the town grid',()=>{
  const html=renderToStaticMarkup(<MemoryRouter><LakbaySections active="adventure"/></MemoryRouter>);
  for(const path of ['/journey','/explore','/quest'])expect(html).toContain('href="'+path+'"');
  expect((html.match(/aria-current="page"/g)??[])).toHaveLength(1);
  expect(html).toContain('Hometowns');
  expect(html).toContain('Places &amp; Festivals');
  expect(html).toContain('Mga Laro');
 });
 it('marks exactly one active region, including free-play Quest',()=>{
  const html=renderToStaticMarkup(<MemoryRouter><LakbaySections active="challenges"/></MemoryRouter>);
  expect((html.match(/aria-current="page"/g)??[])).toHaveLength(1);
  expect(html).toContain('class="selected"');
 });
});
