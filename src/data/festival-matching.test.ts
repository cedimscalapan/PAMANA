import {describe,it,expect} from 'vitest';
import {festivalMatchQuestions,correctFestivalMatch} from './festival-matching';
import {municipalities} from './festival-themes';
import {officialFestivals} from './official-heritage';
describe('Phase 08 sourced festival connections',()=>{
 it('provides every locality with a real directory entry',()=>{
  expect(festivalMatchQuestions).toHaveLength(15);
  expect(new Set(festivalMatchQuestions.map(x=>x.town))).toEqual(new Set(municipalities));
  for(const q of festivalMatchQuestions){
   const source=officialFestivals.find(f=>f.id===q.id);
   expect(source).toBeTruthy();
   expect(q.festival).toBe(source!.name);
   expect(q.town).toBe(source!.municipality);
   expect(q.sourceIds).toEqual(source!.sourceIds);
   expect(q.options).toHaveLength(4);
   expect(new Set(q.options).size).toBe(4);
   expect(q.options.filter(o=>correctFestivalMatch(q,o))).toEqual([q.town]);
  }
 });
 it('rejects unrelated answers',()=>expect(correctFestivalMatch(festivalMatchQuestions[0],'not a hometown')).toBe(false));
});
