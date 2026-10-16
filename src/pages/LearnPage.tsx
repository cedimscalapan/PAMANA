import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { lessons, storageKey, Lesson, sourceById } from '../data/content';
import { setStored } from '../services/storage';

export default function LearnPage() {
  const history = useHistory();
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<Lesson>();
  const [answer, setAnswer] = useState<number>();
  const [, refresh] = useState(0);
  const categories = ['All', 'History & Geography', 'Communities', 'Writing', 'Traditions'];
  const filtered = useMemo(() => category === 'All' ? lessons : lessons.filter((lesson) => lesson.category === category), [category]);
  const completed = (id: string) => localStorage.getItem(storageKey(id)) === 'complete';
  const complete = (id: string) => {
    void setStored(storageKey(id), 'complete');
    refresh((value) => value + 1);
  };

  const openLesson = (lesson: Lesson) => {
    setSelected(lesson);
    setAnswer(undefined);
  };

  return <IonPage>
    <IonHeader><IonToolbar><IonButton slot="start" fill="clear" aria-label="Back to home" onClick={() => history.push('/home')}>‹</IonButton><IonTitle>Matuto</IonTitle></IonToolbar></IonHeader>
    <IonContent><main className="module-page">
      <p className="lead">Learn about Oriental Mindoro through short, offline lessons.</p>
      <IonSegment value={category} scrollable onIonChange={(event) => setCategory(String(event.detail.value))}>{categories.map((item) => <IonSegmentButton key={item} value={item}><IonLabel>{item}</IonLabel></IonSegmentButton>)}</IonSegment>
      <IonList>{filtered.map((lesson) => <IonItem key={lesson.id} lines="full">
        <IonLabel><span className="meta">{lesson.category} · {lesson.duration} min</span><h2>{lesson.title}</h2><p>{lesson.summary}</p><small>{lesson.sourceStatus === 'reviewed' ? 'Source checked' : 'Community review pending'}</small></IonLabel>
        <IonButton slot="end" onClick={() => openLesson(lesson)}>{completed(lesson.id) ? 'Review' : 'Open'}</IonButton>
      </IonItem>)}</IonList>
      {selected && <IonCard className="list-card"><IonCardContent>
        <IonButton fill="clear" onClick={() => setSelected(undefined)}>Close</IonButton>
        <span className="meta">OFFLINE LESSON · {selected.duration} MIN</span><h2>{selected.title}</h2><p>{selected.summary}</p>
        <ul>{selected.points.map((point) => <li key={point}>{point}</li>)}</ul>
        <p className="meta">CHECK YOUR UNDERSTANDING</p><p><strong>{selected.quiz.prompt}</strong></p>
        {selected.quiz.answers.map((option, index) => <IonButton key={option} className="answer" fill={answer === index ? 'solid' : 'outline'} onClick={() => setAnswer(index)}>{String.fromCharCode(65 + index)} · {option}</IonButton>)}
        {answer !== undefined && <div className={answer === selected.quiz.correctIndex ? 'feedback success' : 'feedback'}><strong>{answer === selected.quiz.correctIndex ? 'Tama!' : 'Review this one.'}</strong><p>{selected.quiz.explanation}</p></div>}
        <div className="source-chips"><span>Sources:</span>{selected.sourceIds.map((id) => <a key={id} href={sourceById(id)?.url} target="_blank" rel="noreferrer">{sourceById(id)?.publisher}</a>)}</div>
        <IonButton expand="block" onClick={() => complete(selected.id)}>{completed(selected.id) ? 'Completed locally' : 'Mark lesson complete'}</IonButton>
      </IonCardContent></IonCard>}
    </main></IonContent>
  </IonPage>;
}
