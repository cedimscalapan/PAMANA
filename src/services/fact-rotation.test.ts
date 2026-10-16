import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getCulturalFact, localDay, readFactRotation, selectFact } from './fact-rotation';
import { setStored } from './storage';
import { culturalFacts } from '../data/cultural-facts';
vi.mock('./storage',()=>({setStored:vi.fn(async(key:string,value:string)=>{localStorage.setItem(key,value);})}));
const key='pamana.culturalFacts.rotation.v1';
let saved:Map<string,string>;
beforeEach(()=>{saved=new Map();Object.defineProperty(globalThis,'localStorage',{value:{getItem:(key:string)=>saved.get(key)??null,setItem:(key:string,value:string)=>saved.set(key,value)},configurable:true});vi.mocked(setStored).mockClear();});
describe('cultural fact rotation',()=>{
  it('uses the local calendar rather than the UTC date',()=>{const date=new Date(2026,9,17,0,15);expect(localDay(date)).toBe('2026-10-17');});
  it('keeps the chosen fact on reopening and advances on a new day',async()=>{const first=await getCulturalFact(culturalFacts,false,new Date(2026,9,17));expect(await getCulturalFact(culturalFacts,false,new Date(2026,9,17))).toEqual(first);expect(setStored).toHaveBeenCalledTimes(1);expect((await getCulturalFact(culturalFacts,false,new Date(2026,9,18))).id).not.toBe(first.id);});
  it('exhausts every distinct fact before recycling and avoids an immediate repeat',()=>{let state=readFactRotation();const seen=[];for(let i=0;i<culturalFacts.length;i++){state=selectFact(culturalFacts,state,'2026-10-17',true,()=>.35);seen.push(state.currentId);}expect(new Set(seen).size).toBe(culturalFacts.length);const next=selectFact(culturalFacts,state,'2026-10-17',true,()=>.35);expect(next.currentId).not.toBe(state.currentId);expect(next.seen).toHaveLength(1);});
  it('changes semantic topics and categories when the pool allows it',()=>{const pool=[{id:'a',topic:'same',category:'a'},{id:'b',topic:'same',category:'b'},{id:'c',topic:'different',category:'a'},{id:'d',topic:'other',category:'c'}];const initial={...readFactRotation(),currentId:'a',history:['a'],seen:['a']};expect(selectFact(pool,initial,'today',true,()=>0).currentId).toBe('d');});
  it('handles invalid history, removed facts and a single-item pool',()=>{saved.set(key,'{broken');expect(readFactRotation().seen).toEqual([]);const pool=[{id:'only',topic:'one',category:'one'}];const state=selectFact(pool,{...readFactRotation(),history:['removed'],seen:['removed']},'today',true);expect(state.currentId).toBe('only');expect(selectFact(pool,state,'tomorrow').currentId).toBe('only');});
  it('does not advance history when persistence fails, and can retry',async()=>{const first=await getCulturalFact(culturalFacts);const snapshot=saved.get(key);vi.mocked(setStored).mockRejectedValueOnce(new Error('Storage full'));await expect(getCulturalFact(culturalFacts,true)).rejects.toThrow('Storage full');expect(saved.get(key)).toBe(snapshot);expect((await getCulturalFact(culturalFacts,true)).id).not.toBe(first.id);});
});
