import {describe,it,expect} from 'vitest';
import {festivalThemes,municipalities,themeForHometown} from './festival-themes';
import {defaultProfile,nextHometownProfile,sanitizeProfile} from './personalization';
import {getReadingPlan} from './learning-levels';
describe('offline profile preferences',()=>{
 it('covers all fifteen localities',()=>{expect(municipalities).toHaveLength(15);for(const town of municipalities)expect(themeForHometown(town).municipality).toBe(town);});
 it('keeps independently selected festival themes',()=>{const p=sanitizeProfile({...defaultProfile,hometown:'Naujan',themeId:'bahaghari'});expect(nextHometownProfile(p,'Baco').themeId).toBe('bahaghari');});
 it('rejects invalid data and bounds private nickname',()=>{const p=sanitizeProfile({nickname:'x'.repeat(99),hometown:'invalid',learningStage:'not-valid'});expect(p.nickname).toHaveLength(32);expect(p.hometown).toBe('');expect(p.learningStage).toBe('lifelong');});
 it('preserves full sourced passages on lifelong mode',()=>expect(getReadingPlan('lifelong',5,5).sections).toBe(5));
 it('contains at least one palette per locality',()=>expect(festivalThemes.length).toBeGreaterThan(15));
});
