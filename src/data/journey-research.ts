import research from './heritage-research-v1.json';
import type {HeritageChapter} from './heritage-journey';
export type ResearchSection={id:string;category:'history'|'livelihood_environment'|'tangible_intangible_heritage';title:string;text:string;source_ids:string[];claim_status:string};
export type ResearchPlace={name:string;context:string;source_ids:string[]};
export type ResearchLocality={id:string;name:string;kind:'city'|'municipality';lead:string;sections:ResearchSection[];places:ResearchPlace[];identity_and_claim_notes:string;community_review_flags:string[];festival_ids:string[];tourism_page:string;history_url:string};
export type ResearchFestival={id:string;name:string;municipality:string;annual_directory_date:string;description:string;highlights:string[];source_ids:string[];source_urls:string[];date_warning:string};
export const heritageResearch=research;
export const localityProfiles=research.localities as ResearchLocality[];
export const festivalProfiles=research.festivals as ResearchFestival[];
export const cited=(ids:readonly string[])=>ids.map(id=>'research-'+id);
export const localityById=(id:string)=>localityProfiles.find(x=>x.id===id);
export const localityByTown=(name:string)=>localityProfiles.find(x=>x.name===name);
export const festivalById=(id:string)=>festivalProfiles.find(x=>x.id===id);
export const festivalsForTown=(name:string)=>festivalProfiles.filter(x=>x.municipality===name);
export const sourceNames=Object.entries(research.sources).map(([id,s])=>({id:'research-'+id,title:s.title,publisher:s.publisher,url:s.url,
 status:'Researched draft · verify/local review',use:'Public source reference; check its claims and community-consent requirements before release.'}));
/** Optional public context only; entries awaiting local/community review must be labelled as such. */
export const reviewNotice='Researched draft: the source publisher is linked for verification. Community-specific beliefs, rituals, personal records and oral histories require appropriate local/community review and permission.';
export const getTownLink=(name:string)=>'/journey?town='+encodeURIComponent(localityByTown(name)?.id??'');
export const townResearch=(chapter:HeritageChapter)=>localityByTown(chapter.town);
