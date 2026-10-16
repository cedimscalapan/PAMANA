import { createRounds, GameLevel, GameMode, GameRound, shuffle } from '../data/quest-games';
import { setStored } from './storage';
export type RoundDraft = { selected?: string; order: string[]; groups: Record<string,string>; word: number[]; tiles: string[]; flipped: string[]; matched: string[]; deck: string[]; misses: number; hinted: boolean; checked: boolean; correct: boolean; revealed: boolean };
export type GameSession = { id: string; mode: GameMode; level: GameLevel; rounds: GameRound[]; index: number; score: number; possible: number; draft: RoundDraft; complete: boolean };
type GameSummary = { completed: number; bestScore: number; possible: number };
export type QuestProgress = { version: 2; active?: GameSession; recent: Partial<Record<GameMode,string[]>>; totals: { completed:number; games:Record<string,GameSummary> }; results: { id:string; mode:GameMode; level:GameLevel; score:number; possible:number; completedAt:string }[] };
const key='pamana.quest.games.v2';
export const emptyProgress=():QuestProgress=>({version:2,recent:{},results:[],totals:{completed:0,games:{}}});
export function readQuestProgress():QuestProgress {
  try {
    const value=JSON.parse(localStorage.getItem(key)??'null') as QuestProgress|null;
    if(!value||value.version!==2||!Array.isArray(value.results)||!value.recent||typeof value.recent!=='object')return emptyProgress();
    if(!value.totals){
      value.totals={completed:value.results.length,games:{}};
      for(const result of value.results){const id=`${result.mode}:${result.level}`,previous=value.totals.games[id];value.totals.games[id]={completed:(previous?.completed??0)+1,bestScore:previous&&previous.bestScore/previous.possible>=result.score/result.possible?previous.bestScore:result.score,possible:previous&&previous.bestScore/previous.possible>=result.score/result.possible?previous.possible:result.possible};}
    }
    if(value.active && (!Array.isArray(value.active.rounds)||!value.active.rounds.length||!value.active.rounds[value.active.index]||!value.active.draft))return {...value,active:undefined};
    return value;
  }catch{return emptyProgress();}
}
export function makeDraft(round:GameRound):RoundDraft {
  return {order:round.items.map(item=>item.id),groups:{},word:[],tiles:round.mode==='word'?shuffle(Array.from(round.answer!)):[],flipped:[],matched:[],deck:round.mode==='memory'?shuffle(round.items.flatMap(item=>[`${item.id}:image`,`${item.id}:name`])):[],misses:0,hinted:false,checked:false,correct:false,revealed:false};
}
export function newSession(mode:GameMode,level:GameLevel,progress:QuestProgress):GameSession {
  const rounds=createRounds(mode,level,progress.recent[mode]??[]);
  return {id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,mode,level,rounds,index:0,score:0,possible:rounds.length*10,draft:makeDraft(rounds[0]),complete:false};
}
export function isCorrect(round:GameRound,draft:RoundDraft):boolean {
  if(round.mode==='map'||round.mode==='photo'||round.mode==='quiz')return draft.selected===round.answer;
  if(round.mode==='word')return draft.word.map(index=>draft.tiles[index]).join('')===round.answer;
  if(round.mode==='sort')return round.items.every(item=>draft.groups[item.id]===item.group);
  if(round.mode==='memory')return draft.matched.length===round.items.length;
  const dates=draft.order.map(id=>round.items.find(item=>item.id===id)?.date);
  return dates.length===round.items.length && new Set(draft.order).size===round.items.length && dates.every((date,index)=>date!==undefined&&(index===0||date>=dates[index-1]!));
}
export function roundPoints(draft:RoundDraft):number {
  return !draft.correct?0:draft.revealed?2:draft.hinted||draft.misses>0?5:10;
}
export function advance(progress:QuestProgress,session:GameSession):QuestProgress {
  if(session.complete)throw Error('This completed result has already been saved.');
  if(!session.draft.checked)throw Error('Check this activity before continuing.');
  const score=session.score+roundPoints(session.draft),next=session.index+1;
  if(next<session.rounds.length)return {...progress,active:{...session,score,index:next,draft:makeDraft(session.rounds[next])}};
  // Keep old quiz keys intact. Store the result and completion in one authoritative write.
  const result={id:session.id,mode:session.mode,level:session.level,score,possible:session.possible,completedAt:new Date().toISOString()};
  const used=session.rounds.flatMap(round=>round.mode==='photo'||round.mode==='map'?[round.answer!]:round.mode==='quiz'?[round.id]:round.items.map(item=>item.id));
  const gameKey=`${session.mode}:${session.level}`,previous=progress.totals.games[gameKey];
  const isBest=!previous||score/session.possible>previous.bestScore/previous.possible;
  const totals={completed:progress.totals.completed+1,games:{...progress.totals.games,[gameKey]:{completed:(previous?.completed??0)+1,bestScore:isBest?score:previous.bestScore,possible:isBest?session.possible:previous.possible}}};
  return {...progress,totals,active:{...session,score,complete:true},recent:{...progress.recent,[session.mode]:[...new Set([...(progress.recent[session.mode]??[]).filter(id=>!used.includes(id)),...used])].slice(-Math.max(6,used.length*2))},results:[result,...progress.results.filter(row=>row.id!==result.id)].slice(0,100)};
}
/** Update UI only after this single native SQLite / browser storage write succeeds. */
export async function saveQuestProgress(next:QuestProgress):Promise<QuestProgress> {await setStored(key,JSON.stringify(next));return next;}
