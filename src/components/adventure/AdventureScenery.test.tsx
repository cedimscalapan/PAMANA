import {describe,expect,it} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import AdventureScenery from './AdventureScenery';
describe('offline resolution independent scenery',()=>{
 it('renders three accessible decorative SVG variants with no network images',()=>{
  for(const variant of ['coast','hills','sunrise'] as const){
   const markup=renderToStaticMarkup(<AdventureScenery variant={variant}/>);
   expect(markup).toContain('<svg');
   expect(markup).toContain('viewBox="0 0 760 300"');
   expect(markup).toContain('aria-hidden="true"');
   expect(markup).not.toContain('<image');
   expect(markup).not.toContain('data:image/');
   expect(markup).not.toContain('src="http');
   expect(markup).not.toContain('href="http');
  }
 });
});
