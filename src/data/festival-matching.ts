import {officialFestivals} from './official-heritage';
import {municipalities} from './festival-themes';
export type FestivalMatchQuestion={id:string;festival:string;town:string;options:string[];sourceIds:string[];description:string};
const sorted=municipalities.slice().sort();
export const festivalMatchQuestions:FestivalMatchQuestion[]=sorted.map((town,index)=>{
 const item=officialFestivals.find(f=>f.municipality===town);
 if(!item)throw Error('Missing sourced festival for '+town);
 const others=[sorted[(index+3)%sorted.length],sorted[(index+7)%sorted.length],sorted[(index+11)%sorted.length]];
 return {id:item.id,festival:item.name,town,options:[town,...others].sort((a,b)=>a.localeCompare(b)),sourceIds:item.sourceIds,description:item.description};
});
export const correctFestivalMatch=(question:FestivalMatchQuestion,answer:string)=>question.town===answer;
