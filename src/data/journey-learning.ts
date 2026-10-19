import type {HeritageChapter} from './heritage-journey';
import {lessons} from './learning';
import {sources} from './content';
import {cited,townResearch,festivalsForTown,localityProfiles,festivalProfiles,reviewNotice} from './journey-research';

export type JourneyReaderSection={id:string;title:string;text:string;sourceIds:string[]};
export type JourneyQuestion={id:string;stage:'festival'|'lesson';prompt:string;options:[string,string,string,string];answer:number;explanation:string;sourceIds:string[];sourceSectionId?:string};

const firstSentence=(text:string)=>text.split(/(?<=[.!?])\s+/)[0]?.trim()??text;
const rotate=(question:JourneyQuestion,id:string,index:number):JourneyQuestion=>{
 const seed=id+question.id+String(index);
 const offset=Array.from(seed).reduce((n,c)=>n+c.charCodeAt(0),0)%4;
 const options=question.options.map((_,i)=>question.options[(i+offset)%4]) as JourneyQuestion['options'];
 return {...question,options,answer:(question.answer-offset+4)%4};
};
const asOptions=(correct:string,wrong:string[]):[string,string,string,string]=>{
 const distinct=[correct,...wrong.filter(x=>x&&x!==correct&&!wrong.slice(0,0).includes(x))].filter((x,i,a)=>a.indexOf(x)===i);
 if(distinct.length<4)throw Error('Missing independent distractor options for researched question');
 return distinct.slice(0,4) as [string,string,string,string];
};
const nonlocal=(chapter:HeritageChapter)=>localityProfiles.filter(town=>town.name!==chapter.town);
const localFestivalName=(chapter:HeritageChapter)=>festivalsForTown(chapter.town)[0]?.name??chapter.festivalName;

export function getJourneyReader(chapter:HeritageChapter,stage:'festival'|'lesson'):JourneyReaderSection[]{
 const locality=townResearch(chapter);
 if(!locality)throw Error('Missing locality-specific sourced research: '+chapter.town);
 if(stage==='festival')return locality.sections.map(section=>({
  id:section.id,title:section.title,
  text:section.text,
  sourceIds:cited(section.source_ids)
 }));
 const events=festivalsForTown(chapter.town);
 if(!events.length)throw Error('Missing official festival directory data: '+chapter.town);
 const festivalReadings=events.map(event=>({
  id:'event-'+event.id,title:event.name,
  text:event.description+'\n\nDocumented highlights: '+event.highlights.join('; ')+'. Annual directory reference: '+event.annual_directory_date+
   '. This is NOT a confirmed schedule or proof of community permission. '+event.date_warning,
  sourceIds:cited(event.source_ids)
 }));
 const placesReading:JourneyReaderSection={
  id:'places-'+locality.id,title:'Mga Lugar at Pamanang Makikita',
  text:locality.places.map(place=>place.name+': '+place.context+'.').join('\n\n')+
   '\n\nThese are documented locality leads; confirm current access, exhibit descriptions and community consent with the appropriate organization.',
  sourceIds:cited([...new Set(locality.places.flatMap(x=>x.source_ids).concat(locality.sections[2].source_ids))])
 };
 const context:JourneyReaderSection={
  id:'research-'+locality.id,title:'Verify Stories, Identity and Historical Claims',
  text:locality.identity_and_claim_notes+'\n\n'+(locality.community_review_flags.join(' ')||'Consult the cited source and the relevant community or institution for claims beyond the public record.')+
    '\n\n'+reviewNotice,
  sourceIds:cited([...new Set(locality.sections.flatMap(s=>s.source_ids))])
 };
 return [...festivalReadings,placesReading,context];
}

export function getJourneyQuestions(chapter:HeritageChapter):JourneyQuestion[]{
 const locality=townResearch(chapter);
 if(!locality)throw Error('Missing locality research '+chapter.town);
 const others=nonlocal(chapter),events=festivalsForTown(chapter.town);
 if(!events.length)throw Error('No festivals for '+chapter.town);
 const questions:JourneyQuestion[]=[];
 const sectionKinds=['History','Everyday Life & Environment','Cultural Heritage'] as const;
 locality.sections.forEach((section,index)=>{
  const correct=firstSentence(section.text);
  const distractors=others.filter(x=>x.sections[index]).slice((index*3)%11).map(x=>firstSentence(x.sections[index].text));
  questions.push({id:'v2-'+section.id,stage:'festival',prompt:'Which account is documented for '+chapter.town+' — '+sectionKinds[index]+'?',
   options:asOptions(correct,distractors),answer:0,
   explanation:section.text.slice(0,530),sourceIds:cited(section.source_ids),sourceSectionId:section.id});
 });
 const realPlace=locality.places[0];
 const wrongPlaces=others.flatMap(t=>t.places).map(p=>p.name).filter(n=>n!==realPlace.name);
 questions.push({id:'v2-place-'+locality.id,stage:'festival',
  prompt:'Which heritage place or landmark is actually documented for '+chapter.town+'?',
  options:asOptions(realPlace.name,wrongPlaces),answer:0,
  explanation:realPlace.name+': '+realPlace.context,
  sourceIds:cited(realPlace.source_ids),sourceSectionId:locality.sections[2].id});
 events.forEach((event,eventIndex)=>{
  const different=festivalProfiles.filter(x=>x.municipality!==chapter.town);
  questions.push({id:'v2-festival-'+event.id,stage:'lesson',
   prompt:'Which celebration is listed for '+chapter.town+' in the annual provincial festival directory'+(events.length>1?' (festival '+(eventIndex+1)+' of '+events.length+')':'')+'?',
   options:asOptions(event.name,different.map(f=>f.name)),answer:0,
   explanation:event.description,sourceIds:cited(event.source_ids),sourceSectionId:'event-'+event.id});
 });
 const main=events[0];
 const mainDesc=firstSentence(main.description);
 const otherDescriptions=festivalProfiles.filter(x=>x.municipality!==chapter.town).map(x=>firstSentence(x.description));
 questions.push({id:'v2-theme-'+main.id,stage:'lesson',
  prompt:'Which statement matches the sourced description of '+main.name+'?',
  options:asOptions(mainDesc,otherDescriptions),answer:0,
  explanation:main.description,sourceIds:cited(main.source_ids),sourceSectionId:'event-'+main.id});
 const realPair=realPlace.name+' — '+main.name;
 const wrongPairs=others.slice(0,10).map(t=>t.places[0].name+' — '+localFestivalName({town:t.name,festivalName:'',id:t.id,festivalId:'',lessonId:'',lessonTitle:'',mode:chapter.mode} as HeritageChapter));
 questions.push({id:'v2-connections-'+locality.id,stage:'lesson',
  prompt:'Which documented place and festival belong to the SAME locality ('+chapter.town+')?',
  options:asOptions(realPair,wrongPairs),answer:0,
  explanation:realPlace.name+' and '+main.name+' are both cited in records for '+chapter.town+'.',
  sourceIds:cited([...new Set(realPlace.source_ids.concat(main.source_ids))]),sourceSectionId:'places-'+locality.id});
 const lesson=lessons.find(x=>x.id===chapter.lessonId);
 if(lesson&&lesson.quiz.answers.length>=4)questions.push({id:'v2-matuto-'+locality.id,stage:'lesson',
  prompt:lesson.quiz.prompt,options:lesson.quiz.answers.slice(0,4) as [string,string,string,string],answer:lesson.quiz.correctIndex,
  explanation:lesson.quiz.explanation,sourceIds:lesson.sourceIds,sourceSectionId:'research-'+locality.id});
 return questions.map((question,index)=>rotate(question,chapter.id,index));
}
export const getJourneySourceLinks=(ids:readonly string[])=>ids.map(id=>sources.find(s=>s.id===id)).filter((s):s is NonNullable<typeof s>=>Boolean(s));
