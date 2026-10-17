import {describe,it,expect} from 'vitest';
import {deriveHeritageStamps} from './heritage-stamps';
describe('offline heritage stamps',()=>{
 it('keeps all stamps locked at zero progress',()=>expect(deriveHeritageStamps(0,0).every(s=>!s.earned)).toBe(true));
 it('unlocks only requirements that are satisfied',()=>{const s=deriveHeritageStamps(5,1);expect(s.find(x=>x.id==='heritage-reader')?.earned).toBe(true);expect(s.find(x=>x.id==='quest-veteran')?.earned).toBe(false);});
});
