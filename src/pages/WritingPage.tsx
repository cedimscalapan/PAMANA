import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import {
  arrowBackOutline,
  bookOutline,
  checkmarkCircleOutline,
  chevronBackOutline,
  chevronForwardOutline,
  homeOutline,
  mapOutline,
  pencilOutline,
  refreshOutline,
  trophyOutline,
  volumeHighOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';
import { hanunooCharacters } from '../data/hanunoo';
import { removeStored, setStored } from '../services/storage';

type ScriptName = 'Hanunó’o' | 'Buhid';

const practiceCharacters = hanunooCharacters.filter(
  (character) => character.category === 'independent_vowel' || character.category === 'consonant',
);

const clampIndex = (value: number) => Math.max(0, Math.min(value, practiceCharacters.length - 1));

type TracePadProps = {
  glyph: string;
  resetKey: number;
  onTrace: () => void;
};

function TracePad({ glyph, resetKey, onTrace }: TracePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(128, 69, 44, 0.14)';
    context.font = '220px "Noto Sans Hanunoo"';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(glyph, canvas.width / 2, canvas.height / 2 - 8);

    context.setLineDash([8, 12]);
    context.strokeStyle = 'rgba(185, 103, 66, 0.28)';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(86, canvas.height - 54);
    context.lineTo(canvas.width - 86, canvas.height - 54);
    context.stroke();
    context.setLineDash([]);
  }, [glyph, resetKey]);

  const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
    };
  };

  const startDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const context = canvas.getContext('2d');
    if (!context) return;
    drawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  };

  const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    const context = event.currentTarget.getContext('2d');
    if (!context) return;
    const point = getPoint(event);
    context.strokeStyle = '#b96742';
    context.lineWidth = 9;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineTo(point.x, point.y);
    context.stroke();
  };

  const finishDrawing = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    onTrace();
  };

  return (
    <div className="trace-pad-wrap">
      <canvas
        ref={canvasRef}
        width={640}
        height={360}
        className="trace-pad-canvas"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={finishDrawing}
        onPointerCancel={finishDrawing}
        aria-label={`Trace Hanunó’o character ${glyph}`}
      />
      <span className="trace-pad-hint">Sundan ang gabay sa tuldok-tuldok</span>
    </div>
  );
}

export default function WritingPage() {
  const history = useHistory();
  const savedPractice = localStorage.getItem('pamana.writingPractice');
  const savedIndex = Number(localStorage.getItem('pamana.writing.index') || 0);
  const initialIndex = savedPractice === 'complete' ? practiceCharacters.length - 1 : clampIndex(savedIndex);

  const [script, setScript] = useState<ScriptName>('Hanunó’o');
  const [characterIndex, setCharacterIndex] = useState(initialIndex);
  const [traced, setTraced] = useState(false);
  const [stepSaved, setStepSaved] = useState(savedPractice === 'complete');
  const [showSuccess, setShowSuccess] = useState(savedPractice === 'complete');
  const [voiceMessage, setVoiceMessage] = useState('');
  const [resetKey, setResetKey] = useState(0);

  const activeCharacter = practiceCharacters[characterIndex];
  const isLastCharacter = characterIndex === practiceCharacters.length - 1;
  const progress = Math.round(((characterIndex + (stepSaved ? 1 : 0)) / practiceCharacters.length) * 100);

  const changeScript = (nextScript: ScriptName) => {
    setScript(nextScript);
    setVoiceMessage('');
    setShowSuccess(false);
    setStepSaved(false);
    setTraced(false);
  };

  const speak = () => {
    if (!activeCharacter) return;
    const reading = activeCharacter.voiceGuide;
    if ('speechSynthesis' in window && reading !== 'silent mark') {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(reading));
      setVoiceMessage(`Voice guide: ${reading}`);
      return;
    }
    setVoiceMessage('Voice guide unavailable on this device; the reading guide is shown below.');
  };

  const resetPractice = () => {
    setTraced(false);
    setStepSaved(false);
    setShowSuccess(false);
    setVoiceMessage('');
    setResetKey((value) => value + 1);
  };

  const restartLesson = () => {
    void removeStored('pamana.writingPractice');
    void removeStored('pamana.writing.index');
    setCharacterIndex(0);
    resetPractice();
  };

  const saveOrContinue = async () => {
    if (!stepSaved) {
      if (!traced) return;
      await setStored('pamana.writing.index', String(characterIndex));
      await setStored('pamana.writingPractice', isLastCharacter ? 'complete' : 'in-progress');
      setStepSaved(true);
      setShowSuccess(true);
      return;
    }

    if (isLastCharacter) {
      restartLesson();
      return;
    }

    const nextIndex = characterIndex + 1;
    await setStored('pamana.writing.index', String(nextIndex));
    setCharacterIndex(nextIndex);
    setStepSaved(false);
    setShowSuccess(false);
    setTraced(false);
    setVoiceMessage('');
    setResetKey((value) => value + 1);
  };

  const moveCharacter = (direction: -1 | 1) => {
    const nextIndex = clampIndex(characterIndex + direction);
    setCharacterIndex(nextIndex);
    setStepSaved(false);
    setShowSuccess(false);
    setTraced(false);
    setVoiceMessage('');
    setResetKey((value) => value + 1);
    void setStored('pamana.writing.index', String(nextIndex));
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="writing-page">
          <section className="writing-hero">
            <div className="writing-topbar">
              <IonButton
                className="writing-back-button"
                fill="clear"
                onClick={() => history.push('/home')}
                aria-label="Back to home"
              >
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
              <span>SMART PAMANA</span>
              <button
                type="button"
                className="writing-avatar"
                style={{ backgroundImage: `url(${kaPamanaIcon})` }}
                onClick={() => history.push('/home')}
                aria-label="Open Ka-Pamana home"
              />
            </div>
            <div className="writing-hero-copy">
              <p className="writing-kicker">SULAT PAMANA</p>
              <h1>Indigenous Writing Systems</h1>
              <p>Sulat. Tanda. Pamana. Para sa Mas Maliwanag na Kinabukasan.</p>
            </div>
          </section>

          <section className="writing-body">
            <IonSegment
              className="writing-script-tabs"
              value={script}
              onIonChange={(event) => changeScript(event.detail.value === 'Buhid' ? 'Buhid' : 'Hanunó’o')}
            >
              <IonSegmentButton value="Hanunó’o">Hanunó’o</IonSegmentButton>
              <IonSegmentButton value="Buhid">Buhid</IonSegmentButton>
            </IonSegment>

            {script === 'Hanunó’o' ? (
              <>
                <div className="writing-progress">
                  <div>
                    <span>LETTER {characterIndex + 1} OF {practiceCharacters.length}</span>
                    <strong>{progress}%</strong>
                  </div>
                  <div className="writing-progress-line">
                    <span style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                </div>

                <section className="writing-reference card">
                  <div className="writing-reference-top">
                    <span className="meta">REFERENCE CHARACTER</span>
                    <div className="writing-step-buttons">
                      <IonButton
                        fill="clear"
                        disabled={characterIndex === 0}
                        onClick={() => moveCharacter(-1)}
                        aria-label="Previous character"
                      >
                        <IonIcon icon={chevronBackOutline} />
                      </IonButton>
                      <IonButton
                        fill="clear"
                        disabled={isLastCharacter}
                        onClick={() => moveCharacter(1)}
                        aria-label="Next character"
                      >
                        <IonIcon icon={chevronForwardOutline} />
                      </IonButton>
                    </div>
                  </div>
                  <div className="writing-reference-glyph hanunoo-glyph">{activeCharacter.glyph}</div>
                  <h2>{activeCharacter.unicodeName.replace('HANUNOO LETTER ', '')}</h2>
                  <p>{activeCharacter.codePoint} · {activeCharacter.note}</p>
                  <IonButton className="voice-button" fill="outline" onClick={speak}>
                    <IonIcon icon={volumeHighOutline} slot="start" />
                    Pakinggan <span>(voice guide)</span>
                  </IonButton>
                  {voiceMessage && <small className="voice-message">{voiceMessage}</small>}
                </section>

                <section className="trace-card card">
                  <div className="trace-card-heading">
                    <div>
                      <span className="meta">TRACING PRACTICE</span>
                      <h2>Sundan ang gabay</h2>
                    </div>
                    <span className="trace-number">{characterIndex + 1}/{practiceCharacters.length}</span>
                  </div>
                  <TracePad glyph={activeCharacter.glyph} resetKey={resetKey} onTrace={() => setTraced(true)} />
                  <div className="writing-actions">
                    <IonButton fill="outline" onClick={resetPractice}>
                      <IonIcon icon={refreshOutline} slot="start" />
                      Reset
                    </IonButton>
                    <IonButton
                      className="primary-writing-action"
                      disabled={!traced && !stepSaved}
                      onClick={() => void saveOrContinue()}
                    >
                      <IonIcon
                        icon={stepSaved ? (isLastCharacter ? refreshOutline : chevronForwardOutline) : checkmarkCircleOutline}
                        slot="end"
                      />
                      {stepSaved ? (isLastCharacter ? 'Ulitin ang aralin' : 'Susunod') : 'I-save ang practice'}
                    </IonButton>
                  </div>
                </section>

                {showSuccess && (
                  <section className="success-banner">
                    <div className="success-icon"><IonIcon icon={checkmarkCircleOutline} /></div>
                    <div>
                      <span className="meta">PRACTICE SAVED LOCALLY</span>
                      <h2>{isLastCharacter ? 'Napakahusay!' : 'Magaling!'}</h2>
                      <p>
                        {isLastCharacter
                          ? 'Natapos mo ang lahat ng verified letters sa Hanunó’o.'
                          : 'Naitala ang iyong pagsasanay sa device. Patuloy lang sa pagkatuto!'}
                      </p>
                    </div>
                  </section>
                )}

                <p className="writing-source-note">
                  Ang voice guide ay gumagamit ng offline text-to-speech ng device kapag available. Ang “i or e” at “u or o” ay
                  sadyang ipinapakitang alternatibo dahil ganoon inilalarawan ng source ang mga tunog na ito.
                </p>
              </>
            ) : (
              <section className="buhid-gate card">
                <span className="meta">BUHID LESSON</span>
                <h2>Source review in progress</h2>
                <p>
                  Hindi muna ipinapakita ang glyphs upang hindi mapalitan ang Buhid ng Hanunó’o. Ang verified Buhid source at
                  pronunciation guide ay idaragdag bilang hiwalay na aralin.
                </p>
                <IonButton fill="outline" onClick={() => changeScript('Hanunó’o')}>Bumalik sa Hanunó’o</IonButton>
              </section>
            )}
          </section>

          <nav className="writing-bottom-nav" aria-label="Main navigation">
            <IonButton fill="clear" onClick={() => history.push('/home')}>
              <IonIcon icon={homeOutline} /><span>Home</span>
            </IonButton>
            <IonButton fill="clear" onClick={() => history.push('/learn')}>
              <IonIcon icon={bookOutline} /><span>Matuto</span>
            </IonButton>
            <IonButton fill="clear" className="active">
              <IonIcon icon={pencilOutline} /><span>Sulat</span>
            </IonButton>
            <IonButton fill="clear" onClick={() => history.push('/explore')}>
              <IonIcon icon={mapOutline} /><span>Lakbay</span>
            </IonButton>
            <IonButton fill="clear" onClick={() => history.push('/quest')}>
              <IonIcon icon={trophyOutline} /><span>Quest</span>
            </IonButton>
          </nav>
        </main>
      </IonContent>
    </IonPage>
  );
}
