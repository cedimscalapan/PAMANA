import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {HometownPicker,LearningStylePicker,AvatarPicker,FestivalPalettePicker} from './PersonalizationChoices';
import {municipalities,festivalThemes} from '../../data/festival-themes';
import {learningStages} from '../../data/learning-levels';

describe('phase 03 reusable choices',()=>{
 it('renders each of the 15 optional hometown choices including Calapan City',()=>{
  const html=renderToStaticMarkup(<HometownPicker value="Calapan City" onChange={()=>{}}/>);
  for(const town of municipalities)expect(html).toContain(town);
  expect((html.match(/class="pamana3-hometown-card"/g)??[])).toHaveLength(15);
  expect(html).toContain('I');
  expect(html).toContain('aria-pressed="true"');
  expect(html).toContain('Explore all of Oriental Mindoro');
 });
 it('renders four age-inclusive, selectable reading styles without gating',()=>{
  const html=renderToStaticMarkup(<LearningStylePicker value="young" onChange={()=>{}}/>);
  for(const stage of learningStages)expect(html).toContain(stage.name);
  expect((html.match(/class="pamana3-learning-card /g)??[])).toHaveLength(4);
  expect(html).toContain('age');
  expect(html).toContain('aria-pressed="true"');
 });
 it('renders all current avatars with selected state',()=>{
  const html=renderToStaticMarkup(<AvatarPicker value="book" onChange={()=>{}}/>);
  expect((html.match(/class="pamana3-avatar"/g)??[])).toHaveLength(5);
  expect(html).toContain('Book');
  expect(html).toContain('aria-pressed="true"');
 });
 it('keeps a custom palette visible even when the hometown suggestion differs',()=>{
  const html=renderToStaticMarkup(<FestivalPalettePicker value="bahaghari" hometown="Baco" onChange={()=>{}}/>);
  expect(html).toContain('Bahaghari');
  expect(html).toContain('Banana Festival');
  expect(html).toContain('Classic PAMANA');
  expect(html).toContain('Browse all themes');
  expect(festivalThemes.length).toBeGreaterThanOrEqual(municipalities.length);
 });
});
