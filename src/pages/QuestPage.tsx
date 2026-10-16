import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { lessons } from '../data/content';
import { setStored } from '../services/storage';

export default function QuestPage() {
  const history = useHistory();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);
  const question = lessons[questionIndex].quiz;
  const score = answers.reduce((total, answer, index) => total + (answer === lessons[index].quiz.correctIndex ? 10 : 0), 0);
  const choose = (index: number) => {
    const next = [...answers];
    next[questionIndex] = index;
    setAnswers(next);
    if (questionIndex === lessons.length - 1) {
      setFinished(true);
      void setStored('pamana.quest.score', String(next.reduce((total, answer, itemIndex) => total + (answer === lessons[itemIndex].quiz.correctIndex ? 10 : 0), 0)));
    } else {
      setQuestionIndex((value) => value + 1);
    }
  };
  const retry = () => { setQuestionIndex(0); setAnswers([]); setFinished(false); };
  return <IonPage><IonHeader><IonToolbar><IonButton slot="start" fill="clear" aria-label="Back to home" onClick={() => history.push('/home')}>‹</IonButton><IonTitle>Pamana Quest</IonTitle></IonToolbar></IonHeader><IonContent><main className="module-page"><p className="lead">A short offline knowledge check with immediate feedback.</p>
    {!finished ? <IonCard className="list-card"><IonCardContent><span className="meta">QUESTION {questionIndex + 1} OF {lessons.length} · 10 POINTS</span><h2>{question.prompt}</h2>{question.answers.map((answer, index) => <IonButton key={answer} className="answer" expand="block" fill="outline" onClick={() => choose(index)}>{String.fromCharCode(65 + index)} · {answer}</IonButton>)}</IonCardContent></IonCard> : <IonCard className="list-card"><IonCardContent><span className="meta">QUEST COMPLETE</span><h2>{score >= 30 ? 'Magaling, Ka-Pamana!' : 'Good start—keep exploring!'}</h2><p>You earned <strong>{score} / {lessons.length * 10}</strong> points. Your best result is stored locally on this device.</p><IonButton expand="block" onClick={retry}>Try again</IonButton></IonCardContent></IonCard>}
  </main></IonContent></IonPage>;
}
