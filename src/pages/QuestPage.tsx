import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { arrowForwardOutline, checkmarkCircleOutline, refreshOutline, trophyOutline } from 'ionicons/icons';
import { useState } from 'react';
import { lessons } from '../data/content';
import { setStored } from '../services/storage';
import { ModuleHeader, PageFrame } from '../components/AppChrome';

export default function QuestPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [finished, setFinished] = useState(false);
  const question = lessons[questionIndex].quiz;
  const score = answers.reduce((total, answer, index) => total + (answer === lessons[index].quiz.correctIndex ? 10 : 0), 0);

  const choose = (index: number) => setSelectedAnswer(index);
  const nextQuestion = () => {
    if (selectedAnswer === undefined) return;
    const nextAnswers = [...answers, selectedAnswer];
    setAnswers(nextAnswers);
    if (questionIndex === lessons.length - 1) {
      setFinished(true);
      void setStored('pamana.quest.score', String(nextAnswers.reduce((total, answer, index) => total + (answer === lessons[index].quiz.correctIndex ? 10 : 0), 0)));
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelectedAnswer(undefined);
  };
  const retry = () => { setQuestionIndex(0); setAnswers([]); setSelectedAnswer(undefined); setFinished(false); };

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="quest">
          <ModuleHeader title="Pamana Quest" subtitle="Subukan ang iyong kaalaman sa mabilis na offline challenge." tone="amber" icon={trophyOutline} />
          <section className="module-content quest-content">
            {!finished ? (
              <article className="quest-card">
                <div className="quest-progress-top"><span>QUESTION {questionIndex + 1} OF {lessons.length}</span><strong>{score} POINTS</strong></div>
                <div className="quest-progress-track"><span style={{ width: `${((questionIndex + 1) / lessons.length) * 100}%` }} /></div>
                <p className="module-kicker">KNOWLEDGE CHECK · 10 POINTS</p>
                <h2>{question.prompt}</h2>
                <div className="quest-options">{question.answers.map((answer, index) => <button type="button" key={answer} className={`quest-option ${selectedAnswer === index ? 'selected' : ''} ${selectedAnswer !== undefined && index === question.correctIndex ? 'correct' : ''}`} onClick={() => choose(index)}><span>{String.fromCharCode(65 + index)}</span>{answer}{selectedAnswer !== undefined && index === question.correctIndex && <IonIcon icon={checkmarkCircleOutline} />}</button>)}</div>
                {selectedAnswer !== undefined && <div className={selectedAnswer === question.correctIndex ? 'feedback success' : 'feedback'}><strong>{selectedAnswer === question.correctIndex ? 'Tama!' : 'Review this one.'}</strong><p>{question.explanation}</p></div>}
                <IonButton className="full-primary-button" expand="block" disabled={selectedAnswer === undefined} onClick={nextQuestion}>{questionIndex === lessons.length - 1 ? 'Finish quest' : 'Next question'} <IonIcon icon={arrowForwardOutline} slot="end" /></IonButton>
              </article>
            ) : (
              <article className="quest-complete-card"><div className="quest-complete-icon"><IonIcon icon={trophyOutline} /></div><p className="module-kicker">QUEST COMPLETE</p><h2>{score >= 30 ? 'Magaling, Ka-Pamana!' : 'Good start—keep exploring!'}</h2><p>You earned <strong>{score} / {lessons.length * 10}</strong> points. Your result is saved locally on this device.</p><IonButton className="full-primary-button" expand="block" onClick={retry}><IonIcon icon={refreshOutline} slot="start" />Try again</IonButton></article>
            )}
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
