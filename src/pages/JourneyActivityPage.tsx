import {IonContent,IonIcon,IonPage,useIonViewWillEnter} from '@ionic/react';
import {arrowBackOutline,arrowForwardOutline,bookOutline,checkmarkCircleOutline,compassOutline,homeOutline,trophyOutline} from 'ionicons/icons';
import {useEffect,useRef,useState} from 'react';
import {Link,useHistory,useLocation} from 'react-router-dom';
import {PageFrame} from '../components/AppChrome';
import HometownScene from '../components/HometownScene';
import {SourceNotes} from '../components/HeritageUI';
import {findChapter,heritageChapters,chapterStatus} from '../data/heritage-journey';
import {getJourneyReader,getJourneyQuestions} from '../data/journey-learning';
import {officialFestivals} from '../data/official-heritage';
import {lessons} from '../data/learning';
import {lessonArticles} from '../data/lesson-articles';
import {storageKey} from '../data/content';
import {photoForFestival,photoForLesson} from '../data/gallery';
import {readJourneyProgress,markJourneySectionRead,completeFestivalReading,completeJourneyLessonReading,markJourneyQuestionCorrect,completeChapterKnowledgeCheck} from '../services/heritage-journey';
import {readQuestProgress} from '../services/quest-games';
import {playUiSound} from '../services/ui-sounds';

type Step='festival'|'lesson'|'quest'|'complete';
const stages=[{key:'festival',label:'Discover',icon:compassOutline},
 {key:'lesson',label:'Matuto',icon:bookOutline},{key:'quest',label:'Challenge',icon:trophyOutline}] as const;
const journeyUrl=(id:string,step:Step)=>'/journey/activity?town='+encodeURIComponent(id)+'&step='+step;
export default function JourneyActivityPage(){
 const history=useHistory(),location=useLocation(),content=useRef<HTMLIonContentElement>(null);
 const params=new URLSearchParams(location.search);
 const chapter=findChapter(params.get('town'));
 const requested=params.get('step');
 const step:Step=requested==='lesson'||requested==='quest'||requested==='complete'?requested:'festival';
 const [saved,setSaved]=useState(readJourneyProgress);
 const [page,setPage]=useState(0);
 const [choice,setChoice]=useState<number|null>(null);
 const [feedback,setFeedback]=useState<'correct'|'incorrect'|null>(null);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [,tick]=useState(0);
 useEffect(()=>{setPage(0);setChoice(null);setFeedback(null);setError('');void content.current?.scrollToTop(0);},[location.search]);
 useIonViewWillEnter(()=>{setSaved(readJourneyProgress());tick(i=>i+1);});
 if(!chapter)return <IonPage><IonContent><PageFrame active="journey"><section className="pamana-flow-screen">
  <h1>Hometown not found</h1><p>Choose one of the fifteen available journeys.</p><Link to="/journey">Return to Lakbay</Link></section></PageFrame></IonContent></IonPage>;
 const lessonsDone=new Set(lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').map(l=>l.id));
 const status=chapterStatus(chapter,saved,lessonsDone,readQuestProgress().results);
 const local=saved.chapters[chapter.id]??{};
 const questions=getJourneyQuestions(chapter);
 const answered=new Set(local.chapterCorrectQuestions??[]);
 const answeredCount=questions.filter(q=>answered.has(q.id)).length;
 const questionIndex=questions.findIndex(q=>!answered.has(q.id));
 const question=questionIndex<0?undefined:questions[questionIndex];
 const lesson=lessons.find(l=>l.id===chapter.lessonId)!;
 const article=lessonArticles[chapter.lessonId];
 const festival=officialFestivals.find(f=>f.id===chapter.festivalId)!;
 const stage=step==='complete'&&status.completed?'complete':step==='quest'&&!status.festivalOpened?'festival':
  step==='quest'&&!status.lessonCompleted?'lesson':step==='lesson'&&!status.festivalOpened?'festival':step;
 const sections=stage==='festival'||stage==='lesson'?getJourneyReader(chapter,stage):[];
 const readIndices=new Set(stage==='festival'?local.festivalReadSections??[]:local.lessonReadSections??[]);
 const readCount=sections.filter((_,i)=>readIndices.has(i)).length;
 const allRead=sections.length>0&&readCount===sections.length;
 const picture=stage==='festival'?photoForFestival(chapter.festivalId):photoForLesson(chapter.lessonId);
 const credited=picture?.license&&picture?.credit?picture:undefined;
 const change=(next:Step)=>history.replace(journeyUrl(chapter.id,next));
 const run=async(action:()=>Promise<unknown>,after?:()=>void)=>{
  if(busy)return;
  setBusy(true);setError('');
  try{await action();setSaved(readJourneyProgress());tick(i=>i+1);after?.();}
  catch(e){setError(e instanceof Error?e.message:'Progress could not be saved. Please try again.');}
  finally{setBusy(false);}
 };
 const markRead=(index:number)=>{
  if(stage!=='festival'&&stage!=='lesson')return;
  void run(()=>markJourneySectionRead(chapter.id,stage,index),()=>{
   if(index<sections.length-1)setPage(index+1);
   void content.current?.scrollToTop(0);
  });
 };
 const finishReader=()=>{
  if(stage==='festival'){
   void run(()=>completeFestivalReading(chapter.id),()=>{playUiSound('success');change('lesson');});
  }else if(stage==='lesson'){
   void run(()=>completeJourneyLessonReading(chapter.id),()=>{playUiSound('success');change('quest');});
  }
 };
 const submitAnswer=()=>{
  if(!question||choice===null)return;
  if(choice!==question.answer){setFeedback('incorrect');return;}
  void run(()=>markJourneyQuestionCorrect(chapter.id,question.id),()=>{
   setFeedback('correct');playUiSound('success');
  });
 };
 const advanceQuiz=()=>{setChoice(null);setFeedback(null);void content.current?.scrollToTop(0);};
 const nextChapter=heritageChapters[(heritageChapters.findIndex(c=>c.id===chapter.id)+1)%heritageChapters.length];
 const readingTitle=stage==='festival'?festival.name:lesson.title;
 return <IonPage><IonContent ref={content} fullscreen><PageFrame active="journey">
  <div className="pamana-flow-screen">
   <header className="pamana-flow-topbar">
    <button type="button" onClick={()=>history.push('/journey?town='+chapter.id)}><IonIcon icon={arrowBackOutline} aria-hidden="true"/> Lakbay</button>
    <strong>{chapter.town}</strong><span>OFFLINE LEARNING</span>
   </header>
   <div className="pamana-flow-header">
    <HometownScene hometown={chapter.town} className="pamana-flow-town-art"/>
    <div><span className="pamana-eyebrow">YOUR HOMETOWN HERITAGE ADVENTURE</span>
     <h1>{chapter.town}</h1><p>Discover a real festival, learn from a detailed Matuto lesson, then answer questions about what you read.</p></div>
   </div>
   <nav aria-label="Your three chapter steps" className="pamana-flow-stepper">
    {stages.map((item,index)=>{
     const done=index===0?status.festivalOpened:index===1?status.lessonCompleted:status.questCompleted;
     const active=stage===item.key||(stage==='complete'&&index===2);
     const accessible=index===0||index===1&&status.festivalOpened||index===2&&status.festivalOpened&&status.lessonCompleted;
     return <button type="button" key={item.key} disabled={!accessible} aria-current={active?'step':undefined}
      className={(done?'completed ':'')+(active?'active':'')} onClick={()=>change(item.key)}>
      <span className="pamana-flow-step-circle">{done?'✓':index+1}</span><span>{item.label}</span></button>;
    })}
   </nav>
   {stage==='festival'||stage==='lesson'?<>
    <section className="pamana-flow-reading" aria-labelledby="flow-reading-title">
     <div className="pamana-flow-reading-title"><span className="pamana-eyebrow">STEP {stage==='festival'?'1':'2'} OF 3 · SOURCE-BACKED READING</span>
      <h2 id="flow-reading-title">{readingTitle}</h2><p>{stage==='festival'?'Explore the documented background, public themes and cultural context of this hometown festival.':
       'Read the complete existing Matuto article, not just its short lesson summary.'}</p></div>
     <div className="pamana-flow-reading-meter"><label htmlFor="pamana-flow-read-progress">
      <strong>{readCount} of {sections.length} sections read</strong><span>{Math.round(readCount/sections.length*100)}% reading progress</span></label>
      <progress id="pamana-flow-read-progress" max={sections.length} value={readCount}/></div>
     {credited&&<figure className="pamana-flow-photo"><img src={credited.src} alt={credited.alt} loading="lazy"/>
      <figcaption>Documentary image: {credited.credit} · {credited.license}. View full media record in Koleksyon.</figcaption></figure>}
     {stage==='lesson'&&<aside className="pamana-flow-objective"><strong>Your learning objective</strong><p>{article.objective}</p></aside>}
     <div className="pamana-flow-section-picker" aria-label="Reading sections">{sections.map((item,index)=>
      <button key={item.id} type="button" aria-current={page===index?'step':undefined} aria-label={'Section '+(index+1)+': '+item.title+(readIndices.has(index)?', read':'')}
       className={(readIndices.has(index)?'read ':'')+(page===index?'selected':'')} onClick={()=>{setPage(index);void content.current?.scrollToTop(0);}}>
        {readIndices.has(index)?'✓':index+1}</button>)}</div>
     <article className="pamana-flow-article" key={stage+'-'+page}>
      <span className="pamana-eyebrow">PART {page+1} / {sections.length}</span>
      <h3>{sections[page].title}</h3>
      <p>{sections[page].text}</p>
      {stage==='lesson'&&page===sections.length-1&&<div className="pamana-flow-terms"><h4>Words to remember</h4>
       <dl>{article.terms.map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl></div>}
      <SourceNotes ids={sections[page].sourceIds}/>
     </article>
     <div className="pamana-flow-reading-actions">
      <button type="button" className="pamana-flow-secondary" disabled={page===0||busy} onClick={()=>setPage(page-1)}>← Previous part</button>
      <button type="button" className="pamana-flow-primary" disabled={busy||readIndices.has(page)} onClick={()=>markRead(page)}>
       {readIndices.has(page)?'Part read ✓':page===sections.length-1?'Mark final part read':'Mark read & next'} <IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/></button>
     </div>
     {readIndices.has(page)&&page<sections.length-1&&<button type="button" className="pamana-flow-next-part" onClick={()=>{setPage(page+1);void content.current?.scrollToTop(0);}}>
       Next reading part <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>}
     {allRead&&<div className="pamana-flow-continue">
      <div><strong>{stage==='festival'?'Festival discovery ready!':'Matuto reading ready!'}</strong>
       <p>All {sections.length} sections are marked read. Your progress is saved on this device.</p></div>
      <button type="button" disabled={busy} onClick={finishReader}>{stage==='festival'?'Finish Discovery → Matuto':'Finish Matuto → Hometown Challenge'}</button>
     </div>}
    </section>
   </>:stage==='quest'?<section className="pamana-flow-quiz" aria-labelledby="flow-quiz-title">
    <span className="pamana-eyebrow">STEP 3 OF 3 · YOUR HOMETOWN KNOWLEDGE CHECK</span>
    <h2 id="flow-quiz-title">What did you discover?</h2>
    <p>These questions come from <strong>{festival.name}</strong> and <strong>{lesson.title}</strong>. No unrelated province-wide questions or timers.</p>
    <div className="pamana-flow-reading-meter"><label htmlFor="pamana-flow-quiz-progress"><strong>{answeredCount} of {questions.length} correct</strong>
      <span>{Math.round(answeredCount/questions.length*100)}% complete</span></label>
     <progress id="pamana-flow-quiz-progress" value={answeredCount} max={questions.length}/></div>
    {question?<article className="pamana-flow-question" key={question.id}>
     <span className="pamana-eyebrow">{question.stage==='festival'?'FROM YOUR FESTIVAL READING':'FROM YOUR MATUTO READING'} · QUESTION {questionIndex+1} / {questions.length}</span>
     <h3>{question.prompt}</h3>
     <div className="pamana-flow-answers">{question.options.map((answer,index)=><button key={index} type="button"
      disabled={busy||feedback==='correct'} aria-pressed={choice===index} className={choice===index?'selected':''}
      onClick={()=>{setChoice(index);setFeedback(null);}}><span>{String.fromCharCode(65+index)}</span>{answer}</button>)}</div>
     {feedback==='incorrect'&&<p className="pamana-flow-feedback incorrect" role="status">Not quite. Review the festival or lesson details above, then try again. Hint: {question.explanation}</p>}
     <SourceNotes ids={question.sourceIds}/>
     <button type="button" className="pamana-flow-primary" disabled={choice===null||busy} onClick={submitAnswer}>Check answer</button>
    </article>:<div className="pamana-flow-continue">
     <div><strong>You answered all {questions.length} chapter questions!</strong><p>Your answers are recorded offline. Save the hometown challenge to earn its stamp.</p></div>
     <button type="button" disabled={busy} onClick={()=>void run(()=>completeChapterKnowledgeCheck(chapter.id),()=>{
      playUiSound('success');change('complete');
     })}>Finish Challenge & Earn Stamp <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
    </div>}
   </section>:<section className="pamana-flow-finished" role="status">
    <span aria-hidden="true">🏅</span><span className="pamana-eyebrow">HERITAGE PASSPORT UPDATED</span>
    <h2>{chapter.town} — Journey Complete!</h2>
    <p>You completed the festival discovery, the linked Matuto reading and the chapter-specific knowledge check. Your Heritage Passport stamp is saved offline.</p>
    <div className="pamana-flow-finished-buttons"><button type="button" className="pamana-flow-primary" onClick={()=>history.push(journeyUrl(nextChapter.id,'festival'))}>
     Discover {nextChapter.town} <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>
     <Link to="/my-pamana">View my Heritage Passport</Link><Link to="/journey">Return to all hometowns</Link>
    </div>
   </section>}
   {error&&<p className="pamana-flow-error" role="alert">{error}</p>}
   <footer className="pamana-flow-footer"><IonIcon icon={homeOutline} aria-hidden="true"/> All reading and quiz questions are bundled for offline use. Cultural references identify the publishers, but current festival schedules still require organizer confirmation.</footer>
  </div>
 </PageFrame></IonContent></IonPage>;
}
