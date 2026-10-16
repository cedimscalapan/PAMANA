import { IonButton, IonContent, IonIcon, IonPage, IonSegment, IonSegmentButton } from '@ionic/react';
import { arrowForwardOutline, bookOutline, checkmarkCircleOutline, closeOutline } from 'ionicons/icons';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { lessons, storageKey, Lesson, sourceById } from '../data/content';
import { setStored } from '../services/storage';
import { ModuleHeader, PageFrame } from '../components/AppChrome';

export default function LearnPage() {
  const history = useHistory();
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Lesson>();
  const [answer, setAnswer] = useState<number>();
  const [, refresh] = useState(0);
  const categories = ['All', 'History & Geography', 'Communities', 'Writing', 'Traditions'];
  const filtered = useMemo(() => category === 'All' ? lessons : lessons.filter((lesson) => lesson.category === category), [category]);
  const completed = (id: string) => localStorage.getItem(storageKey(id)) === 'complete';
  const openLesson = (lesson: Lesson) => { setSelected(lesson); setAnswer(undefined); };
  const complete = (id: string) => { void setStored(storageKey(id), 'complete'); refresh((value) => value + 1); };

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="learn">
          <ModuleHeader title="Matuto" subtitle="Short, source-checked lessons you can take offline." icon={bookOutline} />
          <section className="module-content">
            <div className="module-intro-row">
              <div><p className="module-kicker">YOUR LEARNING PATH</p><h2>Discover Oriental Mindoro</h2></div>
              <span className="module-count">{lessons.length} lessons</span>
            </div>
            <IonSegment className="category-tabs" value={category} scrollable onIonChange={(event) => setCategory(String(event.detail.value ?? 'All'))}>
              {categories.map((item) => <IonSegmentButton key={item} value={item}>{item}</IonSegmentButton>)}
            </IonSegment>

            <div className="lesson-list">
              {filtered.map((lesson, index) => (
                <button type="button" className="lesson-list-row" key={lesson.id} onClick={() => openLesson(lesson)}>
                  <span className={`lesson-index lesson-index-${index % 4}`}><IonIcon icon={bookOutline} /></span>
                  <span className="lesson-list-copy">
                    <span className="lesson-meta">{lesson.category} · {lesson.duration} min</span>
                    <strong>{lesson.title}</strong>
                    <small>{lesson.summary}</small>
                    <em>{completed(lesson.id) ? 'Completed locally' : lesson.sourceStatus === 'reviewed' ? 'Source checked' : 'Community review pending'}</em>
                  </span>
                  <span className="lesson-open"><IonIcon icon={completed(lesson.id) ? checkmarkCircleOutline : arrowForwardOutline} /></span>
                </button>
              ))}
            </div>

            {selected && (
              <article className="lesson-detail-card">
                <div className="detail-card-topline"><span className="module-kicker">OFFLINE LESSON · {selected.duration} MIN</span><IonButton fill="clear" onClick={() => setSelected(undefined)} aria-label="Close lesson"><IonIcon icon={closeOutline} /></IonButton></div>
                <h2>{selected.title}</h2>
                <p className="detail-summary">{selected.summary}</p>
                <ul className="lesson-points">{selected.points.map((point) => <li key={point}>{point}</li>)}</ul>
                <div className="quiz-block">
                  <p className="module-kicker">CHECK YOUR UNDERSTANDING</p>
                  <h3>{selected.quiz.prompt}</h3>
                  <div className="quiz-options">
                    {selected.quiz.answers.map((option, index) => <button type="button" key={option} className={`quiz-option ${answer === index ? 'selected' : ''} ${answer !== undefined && index === selected.quiz.correctIndex ? 'correct' : ''}`} onClick={() => setAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}
                  </div>
                  {answer !== undefined && <div className={answer === selected.quiz.correctIndex ? 'feedback success' : 'feedback'}><strong>{answer === selected.quiz.correctIndex ? 'Tama!' : 'Balikan natin ito.'}</strong><p>{selected.quiz.explanation}</p></div>}
                </div>
                <div className="source-chips"><span>Sources:</span>{selected.sourceIds.map((id) => <a key={id} href={sourceById(id)?.url} target="_blank" rel="noreferrer">{sourceById(id)?.publisher}</a>)}</div>
                <IonButton className="full-primary-button" expand="block" onClick={() => complete(selected.id)}>{completed(selected.id) ? 'Completed locally' : 'Mark lesson complete'}</IonButton>
              </article>
            )}
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
