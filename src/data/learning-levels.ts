/** Learning preferences, not age restrictions or diagnoses. */
export const learningStages=[{id:'little',name:'Little Explorer',detail:'Short facts and pictures'},{id:'young',name:'Young Discoverer',detail:'Guided discovery and short readings'},{id:'researcher',name:'Heritage Researcher',detail:'Extended reading and reflection'},{id:'lifelong',name:'Lifelong Explorer',detail:'Full cultural library'}] as const;
export type LearningStage=typeof learningStages[number]['id'];
export const isLearningStage=(value:unknown):value is LearningStage=>typeof value==='string'&&learningStages.some(s=>s.id===value);
/** Limits the number of existing reviewed paragraphs; does not paraphrase or change factual meaning. */
export function getReadingPlan(stage:LearningStage,sections:number,terms:number){
 if(stage==='little')return {sections:Math.min(1,sections),terms:Math.min(2,terms),showReflection:false};
 if(stage==='young')return {sections:Math.min(2,sections),terms:Math.min(4,terms),showReflection:false};
 return {sections,terms,showReflection:true};
}
