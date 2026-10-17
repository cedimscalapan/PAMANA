export type HeritageStamp={id:string;title:string;emoji:string;requirement:string;earned:boolean};
export function deriveHeritageStamps(lessonCount:number,questCount:number):HeritageStamp[]{
 return [
  {id:'first-reading',title:'Curious Reader',emoji:'📖',requirement:'Explore your first lesson',earned:lessonCount>=1},
  {id:'heritage-reader',title:'Heritage Reader',emoji:'🌿',requirement:'Explore 5 heritage lessons',earned:lessonCount>=5},
  {id:'library-explorer',title:'Mindoro Scholar',emoji:'📚',requirement:'Explore all 16 lessons',earned:lessonCount>=16},
  {id:'first-quest',title:'First Quest',emoji:'✨',requirement:'Complete a cultural Quest',earned:questCount>=1},
  {id:'quest-explorer',title:'Quest Explorer',emoji:'🧭',requirement:'Complete 5 cultural Quests',earned:questCount>=5},
  {id:'quest-veteran',title:'Heritage Adventurer',emoji:'🏅',requirement:'Complete 10 cultural Quests',earned:questCount>=10}
 ];
}
