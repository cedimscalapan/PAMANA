import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { arrowForwardOutline, checkmarkCircleOutline, refreshOutline, timeOutline, trophyOutline } from 'ionicons/icons';
import { useEffect, useMemo, useState } from 'react';
import { sourceById } from '../data/content';
import { questCategories, questQuestions, QuestQuestion } from '../data/learning';
import { setStored } from '../services/storage';
import { ModuleHeader, PageFrame } from '../components/AppChrome';

const SESSION_SIZE = 10;

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

/** Randomise answer choices at session start while preserving the answer key. */
function prepareQuestion(question: QuestQuestion): QuestQuestion {
  const choices = shuffleArray(question.answers.map((answer, index) => ({ answer, index })));
  return {
    ...question,
    answers: choices.map((choice) => choice.answer),
    correctIndex: choices.findIndex((choice) => choice.index === question.correctIndex),
  };
}

function createSession(): QuestQuestion[] {
  const pool = shuffleArray(questQuestions);
  const selected: QuestQuestion[] = [];

  // Start with one question per category so a short session still feels broad.
  shuffleArray(questCategories).forEach((category) => {
    const item = pool.find((question) => question.category === category && !selected.includes(question));
    if (item) selected.push(item);
  });

  pool.forEach((question) => {
    if (selected.length < SESSION_SIZE && !selected.includes(question)) selected.push(question);
  });

  return shuffleArray(selected.slice(0, SESSION_SIZE)).map(prepareQuestion);
}

function scoreAnswers(answers: Array<number | null>, questions: QuestQuestion[]): number {
  return answers.reduce<number>((score, answer, index) => score + (answer !== null && answer === questions[index]?.correctIndex ? 10 : 0), 0);
}

export default function QuestPage() {
  const [session, setSession] = useState<QuestQuestion[]>(() => createSession());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number | null>>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();
  const [timedOut, setTimedOut] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(() => session[0]?.timeLimit ?? 20);
  const [finished, setFinished] = useState(false);
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('pamana.quest.bestScore') ?? 0));
  const question = session[questionIndex];

  useEffect(() => {
    setSelectedAnswer(undefined);
    setTimedOut(false);
    setSecondsLeft(question?.timeLimit ?? 20);
  }, [question?.id]);

  useEffect(() => {
    if (finished || selectedAnswer !== undefined || timedOut || !question) return undefined;
    const timer = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setTimedOut(true);
          setAnswers((previous) => {
            const next = [...previous];
            next[questionIndex] = null;
            return next;
          });
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [finished, question?.id, questionIndex, selectedAnswer, timedOut]);

  const currentScore = useMemo(() => scoreAnswers(answers, session), [answers, session]);
  const correctCount = useMemo(() => answers.reduce<number>((total, answer, index) => total + (answer !== null && answer === session[index]?.correctIndex ? 1 : 0), 0), [answers, session]);

  const choose = (index: number) => {
    if (selectedAnswer !== undefined || timedOut) return;
    setSelectedAnswer(index);
  };

  const nextQuestion = () => {
    if (selectedAnswer === undefined && !timedOut) return;
    const nextAnswers = [...answers];
    nextAnswers[questionIndex] = timedOut ? null : selectedAnswer ?? null;
    setAnswers(nextAnswers);

    if (questionIndex === session.length - 1) {
      const finalScore = scoreAnswers(nextAnswers, session);
      const nextBest = Math.max(bestScore, finalScore);
      setBestScore(nextBest);
      void setStored('pamana.quest.score', String(finalScore));
      void setStored('pamana.quest.bestScore', String(nextBest));
      void setStored('pamana.quest.lastCompletedAt', new Date().toISOString());
      setFinished(true);
      return;
    }

    setQuestionIndex((value) => value + 1);
  };

  const retry = () => {
    const nextSession = createSession();
    setSession(nextSession);
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(undefined);
    setTimedOut(false);
    setSecondsLeft(nextSession[0]?.timeLimit ?? 20);
    setFinished(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="quest">
          <ModuleHeader title="Pamana Quest" subtitle={`${questQuestions.length} source-checked questions · 10 per round · offline challenge`} tone="amber" icon={trophyOutline} />
          <section className="module-content quest-content">
            <div className="quest-bank-note"><strong>{questQuestions.length}-question challenge bank</strong><span>Every round mixes categories, difficulty, timers, and randomized answer positions.</span></div>
            {!finished && question ? (
              <article className="quest-card">
                <div className="quest-progress-top"><span>QUESTION {questionIndex + 1} OF {session.length}</span><strong>{currentScore} POINTS</strong></div>
                <div className="quest-progress-track"><span style={{ width: `${((questionIndex + 1) / session.length) * 100}%` }} /></div>
                <div className="quest-category-row">
                  <span className="quest-badge">{question.category}</span>
                  <span className={`quest-badge difficulty-${question.difficulty}`}>{question.difficulty}</span>
                  <span className={`quest-timer ${secondsLeft <= 5 ? 'quest-time-warning' : ''}`}><IonIcon icon={timeOutline} /> {secondsLeft}s</span>
                </div>
                <p className="module-kicker">KNOWLEDGE CHECK · 10 POINTS</p>
                <h2>{question.prompt}</h2>
                <div className="quest-options">
                  {question.answers.map((answer, index) => (
                    <button type="button" key={`${question.id}-${answer}`} className={`quest-option ${selectedAnswer === index ? 'selected' : ''} ${selectedAnswer !== undefined && index === question.correctIndex ? 'correct' : ''} ${timedOut && index === question.correctIndex ? 'correct' : ''}`} onClick={() => choose(index)}>
                      <span>{String.fromCharCode(65 + index)}</span>{answer}
                      {(selectedAnswer !== undefined || timedOut) && index === question.correctIndex && <IonIcon icon={checkmarkCircleOutline} />}
                    </button>
                  ))}
                </div>
                {(selectedAnswer !== undefined || timedOut) && (
                  <div className={selectedAnswer === question.correctIndex ? 'feedback success' : 'feedback'}>
                    <strong>{timedOut ? 'Time’s up!' : selectedAnswer === question.correctIndex ? 'Tama!' : 'Review this one.'}</strong>
                    <p>{question.explanation}</p>
                  </div>
                )}
                <div className="quest-source-row"><span>Source:</span>{question.sourceIds.map((id) => <a key={id} href={sourceById(id)?.url} target="_blank" rel="noreferrer">{sourceById(id)?.publisher}</a>)}</div>
                <IonButton className="full-primary-button" expand="block" disabled={selectedAnswer === undefined && !timedOut} onClick={nextQuestion}>{questionIndex === session.length - 1 ? 'Finish quest' : 'Next question'} <IonIcon icon={arrowForwardOutline} slot="end" /></IonButton>
              </article>
            ) : (
              <article className="quest-complete-card">
                <div className="quest-complete-icon"><IonIcon icon={trophyOutline} /></div>
                <p className="module-kicker">QUEST COMPLETE</p>
                <h2>{currentScore >= 70 ? 'Napakahusay, Ka-Pamana!' : 'Magandang simula—ituloy ang pagkatuto!'}</h2>
                <p>You earned <strong>{currentScore} / {session.length * 10}</strong> points. Your result is saved locally on this device.</p>
                <div className="quest-stat-grid"><div><strong>{correctCount}/{session.length}</strong><span>correct</span></div><div><strong>{bestScore}</strong><span>best score</span></div><div><strong>{Math.round((correctCount / session.length) * 100)}%</strong><span>accuracy</span></div></div>
                <IonButton className="full-primary-button" expand="block" onClick={retry}><IonIcon icon={refreshOutline} slot="start" />Try another quest</IonButton>
              </article>
            )}
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
