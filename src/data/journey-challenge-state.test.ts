import {describe,it,expect} from 'vitest';
import {activeQuestionIndex,nextUnansweredIndex} from './journey-challenge-state';
describe('answer-by-answer hometown challenge progression',()=>{
 const ids=['q-festival','q-livelihood','q-heritage','q-lesson'];
 it('starts at the first genuinely unanswered question',()=>{
  expect(activeQuestionIndex(ids,new Set(),0)).toBe(0);
 });
 it('keeps correct feedback on the question just checked until explicit Next is pressed',()=>{
  const done=new Set(['q-festival']);
  expect(activeQuestionIndex(ids,done,0,'q-festival')).toBe(0);
  expect(nextUnansweredIndex(ids,done)).toBe(1);
  expect(activeQuestionIndex(ids,done,1)).toBe(1);
 });
 it('skips already stored answers on resume instead of locking later buttons',()=>{
  const done=new Set(['q-festival','q-livelihood','q-heritage']);
  expect(activeQuestionIndex(ids,done,0)).toBe(3);
  expect(nextUnansweredIndex(ids,done)).toBe(3);
 });
 it('offers the completion screen only when EVERY question is saved',()=>{
  const done=new Set(ids);
  expect(activeQuestionIndex(ids,done,1)).toBe(-1);
  expect(activeQuestionIndex(ids,done,3,'q-lesson')).toBe(3);
  expect(nextUnansweredIndex(ids,done)).toBe(-1);
 });
});
