/** Small reviewed, source-linked discovery activities.
 * No invented place details, Indigenous motifs or unsupported image interpretation.
 * The Calapan activity uses a symbolic illustration: source rights for historic city hall photographs are not established here.
 */
export type DiscoveryChoice={id:string;label:string};
export type DiscoveryPrompt={id:string;kind:'observe'|'connect';question:string;choices:readonly DiscoveryChoice[];correctId:string;explanation:string;hint:string;sourceIds:readonly string[]};
export type DiscoveryPack={id:string;town:string;lessonId:string;title:string;subtitle:string;symbol:string;imageId?:string;imageDescription:string;prompts:readonly DiscoveryPrompt[]};
export const interactiveLessons:readonly DiscoveryPack[]=[
 {
  id:'calapan-capital',town:'Calapan City',lessonId:'l1',title:'Find the capital',subtitle:'A visual symbol and two short province-discovery challenges.',symbol:'🏛️',
  imageDescription:'A symbolic city hall illustration. This is not a photograph of Calapan City.',
  prompts:[
   {id:'calapan-identity',kind:'observe',question:'Calapan City is the capital of which province?',choices:[{id:'correct',label:'Oriental Mindoro'},{id:'west',label:'Occidental Mindoro'},{id:'island',label:'Mindoro Island is a province'}],correctId:'correct',explanation:'Oriental Mindoro is a province on Mindoro Island, and Calapan City is its provincial capital.',hint:'Find the word “capital” in the province overview.',sourceIds:['ppdo-general']},
   {id:'calapan-units',kind:'connect',question:'Which statement correctly describes the province’s local government units?',choices:[{id:'15-muni',label:'15 municipalities and another city'},{id:'correct',label:'14 municipalities and one component city'},{id:'14-total',label:'14 municipalities with no component city'}],correctId:'correct',explanation:'The PPDO identifies 14 municipalities and one component city, Calapan.',hint:'Calapan is counted as a component city, not an additional municipality.',sourceIds:['ppdo-general']}
  ]
 },
 {
  id:'baco-mountain',town:'Baco',lessonId:'l14',title:'Observe Mount Halcon',subtitle:'See a documented landscape and practice responsible interpretation.',symbol:'⛰️',imageId:'halcon',
  imageDescription:'Mount Halcon seen from a distance, a credited landscape photograph, not a travel route.',
  prompts:[
   {id:'halcon-look',kind:'observe',question:'What does the documented mountain photograph actually establish?',choices:[{id:'correct',label:'A distant view of Mount Halcon'},{id:'permission',label:'That hiking trails are open today'},{id:'route',label:'A safe route to the summit'}],correctId:'correct',explanation:'The licensed image records the landscape. Trail access, current conditions, and safety require separate verification.',hint:'A still photograph is evidence of a view, not current access conditions.',sourceIds:['tourism']},
   {id:'mahal-tana',kind:'connect',question:'In the tourism portal’s “MAHAL TANA” explanation, what does HAL refer to?',choices:[{id:'correct',label:'Halcon'},{id:'harbor',label:'A harbor'},{id:'festival',label:'An annual parade'}],correctId:'correct',explanation:'The tourism portal connects Mangyan, Halcon, Tamaraw, and Naujan Lake as provincial icons. The phrase is not a description of a single town.',hint:'Read the “Mount Halcon, festivals, and provincial identity” lesson.',sourceIds:['tourism']}
  ]
 },
 {
  id:'puerto-coast',town:'Puerto Galera',lessonId:'l11',title:'Look closer at the coast',subtitle:'Practice careful observation and responsible place discovery.',symbol:'🌊',imageId:'puerto',
  imageDescription:'A credited photograph of White Beach in Puerto Galera viewed from the sea.',
  prompts:[
   {id:'puerto-photo',kind:'observe',question:'What can the credited White Beach photograph responsibly demonstrate?',choices:[{id:'everywhere',label:'Every place in Puerto Galera looks the same'},{id:'correct',label:'One coastal landscape in Puerto Galera'},{id:'access',label:'That every cultural site is open to visitors'}],correctId:'correct',explanation:'The photograph documents White Beach viewed from the sea. It does not represent all of Puerto Galera or current access to other places.',hint:'A single image shows a particular location and viewpoint.',sourceIds:['travel-lakbay']},
   {id:'lakbay-meaning',kind:'connect',question:'According to the provincial tourism portal, what does LAKBAY mean?',choices:[{id:'correct',label:'Travel or journey'},{id:'lake',label:'Freshwater lake'},{id:'peak',label:'Mountain peak'}],correctId:'correct',explanation:'The provincial portal explains that LAKBAY means travel or journey in Filipino and highlights sustainable tourism.',hint:'Check the opening of “LAKBAY and sustainable tourism.”',sourceIds:['travel-lakbay']}
  ]
 }
];
export function interactiveLessonFor(id:string|undefined){return interactiveLessons.find(x=>x.lessonId===id);}
export function isDiscoveryAnswerCorrect(prompt:DiscoveryPrompt,id:string){return prompt.choices.some(c=>c.id===id)&&prompt.correctId===id;}
export type DiscoveryStored={version:1;packId:string;completedAt:string};
export function validDiscoveryRecord(raw:unknown,pack:DiscoveryPack):raw is DiscoveryStored {
 if(!raw||typeof raw!=='object')return false;
 const obj=raw as Record<string,unknown>;
 return obj.version===1&&obj.packId===pack.id&&typeof obj.completedAt==='string'&&!Number.isNaN(Date.parse(obj.completedAt));
}
