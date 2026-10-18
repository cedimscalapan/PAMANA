import {describe,it,expect} from 'vitest';
import {ONBOARDING_COMPLETE_KEY,ONBOARDING_STEPS,introActivities,initialExperienceRoute,isOnboardingComplete} from './onboarding-flow';
describe('Phase 02 first-run experience',()=>{
 it('retains the existing persistent completion key',()=>expect(ONBOARDING_COMPLETE_KEY).toBe('pamana.onboardingComplete'));
 it('takes new users to Welcome and returning users directly home',()=>{
  expect(initialExperienceRoute(null)).toBe('/welcome');
  expect(initialExperienceRoute('false')).toBe('/welcome');
  expect(initialExperienceRoute('yes')).toBe('/welcome');
  expect(initialExperienceRoute('true')).toBe('/home');
  expect(isOnboardingComplete('true')).toBe(true);
 });
 it('introduces the four real experiences, without age-gated language',()=>{
  expect(introActivities.map(x=>x.title)).toEqual(['Discover','Learn','Play','Preserve']);
  for(const item of introActivities){expect(item.detail.length).toBeGreaterThan(20);}
 });
 it('maintains six onboarding steps before start exploring',()=>{
  expect(ONBOARDING_STEPS).toHaveLength(6);
  expect(ONBOARDING_STEPS[0]).toBe('Your Heritage Adventure');
  expect(ONBOARDING_STEPS[5]).toBe('Ready to Explore');
 });
});
