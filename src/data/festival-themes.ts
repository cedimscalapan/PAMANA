/** Original festival-inspired palettes, not official festival branding. */
export const municipalities=['Baco','Bansud','Bongabong','Bulalacao','Calapan City','Gloria','Mansalay','Naujan','Pinamalayan','Pola','Puerto Galera','Roxas','San Teodoro','Socorro','Victoria'] as const;
export type Municipality=typeof municipalities[number];
export type FestivalTheme={id:string;municipality:string;name:string;emoji:string;motif:string;primary:string;secondary:string;accent:string;canvas:string};
const raw: Array<[string,string,string,string,string,string,string,string,string]>=[
['heritage','','Classic PAMANA','🌿','Roots and heritage','#245A43','#80452C','#B96742','#FFF9ED'],
['banana','Baco','Banana Festival','🍌','Sunny harvest','#466B2D','#855E1F','#C89A18','#FFF9DC'],
['basudani','Bansud','Basudani Festival','🌾','Golden harvest','#6B5021','#77512C','#D0A54F','#FFF4DC'],
['sulyog','Bongabong','SULYOG Festival','🥥','Tropical green','#256145','#6D542C','#9ABF7C','#F1F8E8'],
['biniray','Bulalacao','Biniray Festival','🌊','Ocean and sand','#20627D','#815C3A','#67B8C5','#E9F8FA'],
['pandang-gitab','Calapan City','Pandang Gitab','✨','Lantern glow','#624A76','#84542B','#D49A36','#FFF2E2'],
['kalap','Calapan City','Kalap Festival','🌳','Community roots','#37633F','#70512A','#C8A46E','#F3F4E6'],
['salong-dagitab','Calapan City','Salong Dagitab','💡','Festive lights','#444F88','#735693','#E0AA46','#F1F0FF'],
['fiesta-mahal-tana','Calapan City','Fiesta MAHAL TANA!','🎉','Many hometowns','#6B477E','#A34465','#EAB661','#FFF1F4'],
['kawayanan','Gloria','Kawayanan Festival','🎋','Bamboo garden','#376F51','#655938','#98B47A','#F3F8EC'],
['mangyan-festival','Mansalay','Mangyan Festival','🌄','Warm sunrise','#87543B','#673F35','#D5A06A','#FFF3E9'],
['dabalistihit','Naujan','DaBaLisTiHit Festival','🐟','Freshwater life','#186B78','#315D75','#66B9C1','#EBF8FB'],
['bahaghari','Pinamalayan','Bahaghari Festival','🌈','Pastel rainbow','#7954A6','#9B5485','#DBA7CC','#F8F0FF'],
['sab-uyan','Pola','Sab-Uyan Festival','💧','Sea breeze','#286C83','#427A87','#A0DAD5','#EFFAFC'],
['kaaldawan-iraya','Puerto Galera','Kaaldawan-Iraya Festival','🌿','Coastal forest','#325D4A','#746445','#B1B985','#F3F9F2'],
['sipag','Roxas','SIPAG Festival','🌾','Fields and harvest','#736025','#8A5F36','#D4B15A','#FFF8E8'],
['masayaw','San Teodoro','MASAYAW Festival','🎶','Festive rhythm','#AA4954','#865274','#F0AA9E','#FFF0F1'],
['pakapya-agtike','Socorro','Pakapya-Agtike Festival','🌱','Green abundance','#456D37','#72603D','#ADCB78','#F4FAE8'],
['kapakyanan','Victoria','Kapakyanan Festival','🍊','Citrus harvest','#9B571D','#586832','#E4AB4D','#FFF6E4']];
export const festivalThemes:FestivalTheme[]=raw.map(([id,municipality,name,emoji,motif,primary,secondary,accent,canvas])=>({id,municipality,name,emoji,motif,primary,secondary,accent,canvas}));
export const themesForMunicipality=(town:string)=>festivalThemes.filter(t=>t.municipality===town);
export const themeForHometown=(town:string)=>themesForMunicipality(town)[0]??festivalThemes[0];
export const resolveTheme=(id:string)=>festivalThemes.find(t=>t.id===id)??festivalThemes[0];
export const isMunicipality=(value:unknown):value is Municipality=>typeof value==='string'&&municipalities.some(t=>t===value);
