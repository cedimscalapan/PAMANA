import {IonContent,IonIcon,IonPage,useIonViewWillEnter} from '@ionic/react';
import {arrowBackOutline,arrowForwardOutline,bookOutline,checkmarkCircleOutline,compassOutline,homeOutline,trophyOutline} from 'ionicons/icons';
import {useEffect,useRef,useState} from 'react';
import {Link,useHistory,useLocation} from 'react-router-dom';
import {PageFrame} from '../components/AppChrome';
import HometownScene from '../components/HometownScene';
import {SourceNotes} from '../components/HeritageUI';
import {findChapter,heritageChapters,chapterStatus} from '../data/heritage-journey';
import {getJourneyReader,getJourneyQuestions} from '../data/journey-learning';
import {activeQuestionIndex,nextUnansweredIndex} from '../data/journey-challenge-state';
import {officialFestivals} from '../data/official-heritage';
import {lessons} from '../data/learning';
import {storageKey} from '../data/content';
import {photoForFestival,photoForLesson} from '../data/gallery';
import {readJourneyProgress,markJourneySectionRead,completeFestivalReading,completeJourneyLessonReading,markJourneyQuestionCorrect,completeChapterKnowledgeCheck} from '../services/heritage-journey';
import {readQuestProgress} from '../services/quest-games';
import {reviewNotice,festivalsForTown} from '../data/journey-research';
import {playUiSound} from '../services/ui-sounds';

type Step='festival'|'lesson'|'quest'|'complete';
const stages=[{key:'festival',label:'Tuklas',icon:compassOutline},
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
 const [quizCursor,setQuizCursor]=useState(0);
 const [feedback,setFeedback]=useState<{questionId:string;result:'correct'|'incorrect'}|null>(null);
 const [busy,setBusy]=useState(false);
 const [error,setError]=useState('');
 const [,tick]=useState(0);
 useEffect(()=>{setPage(0);setQuizCursor(0);setChoice(null);setFeedback(null);setError('');void content.current?.scrollToTop(0);},[location.search]);
 useIonViewWillEnter(()=>{setSaved(readJourneyProgress());tick(i=>i+1);});
 if(!chapter)return <IonPage><IonContent><PageFrame active="journey"><section className="pamana-flow-screen">
  <h1>Hometown not found</h1><p>Choose one of the fifteen available journeys.</p><Link to="/journey">Return to Lakbay</Link></section></PageFrame></IonContent></IonPage>;
 const lessonsDone=new Set(lessons.filter(l=>localStorage.getItem(storageKey(l.id))==='complete').map(l=>l.id));
 const status=chapterStatus(chapter,saved,lessonsDone,readQuestProgress().results);
 const local=saved.chapters[chapter.id]??{};
 const questions=getJourneyQuestions(chapter);
 const answered=new Set(local.chapterCorrectQuestions??[]);
 const answeredCount=questions.filter(q=>answered.has(q.id)).length;
 const questionIndex=activeQuestionIndex(questions.map(q=>q.id),answered,quizCursor,feedback&&feedback.result==='correct'?feedback.questionId:undefined);
 const question=questionIndex<0?undefined:questions[questionIndex];
 const questionFeedback=feedback&&feedback.questionId===question?.id?feedback.result:null;
 const lesson=lessons.find(l=>l.id===chapter.lessonId)!;
 const townFestivals=festivalsForTown(chapter.town);
 const festival=officialFestivals.find(f=>f.id===chapter.festivalId)!;
 const stage=step==='complete'&&!status.completed?(!status.festivalOpened?'festival':!status.lessonCompleted?'lesson':'quest'):step==='quest'&&!status.festivalOpened?'festival':
  step==='quest'&&!status.lessonCompleted?'lesson':step==='lesson'&&!status.festivalOpened?'festival':step;
 const sections=stage==='festival'||stage==='lesson'?getJourneyReader(chapter,stage):[];
 const readIndices=new Set(local.researchEdition===2?(stage==='festival'?local.festivalReadSections??[]:local.lessonReadSections??[]):[]);
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
  if(choice!==question.answer){setFeedback({questionId:question.id,result:'incorrect'});return;}
  void run(()=>markJourneyQuestionCorrect(chapter.id,question.id),()=>{
   setFeedback({questionId:question.id,result:'correct'});playUiSound('success');
  });
 };
 const nextQuestion=()=>{
  const updated=readJourneyProgress().chapters[chapter.id]?.chapterCorrectQuestions??[];
  const next=nextUnansweredIndex(questions.map(q=>q.id),new Set(updated));
  setChoice(null);setFeedback(null);setQuizCursor(next<0?questions.length:next);
  void content.current?.scrollToTop(0);
 };
 const nextChapter=heritageChapters[(heritageChapters.findIndex(c=>c.id===chapter.id)+1)%heritageChapters.length];
 const readingTitle=stage==='festival'?'Tuklas: '+chapter.town:'Matuto: Festivals and Living Heritage';
 return <IonPage><IonContent ref={content} fullscreen><PageFrame active="journey">
  <div className="pamana-flow-screen">
   <header className="pamana-flow-topbar">
    <button type="button" onClick={()=>history.push('/journey?town='+chapter.id)}><IonIcon icon={arrowBackOutline} aria-hidden="true"/> Lakbay</button>
    <strong>{chapter.town}</strong><span>OFFLINE LEARNING</span>
   </header>
   <div className="pamana-flow-header">
    <HometownScene hometown={chapter.town} className="pamana-flow-town-art"/>
    <div><span className="pamana-eyebrow">YOUR HOMETOWN HERITAGE ADVENTURE</span>
     <h1>{chapter.town}</h1><p>Explore its unique history, everyday life, cultural heritage, festivals and documented places, then apply what you learned.</p></div>
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
      <h2 id="flow-reading-title">{readingTitle}</h2><p>{stage==='festival'?'Explore three independent, locally researched topics: history, livelihoods and cultural heritage.':
       'Learn about the festivals and documented places of this hometown. Each festival has its own record and verification sources.'}</p></div>
     <div className="pamana-flow-reading-meter"><label htmlFor="pamana-flow-read-progress">
      <strong>{readCount} of {sections.length} sections read</strong><span>{Math.round(readCount/sections.length*100)}% reading progress</span></label>
      <progress id="pamana-flow-read-progress" max={sections.length} value={readCount}/></div>
     {credited&&<figure className="pamana-flow-photo"><img src={credited.src} alt={credited.alt} loading="lazy"/>
      <figcaption>Documentary image: {credited.credit} · {credited.license}. View full media record in Koleksyon.</figcaption></figure>}
     {stage==='lesson'&&<aside className="pamana-flow-objective"><strong>Continue discovering</strong><p>{townFestivals.length} documented annual festival{townFestivals.length===1?'':'s'} in {chapter.town}. Read the actual local festival records, heritage-place references and source limitations. <Link to={'/learn?lesson='+chapter.lessonId}>Optional: explore the wider Matuto lesson, {lesson.title}</Link>.</p></aside>}
     <div className="pamana-flow-section-picker" aria-label="Reading sections">{sections.map((item,index)=>
      <button key={item.id} type="button" aria-current={page===index?'step':undefined} aria-label={'Section '+(index+1)+': '+item.title+(readIndices.has(index)?', read':'')}
       className={(readIndices.has(index)?'read ':'')+(page===index?'selected':'')} onClick={()=>{setPage(index);void content.current?.scrollToTop(0);}}>
        {readIndices.has(index)?'✓':index+1}</button>)}</div>
     <article className="pamana-flow-article" key={stage+'-'+page}>
      <span className="pamana-eyebrow">PART {page+1} / {sections.length}</span>
      <h3>{sections[page].title}</h3>
      <p>{sections[page].text}</p>

      <SourceNotes ids={sections[page].sourceIds}/>
     <p className="pamana-flow-research-notice">{reviewNotice}</p>
     </article>
     <div className="pamana-flow-reading-actions">
      <button type="button" className="pamana-flow-secondary" disabled={page===0||busy} onClick={()=>setPage(page-1)}>← Previous part</button>
      <button type="button" className="pamana-flow-primary" disabled={busy||readIndices.has(page)} onClick={()=>markRead(page)}>
       {readIndices.has(page)?'Part read ✓':page===sections.length-1?'Mark final part read':'Mark read & next'} <IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/></button>
     </div>
     {readIndices.has(page)&&page<sections.length-1&&<button type="button" className="pamana-flow-next-part" onClick={()=>{setPage(page+1);void content.current?.scrollToTop(0);}}>
       Next reading part <IonIcon icon={arrowForwardOutline} aria-hidden="true"/></button>}
     {allRead&&<div className="pamana-flow-continue">
      <div><strong>{stage==='festival'?'Hometown discovery ready!':'Festival and heritage reading ready!'}</strong>
       <p>All {sections.length} sections are marked read. Your progress is saved on this device.</p></div>
      <button type="button" disabled={busy} onClick={finishReader}>{stage==='festival'?'Finish Tuklas → Festivals & Heritage':'Finish Matuto → Hometown Challenge'}</button>
     </div>}
    </section>
   </>:stage==='quest'?<section className="pamana-flow-quiz" aria-labelledby="flow-quiz-title">
    <span className="pamana-eyebrow">STEP 3 OF 3 · LOCALITY-SPECIFIC KNOWLEDGE & GAMES</span>
    <h2 id="flow-quiz-title">What did you discover?</h2>
    <p>Answer source-linked questions about <strong>{chapter.town}</strong>: history, everyday life, heritage places and {townFestivals.length===1?'its annual festival':'all '+townFestivals.length+' annual festivals'}. No generic repeated province-wide questions or timer.</p>
    <div className="pamana-flow-reading-meter"><label htmlFor="pamana-flow-quiz-progress"><strong>{answeredCount} of {questions.length} correct</strong>
      <span>{Math.round(answeredCount/questions.length*100)}% complete</span></label>
     <progress id="pamana-flow-quiz-progress" value={answeredCount} max={questions.length}/></div>
    <div className="pamana-flow-question-track" aria-label="Challenge question progress">
     {questions.map((q,index)=><span key={q.id} aria-label={'Question '+(index+1)+(answered.has(q.id)?' correct':index===questionIndex?' current':' not yet complete')}
      className={(answered.has(q.id)?'done ':'')+(index===questionIndex?'current':'')}>
      {answered.has(q.id)?'✓':index+1}</span>)}
    </div>
    {question?<article className="pamana-flow-question" key={question.id}>
     <span className="pamana-eyebrow">{question.stage==='festival'?'FROM YOUR HOMETOWN AND CULTURAL READING':'FROM YOUR MATUTO READING'} · QUESTION {questionIndex+1} / {questions.length}</span>
     <h3>{question.prompt}</h3>
     <div className="pamana-flow-answers">{question.options.map((answer,index)=><button key={index} type="button"
      disabled={busy||questionFeedback==='correct'} aria-pressed={choice===index} className={choice===index?'selected':''}
      onClick={()=>{setChoice(index);setFeedback(null);}}><span>{String.fromCharCode(65+index)}</span>{answer}</button>)}</div>
     {questionFeedback==='incorrect'&&<p className="pamana-flow-feedback incorrect" role="status">Not yet—try another answer. Use the source below or review the related Tuklas and Matuto reading. You can retry without losing previously correct answers.</p>}
     {questionFeedback==='correct'&&<div className="pamana-flow-feedback correct" role="status">
      <strong>Correct! Question {questionIndex+1} saved.</strong><p>{question.explanation}</p></div>}
     <SourceNotes ids={question.sourceIds}/>
     {questionFeedback==='correct'?
      <button type="button" className="pamana-flow-primary" disabled={busy} onClick={nextQuestion}>
       {answeredCount===questions.length?'View results & finish challenge':'Next question'} <IonIcon icon={arrowForwardOutline} aria-hidden="true"/>
      </button>:
      <button type="button" className="pamana-flow-primary" disabled={choice===null||busy} onClick={submitAnswer}>
       Check this answer <IonIcon icon={checkmarkCircleOutline} aria-hidden="true"/></button>}
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
