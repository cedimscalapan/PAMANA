import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { arrowForwardOutline, bookOutline, checkmarkCircleOutline, timeOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { PageFrame } from '../components/AppChrome';
import { DetailBack, EmptyState, FilterChips, HeritageHero, SearchField, SourceNotes } from '../components/HeritageUI';
import { lessons } from '../data/learning';
import { lessonArticles, readingMinutes } from '../data/lesson-articles';
import { photoForLesson } from '../data/gallery';
import { MediaFigure } from '../components/MediaFigure';
import { storageKey } from '../data/content';
import { setStored } from '../services/storage';
import { learningStages,getReadingPlan,type LearningStage } from '../data/learning-levels';
import { readProfile,saveProfile } from '../services/personalization';
import {interactiveLessonFor} from '../data/interactive-lessons';
import InteractiveLesson from '../components/InteractiveLesson';
import GlossaryMatch from '../components/GlossaryMatch';
import LessonDiscovery from '../components/adventure/LessonDiscovery';
import {playUiSound} from '../services/ui-sounds';

export default function LearnPage() {
  const history = useHistory();
  const location = useLocation();
  const lessonId = new URLSearchParams(location.search).get('lesson');
  const selected = lessons.find(item => item.id === lessonId);
  const content = useRef<HTMLIonContentElement>(null);
  const browseScroll = useRef(0);
  const [category, setCategory] = useState('All');
  const [stage,setStage] = useState<LearningStage>(()=>readProfile().learningStage);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<number>();
  const [reflection, setReflection] = useState('');
  const [error, setError] = useState('');
  const [progress, setProgress] = useState<Record<string, boolean>>(() => Object.fromEntries(lessons.map(item => [item.id, localStorage.getItem(storageKey(item.id)) === 'complete'])));
  useEffect(() => {
    setAnswer(undefined); setError(''); setReflection(lessonId ? localStorage.getItem(`pamana.reflection.${lessonId}`) ?? '' : '');
    void content.current?.scrollToPoint(0, selected ? 0 : browseScroll.current, 0);
    if (selected) void setStored('pamana.lastLesson', selected.id).catch(() => undefined);
  }, [lessonId]);
  const categories = ['All', ...new Set(lessons.map(item => item.category))];
  const filtered = lessons.filter(item => (category === 'All' || category === item.category) && `${item.title} ${item.summary}`.toLowerCase().includes(query.toLowerCase()));
  const completed = Object.values(progress).filter(Boolean).length;
  const next = lessons.find(item => item.id === localStorage.getItem('pamana.lastLesson') && !progress[item.id]) ?? lessons.find(item => !progress[item.id]);
  const open = (id: string) => history.push(`/learn?lesson=${id}`);
  const back = () => history.replace('/learn');
  const finish = async () => {
    if (!selected) return;
    try { await setStored(storageKey(selected.id), 'complete'); setProgress(previous => ({ ...previous, [selected.id]: true })); setError('');playUiSound('success'); }
    catch { setError('Progress could not be saved. Please try again.'); }
  };
  const article = selected && lessonArticles[selected.id];
  const photo = selected && photoForLesson(selected.id);
  const plan = article && getReadingPlan(stage,article.sections.length,article.terms.length);
  const interactivePack=selected&&interactiveLessonFor(selected.id);
  return <IonPage><IonContent ref={content} scrollEvents onIonScroll={event => { if (!selected) browseScroll.current = event.detail.scrollTop; }}><PageFrame active="learn">
    {!selected ? <>
      <HeritageHero eyebrow="A little curiosity. A deeper connection." title="Matuto" description="Get to know the places, people, and living heritage of Oriental Mindoro." />
      <section className="heritage-body">
        <div className="learning-progress"><div><span className="eyebrow">YOUR LEARNING JOURNEY</span><strong>{completed} of {lessons.length} lessons explored</strong></div><span className="progress-number">{Math.round(completed / lessons.length * 100)}<small>%</small></span><progress max={lessons.length} value={completed} aria-label="Completed lessons" /></div>
        {next && <button type="button" className="continue-lesson" onClick={() => open(next.id)}><span className="continue-icon"><IonIcon icon={bookOutline} /></span><span><small>{completed ? 'CONTINUE YOUR JOURNEY' : 'A GOOD PLACE TO BEGIN'}</small><strong>{next.title}</strong><em>{readingMinutes(next.id)} min read · at your own pace</em></span><IonIcon icon={arrowForwardOutline} /></button>}
        <div className="section-heading"><div><span className="eyebrow">LEARN SOMETHING NEW</span><h2>Explore the lessons</h2></div><span>{filtered.length} lessons</span></div>
        <SearchField value={query} onChange={setQuery} placeholder="Find a topic or lesson" />
        <FilterChips values={categories} selected={category} onChange={setCategory} label="Lesson categories" />
        <div className="learning-catalog">{filtered.map((lesson, index) => {
          const image = photoForLesson(lesson.id);
          return <button type="button" className="learning-card" key={lesson.id} onClick={() => open(lesson.id)}>
            <div className={`lesson-cover lesson-cover-${index % 4}`}>{image ? <img src={image.src} alt="" loading="lazy" /> : <><IonIcon icon={bookOutline} /><span>{String(lessons.indexOf(lesson) + 1).padStart(2, '0')}</span></>}{progress[lesson.id] && <span className="completed-label"><IonIcon icon={checkmarkCircleOutline} /> Read</span>}</div>
            <div className="learning-card-copy"><small>{lesson.category}</small><h3>{lesson.title}</h3><p>{lesson.summary}</p><footer><span><IonIcon icon={timeOutline} /> {readingMinutes(lesson.id)} min read</span><IonIcon icon={arrowForwardOutline} /></footer></div>
          </button>;
        })}</div>
        {!filtered.length && <EmptyState title="A different way to explore" description="Try another topic or clear your search to see all lessons." action={<button className="text-action" onClick={() => { setQuery(''); setCategory('All'); }}>Clear filters</button>} />}
      </section>
    </> : <article className="heritage-body reading-page">
      <DetailBack onBack={back} label="All lessons" /><span className="eyebrow">{selected.category} · {readingMinutes(selected.id)} MIN READ</span><h1>{selected.title}</h1><p className="reading-lead">{selected.summary}</p>
      <div className="pamana-reader-control"><label htmlFor="pamana-reading-mode">Reading experience</label><select id="pamana-reading-mode" value={stage} onChange={e=>{const next=e.target.value as LearningStage;setStage(next);void saveProfile({learningStage:next}).catch(()=>setError("Your reading setting could not be saved."));}}>{learningStages.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
      <p className="quiet-note">Reading modes display selected original, source-backed sections. The facts are not automatically rewritten.</p>
      {photo && <MediaFigure image={photo} />}
      {article && <><aside className="learning-objective"><span className="eyebrow">BY THE END OF THIS LESSON</span><p>{article.objective}</p></aside><nav className="article-outline" aria-label="Lesson sections">{article.sections.slice(0,plan?.sections ?? article.sections.length).map((section, index) => <a key={section.heading} href={`#lesson-section-${index}`} onClick={event => { event.preventDefault(); document.getElementById(`lesson-section-${index}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>{String(index + 1).padStart(2, '0')} {section.heading}</a>)}</nav>
      {article.sections.slice(0,plan?.sections ?? article.sections.length).map((section, index) => <section className="article-section" id={`lesson-section-${index}`} key={section.heading}><span className="section-number">{String(index + 1).padStart(2, '0')}</span><h2>{section.heading}</h2><p>{section.text}</p></section>)}
      <section className="key-terms"><h2>Words to keep</h2><dl>{article.terms.slice(0,plan?.terms ?? article.terms.length).map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></section></>}
      <details className="pamana-final-practice-more">
       <summary>Practice more · optional interactive activities</summary>
       <p>Explore extra challenges at your own pace. They are not required to finish this lesson.</p>
       {article&&<GlossaryMatch lessonId={selected.id}/>}
       {interactivePack&&<InteractiveLesson key={interactivePack.id} pack={interactivePack}/>}
       <LessonDiscovery key={selected.id} lesson={selected}/>
      </details>
      <section className="lesson-recap"><span className="eyebrow">TAKE IT WITH YOU</span><h2>The key ideas</h2><ul>{selected.points.map(point => <li key={point}>{point}</li>)}</ul></section>
      <section className="knowledge-check"><span className="eyebrow">CHECK YOUR UNDERSTANDING</span><h2>{selected.quiz.prompt}</h2><div className="quiz-options">{selected.quiz.answers.map((option, index) => <button type="button" key={option} className={`quiz-option ${answer === index ? 'selected' : ''} ${answer !== undefined && index === selected.quiz.correctIndex ? 'correct' : ''}`} onClick={() => setAnswer(index)} aria-pressed={answer === index}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{answer !== undefined && <div role="status" className={`feedback ${answer === selected.quiz.correctIndex ? 'success' : ''}`}><strong>{answer === selected.quiz.correctIndex ? 'Tama! You’ve got it.' : 'Let’s look at that again.'}</strong><p>{selected.quiz.explanation}</p></div>}</section>
      {article && plan?.showReflection && <section className="reflection-box"><h2>Make the connection</h2><p>{article.reflection}</p><label>Your reflection <span>Optional · private on this device</span><textarea value={reflection} onChange={event => setReflection(event.target.value)} placeholder="What stood out to you?" /></label><button className="secondary-action" onClick={async () => { try { await setStored(`pamana.reflection.${selected.id}`, reflection); setError('Reflection saved on this device.'); } catch { setError('Your reflection could not be saved. Try again.'); } }}>Save reflection</button></section>}
      <SourceNotes ids={selected.sourceIds} />{error && <p role="status" className="inline-status">{error}</p>}
      <button type="button" className="primary-action wide" onClick={finish}><IonIcon icon={checkmarkCircleOutline} />{progress[selected.id] ? 'Reading complete' : 'Mark reading complete'}</button><p className="quiet-note">Reading progress is separate from your practice answers.</p>
      <div className="related-links"><Link to="/explore">Explore the places <IonIcon icon={arrowForwardOutline} /></Link>{selected.category === 'Writing & Language' && <Link to="/writing">Practice in Sulat <IonIcon icon={arrowForwardOutline} /></Link>}<Link to="/quest">Try a Quest <IonIcon icon={arrowForwardOutline} /></Link></div>
    </article>}
    {lessonId && !selected && <p className="inline-status" role="status">This lesson is unavailable. Choose another lesson from the catalog.</p>}
  </PageFrame></IonContent></IonPage>;
}
