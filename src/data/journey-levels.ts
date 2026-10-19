import {heritageChapters,type HeritageChapter} from './heritage-journey';

/** Decorative game-board positions, NOT municipality coordinates.
 * Fifteen levels correspond one-to-one to the existing fifteen hometown chapters.
 * Level number = display order only; no chapters are locked.
 */
const levelPoints=[
 [84,148],[177,253],[270,360],[237,466],[115,573],
 [76,680],[179,789],[273,898],[229,1007],[113,1115],
 [76,1224],[179,1333],[273,1443],[224,1552],[96,1664]
] as const;
export type JourneyLevel={chapter:HeritageChapter;number:number;x:number;y:number;zone:1|2|3};
export const journeyLevels:readonly JourneyLevel[]=heritageChapters.map((chapter,index)=>({
 chapter,number:index+1,x:levelPoints[index][0],y:levelPoints[index][1],
 zone:(Math.floor(index/5)+1) as 1|2|3
}));
export const adventureZones=[
 {id:1,title:'Trail of discovery',subtitle:'Chapters 1–5',range:'01—05'},
 {id:2,title:'More to explore',subtitle:'Chapters 6–10',range:'06—10'},
 {id:3,title:'Keep the stories going',subtitle:'Chapters 11–15',range:'11—15'}
] as const;

export function journeyTrailPath(levels:readonly Pick<JourneyLevel,'x'|'y'>[]=journeyLevels):string{
 if(levels.length===0)return '';
 let path='M '+levels[0].x+' '+levels[0].y;
 for(let i=1;i<levels.length;i++){
  const a=levels[i-1],b=levels[i];
  const midway=(a.y+b.y)/2;
  path+=' C '+a.x+' '+midway+', '+b.x+' '+midway+', '+b.x+' '+b.y;
 }
 return path;
}
