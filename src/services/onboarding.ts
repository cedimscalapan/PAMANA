import {ONBOARDING_COMPLETE_KEY,isOnboardingComplete} from '../data/onboarding-flow';
import type {LocalProfile} from '../data/personalization';
import {saveProfile} from './personalization';
import {setStored} from './storage';

/** Returns true only after completion was durably persisted. */
export function hasCompletedOnboarding():boolean{
 try{return isOnboardingComplete(localStorage.getItem(ONBOARDING_COMPLETE_KEY));}
 catch{return false;}
}
/** Skipping onboarding preserves existing profile/preferences without overwriting them. */
export async function completeOnboarding(profile?:LocalProfile):Promise<void>{
 if(profile)await saveProfile(profile);
 await setStored(ONBOARDING_COMPLETE_KEY,'true');
}
