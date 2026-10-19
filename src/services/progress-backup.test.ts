import {describe,it,expect} from 'vitest';
import {SNAPSHOT_KIND,validateLearningSnapshot} from './progress-backup';
const sample={kind:SNAPSHOT_KIND,version:1 as const,exportedAt:'2026-10-19T00:00:00Z',values:{}};
describe('Phase 12 learning snapshot safety',()=>{
 it('accepts empty but correctly identified learning backup',()=>expect(validateLearningSnapshot(sample).values).toEqual({}));
 it('rejects generic and newer unsupported backups',()=>{
  expect(()=>validateLearningSnapshot({...sample,version:2})).toThrow();
  expect(()=>validateLearningSnapshot({...sample,kind:'unknown'})).toThrow();
 });
 it('rejects arbitrary keys and malformed progress without writing',()=>{
  expect(()=>validateLearningSnapshot({...sample,values:{'pamana.privateStories':'{}'}})).toThrow();
  expect(()=>validateLearningSnapshot({...sample,values:{'pamana.journey.v1':'invalid'}})).toThrow();
  expect(()=>validateLearningSnapshot({...sample,values:{'pamana.quest.games.v2':'{}'}})).toThrow();
  expect(()=>validateLearningSnapshot({...sample,values:{'pamana.onboardingComplete':'perhaps'}})).toThrow();
 });
 it('allows only actual completed reading values and known chapter names',()=>{
  expect(()=>validateLearningSnapshot({...sample,values:{'pamana.lesson.l1':'unexpected'}})).toThrow();
  const progress={version:1,chapters:{'made-up-town':{festivalOpened:true}}};
  expect(()=>validateLearningSnapshot({...sample,values:{'pamana.journey.v1':JSON.stringify(progress)}})).toThrow();
 });
});
