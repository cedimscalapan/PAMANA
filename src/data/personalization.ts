import {festivalThemes,isMunicipality,resolveTheme,themeForHometown} from './festival-themes';
import {isLearningStage,type LearningStage} from './learning-levels';
export type AvatarId='mascot'|'leaf'|'star'|'book'|'art';
export type LocalProfile={version:1;id:'local';nickname:string;hometown:string;avatar:AvatarId;favoriteFestivalId:string;themeId:string;learningStage:LearningStage;mode:'system'|'light'|'dark';textSize:'small'|'default'|'large'|'extra-large';reducedMotion:boolean;language:'en'|'fil'};
export const PROFILE_KEY='pamana.profile.v1';
export const defaultProfile:LocalProfile={version:1,id:'local',nickname:'Ka-Pamana',hometown:'',avatar:'mascot',favoriteFestivalId:'',themeId:'heritage',learningStage:'lifelong',mode:'light',textSize:'default',reducedMotion:false,language:'en'};
const oneOf=<T extends string>(v:unknown,options:readonly T[],fallback:T):T=>typeof v==='string'&&options.includes(v as T)?v as T:fallback;
export function sanitizeProfile(input:unknown):LocalProfile{
 const p:Record<string,unknown>=input&&typeof input==='object'&&!Array.isArray(input)?input as Record<string,unknown>:{};
 const nickname=typeof p.nickname==='string'?p.nickname.trim().slice(0,32):'';
 const hometown=isMunicipality(p.hometown)?p.hometown:'';
 return {version:1,id:'local',nickname:nickname||'Ka-Pamana',hometown,
  avatar:oneOf(p.avatar,['mascot','leaf','star','book','art'] as const,'mascot'),
  favoriteFestivalId:typeof p.favoriteFestivalId==='string'&&festivalThemes.some(t=>t.id===p.favoriteFestivalId&&t.municipality)?p.favoriteFestivalId:'',
  themeId:typeof p.themeId==='string'?resolveTheme(p.themeId).id:themeForHometown(hometown).id,
  learningStage:isLearningStage(p.learningStage)?p.learningStage:'lifelong',
  // Soft Light is the sole display mode in this release; old 'dark'/'system' preferences are safely normalized.
  mode:'light',
  textSize:oneOf(p.textSize,['small','default','large','extra-large'] as const,'default'),
  reducedMotion:p.reducedMotion===true,language:oneOf(p.language,['en','fil'] as const,'en')};
}
export function nextHometownProfile(profile:LocalProfile,town:string):LocalProfile{
 const hometown=isMunicipality(town)?town:'';
 const previousSuggestion=themeForHometown(profile.hometown).id;
 const themeId=!profile.hometown||profile.themeId===previousSuggestion||profile.themeId==='heritage'?themeForHometown(hometown).id:profile.themeId;
 return sanitizeProfile({...profile,hometown,themeId,favoriteFestivalId:themeForHometown(hometown).id==='heritage'?'':themeForHometown(hometown).id});
}
