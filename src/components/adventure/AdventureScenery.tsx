import type {CSSProperties} from 'react';
/** Original decorative vectors, not an accurate geographic map or Indigenous cultural imagery.
 * Scales crisply at any resolution and works without network access.
 */
export type SceneryVariant='coast'|'hills'|'sunrise';
export default function AdventureScenery({variant='coast',className='',style}:{variant?:SceneryVariant;className?:string;style?:CSSProperties}){
 const hill=variant==='hills',dawn=variant==='sunrise';
 return <svg className={`pamana-vector-scenery ${className}`} style={style}
  viewBox="0 0 760 300" preserveAspectRatio="xMidYMid slice" fill="none"
  xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
  <rect width="760" height="300" fill={dawn?'#FFF2DF':hill?'#E8F3EC':'#DDF2F6'}/>
  <circle cx={dawn?574:598} cy={dawn?94:67} r="56" fill={dawn?'#FFD29B':'#FFE2A2'} opacity=".95"/>
  <path d="M53 74q43-52 88 0M490 60q44-46 88 0" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" opacity=".65"/>
  <path d="M0 191q101-76 198-18q73-117 167-26q98-113 185-9q91-78 210-3v165H0z" fill={hill?'#7BBD9D':'#A6CDB0'}/>
  <path d="M0 227q90-40 188-8q103-91 219-14q125-64 215 1q80-42 138-14v108H0z" fill={hill?'#4E9779':'#75B39A'}/>
  {!hill&&<><path d="M0 233q100-14 191 8q140-22 254 0q161-36 315-6v65H0z" fill="#7BC5D0"/>
  <path d="M0 251q75-11 136 1t143 0t151-1t160 5t170-3" stroke="#D6F5EF" strokeWidth="5" opacity=".7" strokeLinecap="round"/></>}
  {hill&&<><path d="M109 254V150M92 180q17-39 37-1M96 211q15-28 31-1" stroke="#286C54" strokeWidth="12" strokeLinecap="round"/>
  <path d="M650 241V126M622 156q27-38 56 0M621 185q27-31 59 0" stroke="#306E57" strokeWidth="13" strokeLinecap="round"/></>}
  <path d="M0 286q115-26 218 1q144-23 258-4q125-26 284 0v17H0z" fill="#E7DDB8" opacity=".65"/>
 </svg>;
}
