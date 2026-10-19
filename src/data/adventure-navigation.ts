/** SMART PAMANA five-destination navigation. Old routes remain valid deep links. */
export const adventureTabs=[
 {id:'home',label:'Simula',path:'/home',symbol:'home'},
 {id:'journey',label:'Lakbay',path:'/journey',symbol:'compass'},
 {id:'learn',label:'Matuto',path:'/learn',symbol:'book'},
 {id:'writing',label:'Sulat',path:'/writing',symbol:'pencil'},
 {id:'my-pamana',label:'Pamana',path:'/my-pamana',symbol:'bookmark'}
] as const;
export type AdventureTab=typeof adventureTabs[number]['id'];
export type ExistingSection=AdventureTab|'explore'|'quest'|'stories'|'collection'|'settings'|'profile'|'more';
/** Historical bookmarks remain available independently and preserve their query strings. */
export const supportingRoutes=['/explore','/quest','/stories','/collection','/profile','/settings','/more','/onboarding','/welcome'] as const;
export function tabForSection(section:ExistingSection):AdventureTab{
 if(section==='explore'||section==='quest')return 'journey';
 if(section==='stories'||section==='collection'||section==='settings'||section==='profile'||section==='more')return 'my-pamana';
 return section;
}
