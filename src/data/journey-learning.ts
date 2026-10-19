import {heritageChapters,type HeritageChapter} from './heritage-journey';
import {officialFestivals} from './official-heritage';
import {lessonArticles} from './lesson-articles';
import {lessons} from './learning';
import {sources} from './content';
import {localityCulture,commonCulture} from './journey-culture';

/** Source-aware original explanations of the public festival listings.
 * Claims here concern official public celebrations, not Indigenous community permission or ritual authority.
 * Review underlying provincial source pages before public release.
 */
const deepContext:Record<string,[string,string]>={
 banana:['The provincial description identifies bananas as an important local agricultural product. It names lupakan, harana and pandangguhan as examples of the festival program, demonstrating that harvest celebrations can include food, music and performance.','Look for the link between growing bananas and giving thanks for local livelihoods. The names of the listed activities come from the public festival page; ask organizers before assigning any undocumented meaning to a particular performance.'],
 basudani:['The official tourism entry frames Bansud’s celebration as thanksgiving for a plentiful harvest. Its community street-dance activity involves different municipal sectors, linking agricultural labor with public participation.','Pay attention to the difference between a documented harvest theme and claims about an individual group’s customs. The festival listing identifies community participation but cannot establish what every performer intends to represent.'],
 sulyog:['The official account explains Sulyog through the agricultural themes of banana and coconut. It connects the name with the terms suli and niyog, and describes a street-dance competition involving the town.','Compare two crops, banana and coconut, rather than assuming that every Oriental Mindoro harvest festival celebrates the same produce. Festival names should be explained using the organizer’s source.'],
 biniray:['The official provincial background associates Biniray with settlers from Panay and the feast of Saints Peter and Paul. Maritime livelihoods and gratitude for the sea are central to its public explanation.','A procession related to the coast belongs to a particular town and religious context. Distinguish the coastal setting, patron-saint observance and organizers’ current program rather than treating every sea festival alike.'],
 'pandang-gitab':['The provincial portal calls Pandang Gitab the province’s Festival of Lights. Its published overview emphasizes thanksgiving, street dancing and a shared expression of hope and unity among localities.','Light is a documented public theme in this festival, but costumes and performances may have more particular meanings. An annual calendar entry does not confirm this year’s procession times or venue.'],
 'mangyan-festival':['Mansalay’s official festival publicly recognizes the town’s Mangyan residents and the importance of Indigenous cultural heritage. Public festival presentations are not a substitute for the voices of each distinct Mangyan community.','Separate what the organizer advertises from what members of a community choose to share. Songs, designs, performances and recordings may require consent or additional explanation before reuse.'],
 kawayanan:['The festival’s provincial background links Gloria with bamboo-growing areas as well as rice and coconut farming. Its focus is bamboo and the material’s roles in everyday life, including public product displays.','A bamboo-themed display can start a conversation about farming and local materials. Do not infer a craft’s maker, specific Indigenous origin, or ceremonial meaning from its material alone.'],
 dabalistihit:['The provincial explanation spells out the title using dalag, banak, banglis, tilapia and hito. Costumes and props refer to freshwater fish associated with Naujan Lake, so the public celebration also provides a starting point for wetland learning.','Differentiate the festival’s fish symbols from a scientific species survey. The official list explains the meaning of the festival name; environmental conditions require separate up-to-date evidence.'],
 bahaghari:['The local celebration uses a rainbow theme, which the provincial page connects to Pinamalayan’s history and shared identity. Street dancing and colorful public presentations are among the listed highlights.','The rainbow is the theme described by the organizer. A festival summary is a doorway to deeper town history, not enough evidence to invent a folktale or interpretation of individual costumes.'],
 'sab-uyan':['The official entry connects the celebration to the feast of Saint John the Baptist and a procession from the church to the sea. Its religious and coastal setting distinguishes it from agricultural thanksgiving festivals.','Respect the local religious observance and follow organizer guidance on photography and access. Read the public description carefully rather than inventing meanings for sacred objects or activities.'],
 'kaaldawan-iraya':['The provincial page describes a public celebration recognizing Iraya cultural heritage. It lists dances, games, songs, folktales and street dancing among public presentations.','Iraya identity should not be blended with all other Mangyan groups. Publicly advertised activities do not automatically give visitors permission to record, copy or recreate community cultural works.'],
 sipag:['The tourism entry describes Roxas as an important trade and commerce center for southern Oriental Mindoro. It connects the name SIPAG to industry and agricultural products including rice and several fruits.','Look for the connection between agriculture, selling products and the town’s public identity. This is an account of the municipality’s celebration, not a claim that each family has the same livelihood.'],
 masayaw:['The official festival page emphasizes the faith, local culture, unity and joyful participation of San Teodoro residents. Its public descriptions include street dances and community activities.','The theme of celebration is stated by the organizer. Confirm the current schedule and do not infer ritual details from a brief festival calendar or an artistic costume.'],
 'pakapya-agtike':['The provincial portal presents Socorro’s official festival through harvest thanksgiving and cultural presentations, including street dancing. It refers to Tadyawan Mangyan cultural context; meaningful interpretations should be reviewed with the communities concerned.','A public festival listing does not provide a script for an Indigenous ritual. Learn the organizer’s documented description while respecting community voices, consent, and limits on recording or reproduction.'],
 kapakyanan:['The provincial entry highlights Victoria’s citrus, fruits, rice and other agricultural production. Agricultural fairs, exhibits and dancing appear in its published highlights, connecting growing and trade with civic celebration.','Distinguish the town’s fruit and crop themes from the freshwater ecology of neighboring Naujan Lake. Both are part of local geography, but a festival display is not a claim about every resident’s work.']
};
/** Reviewed, meaningful checks of Matuto article facts (not section headings). */
const lessonInsights:Record<string,{prompt:string;options:[string,string,string,string];explanation:string}>={
 l1:{prompt:'How does the PPDO count Oriental Mindoro\'s local government units?',options:['14 municipalities and one component city','15 municipalities and one extra city','14 cities and one municipality','Only the capital city'],explanation:'The province has 14 municipalities and one component city, Calapan, for 15 city-and-municipality units.'},
 l4:{prompt:'What is the respectful way to understand the term Mangyan?',options:['As an umbrella term for distinct Indigenous peoples','As a single language spoken identically by everyone','As one festival with a single tradition','As a name for one town only'],explanation:'The NCCA introduces Mangyan as a generic term for communities with different names, languages and cultural practices.'},
 l11:{prompt:'What should you do with an offline tourism directory before planning a real visit?',options:['Check current access and local guidance with responsible sources','Assume every route and schedule is unchanged','Enter protected areas whenever they appear in an app','Treat every entry as a confirmed live event'],explanation:'The Matuto lesson explains that official listings help discovery but do not replace current travel and community guidance.'},
 l12:{prompt:'Why does the Matuto lesson describe Naujan Lake as more than a scenic viewpoint?',options:['It is a connected wetland, habitat and livelihood landscape','It is only a saltwater beach','It has no conservation importance','Only one town is connected with its waters'],explanation:'The source-backed lesson explains Naujan Lake National Park and the wetland connections among water, wildlife and neighboring communities.'},
 l14:{prompt:'Which pair of dates is distinguished in Oriental Mindoro\'s administrative history?',options:['June 13, 1950 approval and November 15, 1950 effectivity','June 13, 1950 founding of all Mangyan cultures','November 15, 1950 approval and June 13, 1950 effectivity','Both approval and effectivity were in 1993'],explanation:'Republic Act 505 was approved in June 1950, and Proclamation 186 set the division\'s effectivity in November 1950.'},
 l16:{prompt:'What can an annual festival calendar NOT confirm on its own?',options:['A particular year\'s venue, program or activities','Which municipality the directory associates with a festival','That the directory publishes recurring dates','The name recorded in the directory'],explanation:'The Matuto reading distinguishes annual observance dates from the verified schedule and activities of a specific year.'}
};
export type JourneyReaderSection={id:string;title:string;text:string;sourceIds:string[]};
export type JourneyQuestion={id:string;stage:'festival'|'lesson';prompt:string;options:[string,string,string,string];answer:number;explanation:string;sourceIds:string[]};
export const getJourneyReader=(chapter:HeritageChapter,stage:'festival'|'lesson'):JourneyReaderSection[]=>{
 if(stage==='lesson'){
  const lesson=lessons.find(l=>l.id===chapter.lessonId);
  const article=lessonArticles[chapter.lessonId];
  if(!lesson||!article)throw Error('Missing reviewed Matuto material');
  const festival=officialFestivals.find(f=>f.id===chapter.festivalId)!;
  const contextual:JourneyReaderSection={id:'lesson-connection',title:'Connect '+chapter.town+' with the bigger picture',
   text:'The Oriental Mindoro Provincial Tourism Office lists '+festival.name+' for '+chapter.town+'. Its published festival account explains: '+festival.description+' The linked Matuto lesson, "'+lesson.title+'", adds broader context from its own sources. One important idea to keep in mind is: '+lesson.points[0]+' Study this distinction: the festival entry tells you what the public organizers describe, while the Matuto lesson helps you ask deeper historical, geographic, environmental or cultural questions. Neither reference grants permission to invent community practices or assume that a published annual event calendar gives live travel details.',
   sourceIds:[...new Set([...festival.sourceIds,...lesson.sourceIds])]};
  return [contextual,...article.sections.map((s,index)=>({id:'lesson-'+index,title:s.heading,text:s.text,sourceIds:lesson.sourceIds}))];
 }
 const festival=officialFestivals.find(f=>f.id===chapter.festivalId);
 if(!festival)throw Error('Missing reviewed festival');
 const notes=deepContext[festival.id];
 if(!notes)throw Error('No sourced hometown context: '+festival.id);
 const date=new Date(Date.UTC(2000,festival.month-1,festival.day)).toLocaleDateString('en-PH',{month:'long',day:'numeric',timeZone:'UTC'});
 const src=festival.sourceIds;
 return [
  {id:'festival-0',title:'Meet '+festival.name,text:festival.description,sourceIds:src},
  {id:'festival-1',title:'Why this festival matters',text:notes[0],sourceIds:src},
  {id:'festival-2',title:'What the official program highlights',text:
   'The provincial tourism listing associates '+festival.name+' with '+(festival.highlights??[]).join(', ')+'. These are public background highlights, not a verified schedule for a particular year. The festival is listed for '+date+' in '+festival.municipality+'. Confirm the current program with organizers before attending.',sourceIds:src},
  {id:'festival-3',title:'Look closer and respect the context',text:notes[1]+' Read the linked source alongside any photograph or performance you encounter. Public festival descriptions do not automatically authorize reproduction of community-sensitive designs, songs, or stories.',sourceIds:src},
  ...(localityCulture[chapter.town]??[]).map(topic=>({id:topic.id,title:topic.title,text:topic.text,sourceIds:topic.sourceIds})),
  ...commonCulture.map(topic=>({id:topic.id,title:topic.title,text:topic.text,sourceIds:topic.sourceIds}))
 ];
};
export function getJourneyQuestions(chapter:HeritageChapter):JourneyQuestion[]{
 const festival=officialFestivals.find(f=>f.id===chapter.festivalId)!;
 const lesson=lessons.find(l=>l.id===chapter.lessonId)!;
 const article=lessonArticles[chapter.lessonId];
 const otherFestivals=heritageChapters.filter(c=>c.id!==chapter.id).map(c=>c.festivalName).filter(x=>x!==festival.name);
 const others=[otherFestivals[0],otherFestivals[4],otherFestivals[8]];
 const otherTowns=heritageChapters.filter(c=>c.town!==chapter.town).map(c=>c.town);
 const answers=[chapter.town,otherTowns[2],otherTowns[6],otherTowns[10]] as [string,string,string,string];
 const highlights=festival.highlights??[];
 const highlight=highlights[0]??festival.name;
 const fakeHighlights=heritageChapters.filter(c=>c.id!==chapter.id)
  .map(c=>officialFestivals.find(f=>f.id===c.festivalId)?.highlights?.[0]??'')
  .filter(s=>!!s&&s!==highlight&&!highlights.includes(s));
 const key=lesson.points[0];
 const distractors=lessons.filter(l=>l.id!==lesson.id).map(l=>l.points[0]).filter(p=>p!==key);
 const insight=lessonInsights[chapter.lessonId];
 if(!insight)throw Error('Missing reviewed Matuto comprehension check for '+chapter.lessonId);
 const base:JourneyQuestion[]=[
  {id:'festival-name',stage:'festival',prompt:'Which festival was documented for '+chapter.town+' in your first reading?',
   options:[festival.name,...others] as [string,string,string,string],answer:0,explanation:'Your first reading was about '+festival.name+' in '+chapter.town+'.',sourceIds:festival.sourceIds},
  {id:'festival-highlight',stage:'festival',prompt:'Which public highlight is listed for '+festival.name+'?',
   options:[highlight,...fakeHighlights.slice(0,3)] as [string,string,string,string],answer:0,
   explanation:'The source-backed festival reading lists '+highlights.join(', ')+'.',sourceIds:festival.sourceIds},
  {id:'festival-place',stage:'festival',prompt:'Which hometown is linked with '+festival.name+' in the official festival directory?',
   options:answers,answer:0,explanation:festival.name+' is linked with '+chapter.town+' in the provincial directory.',sourceIds:festival.sourceIds},
  {id:'lesson-check',stage:'lesson',prompt:lesson.quiz.prompt,
   options:lesson.quiz.answers.slice(0,4) as [string,string,string,string],answer:lesson.quiz.correctIndex,
   explanation:lesson.quiz.explanation,sourceIds:lesson.sourceIds},
  {id:'lesson-key',stage:'lesson',prompt:'Which idea was explained in the Matuto lesson "'+lesson.title+'"?',
   options:[key,...distractors.slice(0,3)] as [string,string,string,string],answer:0,
   explanation:'The linked Matuto lesson explains: '+key,sourceIds:lesson.sourceIds},
  {id:'lesson-insight',stage:'lesson',prompt:insight.prompt,
   options:insight.options,answer:0,explanation:insight.explanation,sourceIds:lesson.sourceIds},
  ...(localityCulture[chapter.town]??[]).map(topic=>topic.question),
  ...commonCulture.map(topic=>topic.question)
 ];
 // Stable per-chapter variation: correct answers are never always in slot A,
 // while saved question IDs and option ordering remain identical after app restart.
 return base.map((question,index)=>{
  const seed=[chapter.id,question.id,String(index)].join('-');
  const offset=Array.from(seed).reduce((total,char)=>total+char.charCodeAt(0),0)%4;
  return {...question,options:question.options.map((_,i)=>question.options[(i+offset)%4]) as [string,string,string,string],
   answer:(question.answer-offset+4)%4};
 });
}
export const getJourneySourceLinks=(ids:readonly string[])=>ids.map(id=>sources.find(s=>s.id===id)).filter((s):s is NonNullable<typeof s>=>Boolean(s));
