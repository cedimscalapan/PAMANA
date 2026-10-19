import { destinations } from './destinations';
import {heritageChapters} from './heritage-journey';
import {getJourneyQuestions} from './journey-learning';
import {localityProfiles,festivalProfiles,cited,getTownLink} from './journey-research';

export type GameMode = 'map' | 'photo' | 'timeline' | 'sort' | 'word' | 'memory' | 'quiz';
export type GameLevel = 'gentle' | 'challenge';
export type GameItem = { id: string; label: string; detail: string; sourceIds: string[]; link: string; imageId?: string; group?: string; date?: number; latitude?: number; longitude?: number };
export type GameRound = { id: string; mode: GameMode; prompt: string; hint: string; explanation: string; items: GameItem[]; answer?: string; sourceIds: string[]; link: string };
export const gameModes: { id: GameMode; name: string; verb: string; description: string; instruction: string; symbol: string; tone: string }[] = [
  { id: 'map', name: 'Map Explorer', verb: 'Find a place', description: 'Connect a destination with its place on Mindoro.', instruction: 'Choose the lettered point for the named destination. You can use the map or the coordinate list below it.', symbol: '↗', tone: 'blue' },
  { id: 'photo', name: 'Photo Detective', verb: 'Look a little closer', description: 'Read clues in properly credited documentary photographs.', instruction: 'Look at the photograph and choose the precise place or subject it shows. Sources are available for open-book play.', symbol: '◉', tone: 'amber' },
  { id: 'timeline', name: 'Timeline Challenge', verb: 'Put history in order', description: 'Build a chronology from documented milestones.', instruction: 'Move the cards from earliest to latest using the up and down buttons. Events in the same year may appear in either order.', symbol: '↕', tone: 'purple' },
  { id: 'sort', name: 'Sort & Discover', verb: 'Make the connections', description: 'Match real heritage places and festival records with their documented hometown.', instruction: 'Use each card’s menu to choose its municipality. Check the whole set when every card has a group.', symbol: '▦', tone: 'green' },
  { id: 'word', name: 'Word Builder', verb: 'Follow the clue', description: 'Build Mindoro place names and documented heritage terms from clues.', instruction: 'Tap the letter tiles in order. Tap an answer tile to return it, or use Undo. Repeated letters have separate tiles.', symbol: 'Aa', tone: 'brown' },
  { id: 'memory', name: 'Memory Pairs', verb: 'Look, remember, connect', description: 'Match documentary pictures with their precise names.', instruction: 'Reveal two cards at a time: match a photograph to its name. After a mismatch, turn the cards back before continuing.', symbol: '◫', tone: 'red' },
  { id: 'quiz', name: 'Knowledge Check', verb: 'The classic quiz', description: 'Apply source-linked facts from all 15 hometowns at your own pace.', instruction: 'Choose one answer about an actual municipality or city. Check the explanation and source before moving on. No timer.', symbol: '?', tone: 'blue' },
];

const item = (id: string, label: string, detail: string, sourceIds: string[], link: string, extra: Partial<GameItem> = {}): GameItem => ({ id, label, detail, sourceIds, link, ...extra });
export const photoItems: GameItem[] = [
  item('puerto','White Beach, Puerto Galera','The original image record identifies White Beach seen from the sea, rather than Muelle waterfront.', ['tourism'], '/explore?place=puerto-galera',{imageId:'puerto'}),
  item('naujan','Naujan Lake','The original image record identifies Naujan Lake. It is a freshwater wetland, not a sea-facing beach.', ['travel-naujan'], '/explore?place=naujan-lake',{imageId:'naujan'}),
  item('halcon','Mount Halcon','The original image record identifies Mount Halcon, photographed at a distance.', ['tourism'], '/explore?place=mount-halcon',{imageId:'halcon'}),
  item('tamaraw','Tamaraw · Bubalus mindorensis','Gregg Yan’s original record identifies Bubalus mindorensis, the Mindoro-endemic tamaraw.', ['denr-tamaraw'], '/learn?lesson=l13',{imageId:'tamaraw'}),
  item('muelle-port','Muelle waterfront, Puerto Galera','The original record documents the Muelle port and waterfront in April 2023. White Beach is a different location.', ['destination-muelle-cultural-heritage-park'], '/explore?place=muelle-cultural-heritage-park',{imageId:'muelle-port'}),
  item('calapan-hall','Calapan City Hall','The photograph shows the City Hall building, not the Oriental Mindoro Heritage Museum.', ['ppdo-general'], '/explore?place=calapan',{imageId:'calapan-hall'}),
  item('calapan-port','Port of Calapan entrance','The original record describes the entrance gate to the port, photographed in December 2012.', ['ppdo-general'], '/collection?photo=calapan-port',{imageId:'calapan-port'}),
];
export const timelineItems: GameItem[] = [
  item('gardner-1904','Gardner’s earliest documented collecting','The provenance guide places Gardner’s early collecting activity at least as far back as 1904; it does not securely date every Set 1 object to that year.', ['loc-provenance'], '/learn?lesson=l10',{date:1904}),
  item('research-1938','Gardner renews the script study','A study begun in 1938 developed through collaboration with Ildefonso and Eusebio Maliwanag.', ['loc-provenance'], '/learn?lesson=l10',{date:1938}),
  item('indic-1939','Indic Writings begins publication','The three-volume publication appeared in 1939–1940; this card uses its first publication year.', ['loc-introduction'], '/learn?lesson=l10',{date:1939}),
  item('act-1950','RA 505 is approved','Approved 13 June 1950; the division took effect on 15 November. This game compares years, so both 1950 cards can be in either order.', ['ra505'], '/learn?lesson=l14',{date:1950}),
  item('effect-1950','The provincial division takes effect','Proclamation 186 fixed 15 November 1950 as the effective date. This game compares years, not dates within a year.', ['proc186'], '/learn?lesson=l14',{date:1950}),
  item('park-1956','Naujan Lake’s national park proclamation','The Ramsar information sheet records Proclamation 282 dated 27 March 1956.', ['ramsar-naujan'], '/learn?lesson=l12',{date:1956}),
  item('park-1968','The park proclamation is amended','The historical Ramsar sheet records Proclamation 335 dated 25 January 1968.', ['ramsar-naujan'], '/learn?lesson=l12',{date:1968}),
  item('bibliography-1988','Postma’s annotated bibliography is published','The Mangyan Heritage Center records publication in 1988.', ['mhc-library'], '/learn?lesson=l10',{date:1988}),
  item('ginaw-1993','Ginaw Bilog receives GAMABA recognition','NCCA identifies the Hanunuo Mangyan poet with the 1993 National Living Treasures award.', ['ncca-ginaw'], '/learn?lesson=l8',{date:1993}),
  item('submission-1998','Philippine Paleographs is submitted to UNESCO','UNESCO distinguishes the submission year, 1998, from registration in 1999.', ['unesco-paleographs'], '/learn?lesson=l6',{date:1998}),
  item('registration-1999','Philippine Paleographs enters the register','UNESCO lists registration in 1999. The inscription covers Hanunoo, Buid, Tagbanua and Pala’wan.', ['unesco-paleographs'], '/learn?lesson=l6',{date:1999}),
  item('bamboo-whispers-2017','Bamboo Whispers is published','The Center records the book’s 2017 publication in two scripts and four languages.', ['mhc-library'], '/learn?lesson=l7',{date:2017}),
  item('census-2024','2024 POPCEN reference date','The Oriental Mindoro population count refers to 1 July 2024, even though the release was published in 2025.', ['psa-2024'], '/learn?lesson=l3',{date:2024}),
];
type WordEntry = [word: string, clue: string, explanation: string, sourceIds: string[], lesson: string];
export const wordItems: GameItem[] = ([
  ['AMBAHAN','A Hanunuo Mangyan poetic form with seven-syllable lines.','NCCA describes ambahan’s seven-syllable form and figurative messages.',['ncca-ginaw'],'l7'],
  ['PAMUDPOD','The modern Hanunó’o sign that marks vowel absence.','Unicode identifies HANUNOO SIGN PAMUDPOD at U+1734.',['unicode','hanunoo'],'l6'],
  ['ABUGIDA','A writing system whose consonant letters normally carry an inherent vowel.','The Hanunó’o orthography notes describe the script as an abugida.',['hanunoo'],'l5'],
  ['BARANGAY','An administrative unit within a Philippine municipality or city.','The province’s profile lists 426 barangays.',['ppdo-general'],'l1'],
  ['CALAPAN','The city identified by PPDO as Oriental Mindoro’s capital.','Calapan is the provincial capital and the province’s component city.',['ppdo-general'],'l1'],
  ['MIMAROPA','The region also called Region IV-B.','The PPDO locates Oriental Mindoro in MIMAROPA.',['ppdo-general'],'l1'],
  ['TAMARAW','Mindoro’s endemic wild buffalo, Bubalus mindorensis.','The tamaraw is distinct from a generic domestic water buffalo.',['denr-tamaraw'],'l13'],
  ['NAUJAN','Complete the lake name: ___ Lake, bordered by four municipalities.','The provincial lake reference names Naujan, Victoria, Socorro and Pola.',['travel-naujan'],'l12'],
  ['LAKBAY','The Filipino word the tourism portal explains as travel or journey.','The official portal uses LAKBAY as its travel identity.',['travel-lakbay'],'l11'],
  ['CENSUS','An official enumeration of a population.','The 2024 POPCEN is a census, with a defined reference date.',['psa-2024'],'l3'],
  ['PROVENANCE','The documented history of where a collection or object came from.','The Library of Congress guide follows contributors, collecting dates and uncertainties.',['loc-provenance'],'l10'],
  ['BURI','The palm leaf used for the Hanunuo bag described by the Center.','The Center describes narrow buri-leaf strips in bay-ong sinuluyan.',['mhc-crafts'],'l4'],
] as WordEntry[]).map(([word,clue,detail,sourceIds,lesson])=>item(`word-${word.toLowerCase()}`,word,detail,sourceIds,`/learn?lesson=${lesson}`,{group:clue})).concat(
 localityProfiles.map(town=>item('research-word-'+town.id,town.name.toUpperCase().replace(/[^A-Z]/g,''),
 'Town clue: '+town.lead+' The answer is an official city or municipality name.',
 cited(town.sections[0].source_ids),getTownLink(town.name),{group:town.lead}))
);

export const mapItems: GameItem[] = destinations.filter(place=>!place.protectedCommunity && place.latitude !== undefined && place.longitude !== undefined).map(place=>item(`map-${place.id}`,place.name,`${place.name} is listed at ${place.address}. The point is the publisher’s location reference, not a verified entrance.`,place.sourceIds,`/explore?place=${place.id}`,{group:place.municipality,latitude:place.latitude,longitude:place.longitude}));
/** Locality-specific place/festival sorting: no invented GPS or ethnic boundaries. */
export const sortingItems:GameItem[]=[
 ...localityProfiles.flatMap(town=>town.places.map((place,index)=>item('research-place-'+town.id+'-'+index,
  place.name,place.name+': '+place.context,cited(place.source_ids),getTownLink(town.name),{group:town.name}))),
 ...festivalProfiles.map(festival=>item('research-festival-'+festival.id,festival.name,
  festival.description,cited(festival.source_ids),getTownLink(festival.municipality),{group:festival.municipality})),
];
/** Source-anchored quiz bank covers ALL 15 localities, not just reusable province-wide trivia. */
export const localityQuestQuestions=heritageChapters.flatMap(chapter=>getJourneyQuestions(chapter).map(question=>({
 ...question,id:chapter.id+'-'+question.id,town:chapter.town,link:'/journey/activity?town='+chapter.id+'&step=festival'
})));


export function shuffle<T>(items: T[], random = Math.random): T[] {
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){const j=Math.min(i,Math.max(0,Math.floor(random()*(i+1))));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
export function freshItems(pool: GameItem[], count: number, recent: string[], random = Math.random): GameItem[] {
  return [...shuffle(pool.filter(item=>!recent.includes(item.id)),random),...shuffle(pool.filter(item=>recent.includes(item.id)),random)].slice(0,count);
}
export function createRounds(mode: GameMode, level: GameLevel, recent: string[] = [], random = Math.random): GameRound[] {
  const size=level==='gentle'?3:5;
  const wrap=(id:string,prompt:string,hint:string,items:GameItem[],explanation:string,answer?:string):GameRound=>({id,mode,prompt,hint,items,explanation,answer,sourceIds:[...new Set(items.flatMap(item=>item.sourceIds))],link:items.find(item=>item.id===answer)?.link??items[0].link});
  if(mode==='quiz'){
    // Locality-based questions are derived from the actual sourced Journey readings.
    // Free-play results remain independent from Journey stamp eligibility.
    const targets=localityQuestQuestions.map(question=>item(question.id,question.prompt,
     question.explanation,question.sourceIds,question.link));
    return freshItems(targets,size,recent,random).map(target=>{
     const q=localityQuestQuestions.find(question=>question.id===target.id)!;
     const options=shuffle(q.options.map((answer,index)=>item(q.id+'-choice-'+index,answer,
      q.explanation,q.sourceIds,q.link)),random);
     return wrap(q.id,q.prompt,'This question is about '+q.town+'. Open its source notes or revisit the hometown chapter before checking.',
      options,q.explanation,q.id+'-choice-'+q.answer);
    });
  }
  if(mode==='photo') return freshItems(photoItems,size,recent,random).map(target=>{
    const options=shuffle([target,...shuffle(photoItems.filter(item=>item.id!==target.id),random).slice(0,3)],random);
    return wrap(`photo-${target.id}`,'What does this photograph document?',target.detail,options,target.detail,target.id);
  });
  if(mode==='map') return freshItems(mapItems,size,recent,random).map(target=>{
    const distance=(a:GameItem,b:GameItem)=>Math.hypot(a.longitude!-b.longitude!,a.latitude!-b.latitude!);
    const options=[target];
    // Keep map markers distinguishable. Exclude nearby points rather than inventing offsets.
    for(const candidate of shuffle(mapItems.filter(item=>item.id!==target.id),random)) if(options.length<4&&options.every(item=>distance(item,candidate)>.16))options.push(candidate);
    return wrap(`map-${target.id}`,`Find ${target.label}.`,`The official address is in ${target.group}. Compare the latitude and longitude in the source or use the coordinate choices.`,shuffle(options,random),target.detail,target.id);
  });
  if(mode==='word')return freshItems(wordItems,size,recent,random).map(target=>wrap(target.id,target.group!,`The term begins with ${target.label[0]} and has ${target.label.length} letters. ${target.detail}`,[target],target.detail,target.label));
  if(mode==='memory') {
    const chosen=freshItems(photoItems,level==='gentle'?3:5,recent,random);
    return [wrap('memory-board','Match each picture with its name.','Look for the coast, mountain, lake, wildlife, or named building. You can keep image sources open while playing.',chosen,'These matches use each photograph’s original source description, rather than guessing a community from appearance.')];
  }
  if(mode==='timeline'){
    const chosen=freshItems(timelineItems,level==='gentle'?4:6,recent,random);
    return [wrap('timeline-board','Arrange the milestones by year.','The earliest year is '+Math.min(...chosen.map(item=>item.date!))+'. Dates are revealed after checking; ties are accepted in either order.',shuffle(chosen,random),'Order by the documented year. Publication, approval, effectivity and registration describe different events.')];
  }
  const chosen=freshItems(sortingItems,level==='gentle'?4:6,recent,random);
  return [wrap('sort-board','Give every record its municipality.',`The first card belongs to ${chosen[0].group}. Use Lakbay to check other localities.`,shuffle(chosen,random),'Match the directory’s municipality, keeping a festival’s listed locality distinct from the places its participants may come from.')];
}
