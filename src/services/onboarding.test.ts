import {beforeEach,describe,it,expect,vi} from 'vitest';
import {defaultProfile} from '../data/personalization';
import {completeOnboarding,hasCompletedOnboarding} from './onboarding';
import {setStored} from './storage';
import {saveProfile} from './personalization';
vi.mock('./storage',()=>({setStored:vi.fn()}));
vi.mock('./personalization',()=>({saveProfile:vi.fn()}));
describe('safe offline onboarding completion',()=>{
 let state:Record<string,string>;
 beforeEach(()=>{
  state={};
  vi.clearAllMocks();
  vi.stubGlobal('localStorage',{
   getItem:(key:string)=>state[key]??null,
   setItem:(key:string,value:string)=>{state[key]=value;},
  });
  vi.mocked(saveProfile).mockResolvedValue({...defaultProfile});
  vi.mocked(setStored).mockImplementation(async(key,value)=>{state[key]=value;});
 });
 it('recognizes only durably completed onboarding',async()=>{
  expect(hasCompletedOnboarding()).toBe(false);
  await completeOnboarding();
  expect(hasCompletedOnboarding()).toBe(true);
 });
 it('skipping writes the completion flag without touching the profile',async()=>{
  await completeOnboarding();
  expect(saveProfile).not.toHaveBeenCalled();
  expect(setStored).toHaveBeenCalledWith('pamana.onboardingComplete','true');
 });
 it('full setup persists the existing profile before completion',async()=>{
  const draft={...defaultProfile,nickname:'Explorer',hometown:'Baco'};
  await completeOnboarding(draft);
  expect(saveProfile).toHaveBeenCalledWith(draft);
  expect(setStored).toHaveBeenCalledWith('pamana.onboardingComplete','true');
  expect(vi.mocked(saveProfile).mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(setStored).mock.invocationCallOrder[0]);
 });
 it('failure to store preferences never marks the user onboarded',async()=>{
  vi.mocked(saveProfile).mockRejectedValueOnce(new Error('Storage failed'));
  await expect(completeOnboarding({...defaultProfile})).rejects.toThrow('Storage failed');
  expect(setStored).not.toHaveBeenCalled();
  expect(hasCompletedOnboarding()).toBe(false);
 });
 it('failure writing the completion flag must surface an error',async()=>{
  vi.mocked(setStored).mockRejectedValueOnce(new Error('Storage failed'));
  await expect(completeOnboarding()).rejects.toThrow('Storage failed');
  expect(hasCompletedOnboarding()).toBe(false);
 });
});
