/** Onboarding is optional; never treat an unreadable storage value as complete. */
export const ONBOARDING_COMPLETE_KEY='pamana.onboardingComplete';
export type IntroActivity={id:'discover'|'learn'|'play'|'preserve';title:string;detail:string};
export const introActivities:readonly IntroActivity[]=[
 {id:'discover',title:'Discover',detail:'Explore local places, festivals, and heritage.'},
 {id:'learn',title:'Learn',detail:'Read verified stories and cultural lessons.'},
 {id:'play',title:'Play',detail:'Try friendly activities without time pressure.'},
 {id:'preserve',title:'Preserve',detail:'Keep your discoveries and private memories.'}
];
export const ONBOARDING_STEPS=[
 'Your Heritage Adventure','My Explorer Profile','Choose a Hometown',
 'Choose a Learning Experience','Festival Colors','Ready to Explore'
] as const;
export function isOnboardingComplete(value:string|null|undefined):boolean{return value==='true';}
export function initialExperienceRoute(value:string|null|undefined):'/home'|'/welcome'{
 return isOnboardingComplete(value)?'/home':'/welcome';
}
