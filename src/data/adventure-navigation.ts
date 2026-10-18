/** Single source of truth for the five adventure tabs.
 * The content modules keep their historical routes.
 */
export const adventureTabs = [
 {id:'home',label:'Home',path:'/home',symbol:'home'},
 {id:'journey',label:'Journey',path:'/journey',symbol:'compass'},
 {id:'learn',label:'Matuto',path:'/learn',symbol:'book'},
 {id:'quest',label:'Quest',path:'/quest',symbol:'trophy'},
 {id:'more',label:'More',path:'/more',symbol:'menu'}
] as const;
export type AdventureTab=typeof adventureTabs[number]['id'];
export type ExistingSection=AdventureTab|'explore'|'writing'|'stories'|'collection'|'settings';
/** Nothing becomes inaccessible just because it isn't in the five-tab bar. */
export const supportingRoutes=[
 '/explore','/writing','/stories','/collection','/profile','/settings','/onboarding'
] as const;
export const tabForSection=(section:ExistingSection):AdventureTab=>
 section==='explore'?'journey':
 ['writing','stories','collection','settings'].includes(section)?'more':section as AdventureTab;
