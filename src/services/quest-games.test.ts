import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createRounds, freshItems, gameModes, mapItems, photoItems, timelineItems } from '../data/quest-games';
import { advance, emptyProgress, isCorrect, makeDraft, newSession, readQuestProgress, roundPoints, saveQuestProgress } from './quest-games';
import { setStored } from './storage';
vi.mock('./storage',()=>({setStored:vi.fn(async(key:string,value:string)=>{localStorage.setItem(key,value);})}));
let saved:Map<string,string>;
beforeEach(()=>{saved=new Map();Object.defineProperty(globalThis,'localStorage',{value:{getItem:(key:string)=>saved.get(key)??null,setItem:(key:string,value:string)=>saved.set(key,value)},configurable:true});});
describe('interactive games',()=>{
  it('has distinct playable formats with valid answer keys in both levels',()=>{
    for(const mode of gameModes)for(const level of ['gentle','challenge'] as const){
      const rounds=createRounds(mode.id,level,[],()=>.4);expect(rounds.length).toBeGreaterThan(0);
      for(const round of rounds){const draft=makeDraft(round);expect(new Set(round.items.map(item=>item.id)).size).toBe(round.items.length);expect(round.sourceIds.length).toBeGreaterThan(0);
        if(mode.id==='map'||mode.id==='photo'||mode.id==='quiz'){draft.selected=round.answer;expect(round.items.some(item=>item.id===round.answer)).toBe(true);expect(round.link).toBe(round.items.find(item=>item.id===round.answer)?.link);}
        if(mode.id==='word'){draft.tiles=Array.from(round.answer!);draft.word=draft.tiles.map((_,i)=>i);}
        if(mode.id==='sort')draft.groups=Object.fromEntries(round.items.map(item=>[item.id,item.group!]));
        if(mode.id==='timeline')draft.order=[...round.items].sort((a,b)=>a.date!-b.date!).map(item=>item.id);
        if(mode.id==='memory'){draft.matched=round.items.map(item=>item.id);expect(new Set(draft.deck).size).toBe(round.items.length*2);}
        expect(isCorrect(round,draft)).toBe(true);
      }
    }
  });
  it('accepts either order of events that share a year',()=>{const items=timelineItems.filter(item=>item.date===1950);const round={...createRounds('timeline','gentle')[0],items};const draft={...makeDraft(round),order:items.map(item=>item.id).reverse()};expect(isCorrect(round,draft)).toBe(true);});
  it('rejects a reversed chronology or repeated event',()=>{const round=createRounds('timeline','challenge')[0],draft=makeDraft(round);draft.order=[...round.items].sort((a,b)=>b.date!-a.date!).map(item=>item.id);expect(isCorrect(round,draft)).toBe(false);draft.order=round.items.map(()=>round.items[0].id);expect(isCorrect(round,draft)).toBe(false);});
  it('uses fresh content before recently completed content',()=>{const recent=photoItems.slice(0,3).map(item=>item.id);expect(freshItems(photoItems,3,recent).every(item=>!recent.includes(item.id))).toBe(true);});
  it('uses real public coordinates and keeps markers separated',()=>{for(const round of createRounds('map','challenge')){expect(round.items.length).toBeGreaterThanOrEqual(3);for(const point of round.items){expect(mapItems).toContainEqual(point);expect(point.latitude).toBeGreaterThan(12);expect(point.longitude).toBeGreaterThan(120);for(const other of round.items.filter(item=>item!==point))expect(Math.hypot(point.latitude!-other.latitude!,point.longitude!-other.longitude!)).toBeGreaterThan(.16);}}});
  it('gives consistent points for first checks, assistance, retries and guided answers',()=>{const draft=makeDraft(createRounds('word','gentle')[0]);expect(roundPoints(draft)).toBe(0);draft.correct=true;expect(roundPoints(draft)).toBe(10);draft.hinted=true;expect(roundPoints(draft)).toBe(5);draft.revealed=true;expect(roundPoints(draft)).toBe(2);draft.correct=false;expect(roundPoints(draft)).toBe(0);});
  it('saves an unfinished board and its letter order, then records completion once',async()=>{const session=newSession('word','gentle',emptyProgress());session.draft.word=[0,1];await saveQuestProgress({...emptyProgress(),active:session});expect(readQuestProgress().active?.draft).toEqual(session.draft);let state=readQuestProgress();for(let i=0;i<session.rounds.length;i++){const active=state.active!;state=advance(state,{...active,draft:{...active.draft,checked:true,correct:true}});}await saveQuestProgress(state);expect(readQuestProgress().results).toHaveLength(1);expect(state.results[0].score).toBe(30);expect(state.active?.complete).toBe(true);});
  it('leaves prior progress and legacy scores intact after a failed save',async()=>{saved.set('pamana.quest.bestScore','80');const before={...emptyProgress(),active:newSession('sort','gentle',emptyProgress())};await saveQuestProgress(before);vi.mocked(setStored).mockRejectedValueOnce(new Error('Storage unavailable'));await expect(saveQuestProgress({...before,active:undefined})).rejects.toThrow();expect(readQuestProgress()).toEqual(before);expect(saved.get('pamana.quest.bestScore')).toBe('80');});
  it('retains completion counts and best scores beyond the recent-result window',()=>{let state=emptyProgress();for(let index=0;index<105;index++){const session=newSession('sort','gentle',state);session.id=`result-${index}`;session.draft={...session.draft,checked:true,correct:index===0};state=advance(state,session);}expect(state.results).toHaveLength(100);expect(state.totals.completed).toBe(105);expect(state.totals.games['sort:gentle']).toEqual({completed:105,bestScore:10,possible:10});expect(()=>advance(state,state.active!)).toThrow('already been saved');});
});
