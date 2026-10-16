import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonPage,
  IonSearchbar,
  IonTextarea,
} from '@ionic/react';
import {
  arrowUndoOutline,
  bookOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  createOutline,
  downloadOutline,
  imagesOutline,
  libraryOutline,
  pencilOutline,
  playOutline,
  refreshOutline,
  saveOutline,
  searchOutline,
  trashOutline,
  volumeHighOutline,
  volumeMuteOutline,
} from 'ionicons/icons';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { ModuleHeader, PageFrame } from '../components/AppChrome';
import { offlineVocabulary } from '../data/filipino-vocabulary';
import { hanunooCharacters } from '../data/hanunoo';
import {
  hanunooTransliterationSources,
  transliterateFilipino,
} from '../data/hanunoo-transliteration';
import type { TransliterationResult } from '../data/hanunoo-transliteration';
import { createPronunciationPlayer, verifiedPronunciations } from '../services/pronunciation';
import {
  deleteWritingRecord,
  exportWritingImage,
  listWritingRecords,
  renameWritingRecord,
  saveWritingRecord,
} from '../services/storage';
import type { PracticeType, WritingRecord, WritingStroke } from '../services/storage';

type SulatSection = 'learn' | 'convert' | 'practice' | 'words' | 'history';
type PracticeMode = 'guided' | 'freehand';

type PracticeTarget = {
  label: string;
  originalText: string;
  hanunooText: string;
  practiceType: 'Character' | 'Word';
};

type TraceSnapshot = {
  strokes: WritingStroke[];
  imageDataUrl: string;
  thumbnailDataUrl: string;
};

type TracePadHandle = {
  clear: () => void;
  undo: () => void;
  snapshot: () => TraceSnapshot;
};

type TracePadProps = {
  referenceText: string;
  mode: PracticeMode;
  resetKey: number;
  initialStrokes?: WritingStroke[];
  onStrokeCountChange: (count: number) => void;
};

const practiceCharacters = hanunooCharacters.filter(
  (character) => character.category === 'independent_vowel' || character.category === 'consonant',
);

const firstCharacter = practiceCharacters[0];

const defaultTarget: PracticeTarget = {
  label: firstCharacter.unicodeName.replace('HANUNOO LETTER ', ''),
  originalText: firstCharacter.voiceGuide,
  hanunooText: firstCharacter.glyph,
  practiceType: 'Character',
};

function drawStrokes(context: CanvasRenderingContext2D, strokes: WritingStroke[]) {
  context.strokeStyle = '#9f5038';
  context.lineWidth = 10;
  context.lineCap = 'round';
  context.lineJoin = 'round';
  for (const stroke of strokes) {
    if (!stroke.length) continue;
    context.beginPath();
    context.moveTo(stroke[0].x, stroke[0].y);
    if (stroke.length === 1) context.lineTo(stroke[0].x + 0.1, stroke[0].y + 0.1);
    for (const point of stroke.slice(1)) context.lineTo(point.x, point.y);
    context.stroke();
  }
}

const TracePad = forwardRef<TracePadHandle, TracePadProps>(function TracePad(
  { referenceText, mode, resetKey, initialStrokes = [], onStrokeCountChange },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const strokesRef = useRef<WritingStroke[]>([]);
  const activeStrokeRef = useRef<WritingStroke>([]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fffdf7';
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (mode === 'guided') {
      let fontSize = referenceText.length <= 2 ? 235 : 112;
      context.font = `${fontSize}px "Noto Sans Hanunoo"`;
      while (context.measureText(referenceText).width > canvas.width - 90 && fontSize > 54) {
        fontSize -= 6;
        context.font = `${fontSize}px "Noto Sans Hanunoo"`;
      }
      context.fillStyle = 'rgba(128, 69, 44, 0.12)';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(referenceText, canvas.width / 2, canvas.height / 2 - 8);
    }

    drawStrokes(context, [...strokesRef.current, activeStrokeRef.current]);
  }, [mode, referenceText]);

  useEffect(() => {
    strokesRef.current = initialStrokes.map((stroke) => stroke.map((point) => ({ ...point })));
    activeStrokeRef.current = [];
    onStrokeCountChange(strokesRef.current.length);
    paint();
  }, [resetKey, referenceText, initialStrokes, onStrokeCountChange]);

  useEffect(() => {
    paint();
    void document.fonts?.ready.then(paint);
  }, [paint]);

  const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
    };
  };

  const startDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    drawingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    activeStrokeRef.current = [getPoint(event)];
    paint();
  };

  const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!drawingRef.current) return;
    event.preventDefault();
    activeStrokeRef.current.push(getPoint(event));
    paint();
  };

  const finishDrawing = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    if (activeStrokeRef.current.length) strokesRef.current.push(activeStrokeRef.current);
    activeStrokeRef.current = [];
    onStrokeCountChange(strokesRef.current.length);
    paint();
  };

  useImperativeHandle(ref, () => ({
    clear() {
      strokesRef.current = [];
      activeStrokeRef.current = [];
      onStrokeCountChange(0);
      paint();
    },
    undo() {
      strokesRef.current.pop();
      activeStrokeRef.current = [];
      onStrokeCountChange(strokesRef.current.length);
      paint();
    },
    snapshot() {
      const full = document.createElement('canvas');
      full.width = 720;
      full.height = 400;
      const fullContext = full.getContext('2d');
      if (!fullContext) throw new Error('Canvas export is unavailable.');
      fullContext.fillStyle = '#fffdf7';
      fullContext.fillRect(0, 0, full.width, full.height);
      drawStrokes(fullContext, strokesRef.current);

      const thumbnail = document.createElement('canvas');
      thumbnail.width = 240;
      thumbnail.height = 134;
      const thumbnailContext = thumbnail.getContext('2d');
      if (!thumbnailContext) throw new Error('Thumbnail export is unavailable.');
      thumbnailContext.drawImage(full, 0, 0, thumbnail.width, thumbnail.height);

      return {
        strokes: strokesRef.current.map((stroke) => stroke.map((point) => ({ ...point }))),
        imageDataUrl: full.toDataURL('image/png'),
        thumbnailDataUrl: thumbnail.toDataURL('image/png'),
      };
    },
  }), [onStrokeCountChange, paint]);

  return (
    <div className="sulat-trace-pad">
      <canvas
        ref={canvasRef}
        width={720}
        height={400}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={finishDrawing}
        onPointerCancel={finishDrawing}
        aria-label={`Writing canvas for ${referenceText}`}
      />
      <span>{mode === 'guided' ? 'Sundan ang mapusyaw na gabay' : 'Malayang pagsulat—tingnan ang reference sa itaas'}</span>
    </div>
  );
});

const sectionItems: Array<{ id: SulatSection; label: string; icon: typeof bookOutline }> = [
  { id: 'learn', label: 'Characters', icon: bookOutline },
  { id: 'convert', label: 'Convert', icon: createOutline },
  { id: 'practice', label: 'Practice', icon: pencilOutline },
  { id: 'words', label: 'Words', icon: libraryOutline },
  { id: 'history', label: 'Writings', icon: imagesOutline },
];

const formatDate = (value: string) => new Intl.DateTimeFormat('fil-PH', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
}).format(new Date(value));

export default function WritingPage() {
  const [section, setSection] = useState<SulatSection>('learn');
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const [convertInput, setConvertInput] = useState('Pinoy');
  const [conversion, setConversion] = useState<TransliterationResult>(() => transliterateFilipino('Pinoy'));
  const [wordSearch, setWordSearch] = useState('');
  const [practiceTarget, setPracticeTarget] = useState<PracticeTarget>(defaultTarget);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('guided');
  const [practiceInitialStrokes, setPracticeInitialStrokes] = useState<WritingStroke[]>([]);
  const [traceResetKey, setTraceResetKey] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);
  const [practiceNote, setPracticeNote] = useState('');
  const [practiceMessage, setPracticeMessage] = useState('');
  const [records, setRecords] = useState<WritingRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<WritingRecord>();
  const [renameLabel, setRenameLabel] = useState('');
  const [audioMuted, setAudioMuted] = useState(false);
  const [audioMessage, setAudioMessage] = useState('');
  const tracePadRef = useRef<TracePadHandle>(null);
  const playerRef = useRef(createPronunciationPlayer());

  const activeCharacter = practiceCharacters[selectedCharacterIndex];
  const vocabularyResults = useMemo(() => {
    const query = wordSearch.trim().toLocaleLowerCase('fil-PH');
    if (!query) return offlineVocabulary;
    return offlineVocabulary.filter((entry) => (
      entry.word.toLocaleLowerCase('fil-PH').includes(query)
      || entry.meaning.toLocaleLowerCase('fil-PH').includes(query)
      || entry.category.toLocaleLowerCase('fil-PH').includes(query)
    ));
  }, [wordSearch]);

  const refreshRecords = useCallback(async () => {
    const next = await listWritingRecords();
    setRecords(next);
    if (selectedRecord) setSelectedRecord(next.find((record) => record.id === selectedRecord.id));
  }, [selectedRecord]);

  useEffect(() => {
    void listWritingRecords().then(setRecords);
    return () => playerRef.current.stop();
  }, []);

  const openPractice = (
    target: PracticeTarget,
    mode: PracticeMode = 'guided',
    initialStrokes: WritingStroke[] = [],
  ) => {
    setPracticeTarget(target);
    setPracticeMode(mode);
    setPracticeInitialStrokes(initialStrokes);
    setPracticeMessage('');
    setPracticeNote('');
    setTraceResetKey((value) => value + 1);
    setSection('practice');
  };

  const practiceCharacter = (index: number) => {
    const character = practiceCharacters[index];
    setSelectedCharacterIndex(index);
    openPractice({
      label: character.unicodeName.replace('HANUNOO LETTER ', ''),
      originalText: character.voiceGuide,
      hanunooText: character.glyph,
      practiceType: 'Character',
    });
  };

  const practiceWord = (word: string, script: string, mode: PracticeMode = 'guided') => {
    openPractice({ label: word, originalText: word, hanunooText: script, practiceType: 'Word' }, mode);
  };

  const runConversion = () => {
    const clean = convertInput.trim().slice(0, 60);
    setConversion(transliterateFilipino(clean));
  };

  const playCharacter = async (codePoint: string, replay = false) => {
    const outcome = await playerRef.current.play(codePoint, replay);
    const messages = {
      played: replay ? 'Verified recording replayed.' : 'Playing verified local recording.',
      muted: 'Audio is muted. Tap Unmute to listen.',
      unavailable: 'No community-verified recording is bundled for this character. No synthetic voice was substituted.',
      error: 'The verified recording could not be played on this device.',
    };
    setAudioMessage(messages[outcome]);
  };

  const toggleMute = () => {
    const next = !audioMuted;
    setAudioMuted(next);
    playerRef.current.setMuted(next);
    setAudioMessage(next ? 'Pronunciation audio muted.' : 'Pronunciation audio unmuted.');
  };

  const savePractice = async () => {
    if (!strokeCount || !tracePadRef.current) {
      setPracticeMessage('Gumuhit muna ng kahit isang stroke bago mag-save.');
      return;
    }
    try {
      const snapshot = tracePadRef.current.snapshot();
      const practiceType: PracticeType = practiceTarget.practiceType === 'Character'
        ? 'Character'
        : practiceMode === 'freehand' ? 'Freehand' : 'Word';
      await saveWritingRecord({
        label: practiceTarget.label,
        originalText: practiceTarget.originalText,
        hanunooText: practiceTarget.hanunooText,
        practiceType,
        strokes: snapshot.strokes,
        imageDataUrl: snapshot.imageDataUrl,
        thumbnailDataUrl: snapshot.thumbnailDataUrl,
        note: practiceNote.trim(),
      });
      await refreshRecords();
      setPracticeMessage('Naka-save ang strokes, preview, at detalye sa offline practice history.');
    } catch (error) {
      console.error(error);
      setPracticeMessage('Hindi na-save ang practice. Subukan muli.');
    }
  };

  const clearPractice = () => {
    tracePadRef.current?.clear();
    setPracticeMessage('');
  };

  const retryPractice = () => {
    setPracticeInitialStrokes([]);
    setTraceResetKey((value) => value + 1);
    setPracticeMessage('Bagong attempt—magsimula muli sa canvas.');
  };

  const nextPractice = () => {
    if (practiceTarget.practiceType === 'Character') {
      const currentIndex = practiceCharacters.findIndex((item) => item.glyph === practiceTarget.hanunooText);
      practiceCharacter((currentIndex + 1 + practiceCharacters.length) % practiceCharacters.length);
      return;
    }
    const currentIndex = offlineVocabulary.findIndex((item) => item.word === practiceTarget.originalText);
    const next = offlineVocabulary[(currentIndex + 1 + offlineVocabulary.length) % offlineVocabulary.length];
    practiceWord(next.word, next.transliteration.script, practiceMode);
  };

  const exportRecord = async (record: WritingRecord) => {
    if (!record.imageDataUrl) return;
    try {
      if (await exportWritingImage(record)) {
        setPracticeMessage('Binuksan ang Android share sheet para sa exported PNG.');
        return;
      }
    } catch (error) {
      console.warn('Native image export was cancelled or failed.', error);
      setPracticeMessage('Hindi natuloy ang Android image export. Subukan muli.');
      return;
    }
    const anchor = document.createElement('a');
    anchor.href = record.imageDataUrl;
    anchor.download = `sulat-pamana-${record.label.toLocaleLowerCase('fil-PH').replace(/[^a-z0-9]+/g, '-')}.png`;
    anchor.click();
  };

  const renameRecord = async () => {
    if (!selectedRecord || !renameLabel.trim()) return;
    await renameWritingRecord(selectedRecord.id, renameLabel);
    await refreshRecords();
    setPracticeMessage('Napalitan ang pangalan ng saved writing.');
  };

  const removeRecord = async (record: WritingRecord) => {
    if (!window.confirm(`Delete “${record.label}” and its stored images?`)) return;
    await deleteWritingRecord(record.id);
    setSelectedRecord(undefined);
    setRenameLabel('');
    await refreshRecords();
  };

  const openRecord = (record: WritingRecord) => {
    setSelectedRecord(record);
    setRenameLabel(record.label);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="writing">
          <ModuleHeader
            title="Sulat Pamana"
            subtitle="Learn, transliterate, trace, and keep your Hanunó’o writing practice offline."
            icon={pencilOutline}
          />

          <nav className="sulat-section-nav" aria-label="Sulat Pamana sections">
            {sectionItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={section === item.id ? 'active' : ''}
                onClick={() => setSection(item.id)}
                aria-current={section === item.id ? 'page' : undefined}
              >
                <IonIcon icon={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <section className="sulat-content">
            {section === 'learn' && (
              <>
                <div className="sulat-title-row">
                  <div>
                    <p className="module-kicker">LEARN CHARACTERS</p>
                    <h2>Hanunó’o character inventory</h2>
                  </div>
                  <span>{hanunooCharacters.length} Unicode characters</span>
                </div>

                <div className="sulat-audio-bar card">
                  <div>
                    <strong>Verified audio only</strong>
                    <small>{Object.keys(verifiedPronunciations).length} reviewed recordings bundled</small>
                  </div>
                  <IonButton fill="outline" onClick={toggleMute}>
                    <IonIcon icon={audioMuted ? volumeHighOutline : volumeMuteOutline} slot="start" />
                    {audioMuted ? 'Unmute' : 'Mute'}
                  </IonButton>
                </div>
                {audioMessage && <p className="sulat-status" role="status">{audioMessage}</p>}

                <div className="sulat-character-grid">
                  {hanunooCharacters.map((character) => {
                    const practiceIndex = practiceCharacters.findIndex((item) => item.codePoint === character.codePoint);
                    const canSpeak = Boolean(character.reading) && character.category !== 'pamudpod' && character.category !== 'punctuation';
                    return (
                      <article
                        key={character.codePoint}
                        className={`sulat-character-card card ${activeCharacter.codePoint === character.codePoint ? 'selected' : ''}`}
                      >
                        <button
                          type="button"
                          className="sulat-character-select"
                          onClick={() => practiceIndex >= 0 && setSelectedCharacterIndex(practiceIndex)}
                          aria-label={`Select ${character.unicodeName}`}
                        >
                          <span className="hanunoo-glyph">{character.displayGlyph}</span>
                          <strong>{character.unicodeName.replace('HANUNOO ', '').replace('PHILIPPINE ', '')}</strong>
                          <small>{character.codePoint} · {character.reading ?? 'silent mark'}</small>
                        </button>
                        <div className="sulat-character-actions">
                          {canSpeak ? (
                            <>
                              <button type="button" onClick={() => void playCharacter(character.codePoint)} aria-label="Play verified pronunciation">
                                <IonIcon icon={playOutline} /> Play
                              </button>
                              <button type="button" onClick={() => void playCharacter(character.codePoint, true)} aria-label="Replay verified pronunciation">
                                <IonIcon icon={refreshOutline} /> Replay
                              </button>
                            </>
                          ) : <span>No standalone sound</span>}
                        </div>
                        {practiceIndex >= 0 && (
                          <IonButton fill="clear" onClick={() => practiceCharacter(practiceIndex)}>Trace</IonButton>
                        )}
                      </article>
                    );
                  })}
                </div>

                <p className="sulat-cultural-note">
                  Audio is intentionally unavailable until a knowledgeable Hanunó’o speaker’s recording and review details can be bundled.
                  Device text-to-speech is not used as a substitute.
                </p>
              </>
            )}

            {section === 'convert' && (
              <>
                <div className="sulat-title-row">
                  <div>
                    <p className="module-kicker">WRITE AND CONVERT</p>
                    <h2>Filipino sound transliteration</h2>
                  </div>
                </div>
                <div className="sulat-convert-form card">
                  <label htmlFor="filipino-word">Filipino or Tagalog word</label>
                  <div>
                    <IonInput
                      id="filipino-word"
                      value={convertInput}
                      maxlength={60}
                      placeholder="Halimbawa: Pinoy"
                      onIonInput={(event) => setConvertInput(String(event.detail.value ?? ''))}
                      onKeyDown={(event) => event.key === 'Enter' && runConversion()}
                    />
                    <IonButton onClick={runConversion} disabled={!convertInput.trim()}>
                      <IonIcon icon={searchOutline} slot="start" />
                      Convert
                    </IonButton>
                  </div>
                  <small>This produces a script transliteration, not a Hanunó’o-language translation.</small>
                </div>

                {conversion.script && (
                  <section className="sulat-conversion-result card" aria-live="polite">
                    <div className="sulat-result-heading">
                      <div>
                        <span className={`sulat-result-badge ${conversion.complete ? 'supported' : 'partial'}`}>
                          {conversion.complete ? (conversion.exact ? 'SUPPORTED' : 'SUPPORTED · SHARED VOWEL SIGNS') : 'PARTIAL ONLY'}
                        </span>
                        <h3>{conversion.input}</h3>
                      </div>
                      <IonButton fill="clear" onClick={() => setConversion(transliterateFilipino(''))} aria-label="Close result">
                        <IonIcon icon={closeOutline} />
                      </IonButton>
                    </div>
                    <div className="sulat-script-result hanunoo-glyph">{conversion.script}</div>
                    <p className="sulat-syllables">{conversion.syllables.join(' · ')}</p>

                    <div className="sulat-breakdown">
                      {conversion.segments.map((segment, index) => (
                        <div key={`${segment.latin}-${index}`} className={!segment.supported ? 'unsupported' : ''}>
                          <span>{segment.latin}</span>
                          <strong className="hanunoo-glyph">{segment.glyph || '—'}</strong>
                          <small>{segment.explanation}</small>
                        </div>
                      ))}
                    </div>

                    {conversion.issues.map((issue) => <p key={issue} className="sulat-warning">{issue}</p>)}
                    {conversion.notes.map((note) => <p key={note} className="sulat-info">{note}</p>)}
                    <p className="sulat-info">No Hanunó’o-language meaning is claimed for this Filipino word.</p>

                    <div className="sulat-result-actions">
                      <IonButton
                        fill="outline"
                        onClick={() => setAudioMessage('No verified word recording is bundled. No synthetic pronunciation was played.')}
                      >
                        <IonIcon icon={volumeHighOutline} slot="start" /> Audio status
                      </IonButton>
                      <IonButton
                        disabled={!conversion.complete}
                        onClick={() => practiceWord(conversion.input, conversion.script)}
                      >
                        <IonIcon icon={pencilOutline} slot="start" /> Trace result
                      </IonButton>
                    </div>
                    {audioMessage && <p className="sulat-status" role="status">{audioMessage}</p>}
                  </section>
                )}

                <div className="sulat-source-box">
                  <strong>Conversion rules</strong>
                  <p>Inherent a, the shared i/e and u/o combining signs, and modern pamudpod use follow the cited orthography references.</p>
                  {hanunooTransliterationSources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
                  ))}
                </div>
              </>
            )}

            {section === 'practice' && (
              <>
                <div className="sulat-title-row">
                  <div>
                    <p className="module-kicker">TRACE AND PRACTICE</p>
                    <h2>{practiceTarget.label}</h2>
                  </div>
                  <span>{practiceTarget.practiceType}</span>
                </div>

                <section className="sulat-practice-reference card">
                  <div>
                    <span>REFERENCE</span>
                    <strong>{practiceTarget.originalText}</strong>
                  </div>
                  <div className="hanunoo-glyph">{practiceTarget.hanunooText}</div>
                </section>

                <div className="sulat-mode-switch" role="group" aria-label="Writing mode">
                  <button type="button" className={practiceMode === 'guided' ? 'active' : ''} onClick={() => setPracticeMode('guided')}>Guided tracing</button>
                  <button type="button" className={practiceMode === 'freehand' ? 'active' : ''} onClick={() => setPracticeMode('freehand')}>Freehand</button>
                </div>

                <section className="sulat-practice-card card">
                  <TracePad
                    ref={tracePadRef}
                    referenceText={practiceTarget.hanunooText}
                    mode={practiceMode}
                    resetKey={traceResetKey}
                    initialStrokes={practiceInitialStrokes}
                    onStrokeCountChange={setStrokeCount}
                  />
                  <div className="sulat-canvas-tools">
                    <IonButton fill="outline" onClick={clearPractice}><IonIcon icon={closeOutline} slot="start" />Clear</IonButton>
                    <IonButton fill="outline" disabled={!strokeCount} onClick={() => tracePadRef.current?.undo()}><IonIcon icon={arrowUndoOutline} slot="start" />Undo</IonButton>
                    <IonButton fill="outline" onClick={retryPractice}><IonIcon icon={refreshOutline} slot="start" />Retry</IonButton>
                    <IonButton fill="outline" onClick={nextPractice}><IonIcon icon={chevronForwardOutline} slot="start" />Next</IonButton>
                  </div>
                  <IonTextarea
                    className="sulat-note-input"
                    value={practiceNote}
                    maxlength={180}
                    autoGrow
                    placeholder="Optional personal note"
                    onIonInput={(event) => setPracticeNote(String(event.detail.value ?? ''))}
                  />
                  <IonButton className="sulat-save-button" expand="block" disabled={!strokeCount} onClick={() => void savePractice()}>
                    <IonIcon icon={saveOutline} slot="start" />
                    Save to My Writings
                  </IonButton>
                  {practiceMessage && <p className="sulat-status" role="status">{practiceMessage}</p>}
                </section>
                <p className="sulat-cultural-note">Feedback confirms participation only; it does not claim that handwriting or language use is correct.</p>
              </>
            )}

            {section === 'words' && (
              <>
                <div className="sulat-title-row">
                  <div>
                    <p className="module-kicker">COMMON WORDS</p>
                    <h2>Offline Filipino vocabulary</h2>
                  </div>
                  <span>{vocabularyResults.length} of {offlineVocabulary.length}</span>
                </div>
                <IonSearchbar
                  className="sulat-word-search"
                  value={wordSearch}
                  placeholder="Search word, meaning, or category"
                  onIonInput={(event) => setWordSearch(String(event.detail.value ?? ''))}
                />
                {audioMessage && <p className="sulat-status" role="status">{audioMessage}</p>}
                <div className="sulat-word-list">
                  {vocabularyResults.map((entry) => (
                    <article key={entry.id} className="sulat-word-card card">
                      <div className="sulat-word-topline">
                        <div><span>{entry.category}</span><h3>{entry.word}</h3></div>
                        <div className="hanunoo-glyph">{entry.transliteration.script}</div>
                      </div>
                      <p>{entry.meaning}</p>
                      <p className="sulat-syllables">{entry.transliteration.syllables.join(' · ')}</p>
                      <details>
                        <summary>Character-by-character breakdown</summary>
                        {entry.transliteration.segments.map((segment, index) => (
                          <div key={`${entry.id}-${index}`}>
                            <span>{segment.latin}</span>
                            <strong className="hanunoo-glyph">{segment.glyph}</strong>
                            <small>{segment.explanation}</small>
                          </div>
                        ))}
                      </details>
                      <div className="sulat-translation-label">
                        <strong>Hanunó’o-language translation</strong>
                        <span>Not supplied—no reviewed translation is available in the bundled data.</span>
                      </div>
                      <div className="sulat-word-actions">
                        <IonButton fill="outline" onClick={() => setAudioMessage('No verified word recording is bundled. No synthetic pronunciation was played.')}>
                          <IonIcon icon={volumeHighOutline} slot="start" /> Audio status
                        </IonButton>
                        <IonButton fill="outline" onClick={() => practiceWord(entry.word, entry.transliteration.script)}>
                          <IonIcon icon={pencilOutline} slot="start" /> Trace Writing
                        </IonButton>
                        <IonButton onClick={() => practiceWord(entry.word, entry.transliteration.script, 'freehand')}>
                          <IonIcon icon={saveOutline} slot="start" /> Save Practice
                        </IonButton>
                      </div>
                    </article>
                  ))}
                  {!vocabularyResults.length && <div className="sulat-empty"><IonIcon icon={searchOutline} /><h3>No matching words</h3><p>Try a different Filipino word or category.</p></div>}
                </div>
              </>
            )}

            {section === 'history' && (
              <>
                <div className="sulat-title-row">
                  <div>
                    <p className="module-kicker">MY WRITINGS</p>
                    <h2>Offline practice history</h2>
                  </div>
                  <span>{records.length} saved</span>
                </div>
                {practiceMessage && <p className="sulat-status" role="status">{practiceMessage}</p>}

                {selectedRecord ? (
                  <section className="sulat-record-detail card">
                    <div className="sulat-record-heading">
                      <IonButton fill="clear" onClick={() => setSelectedRecord(undefined)}><IonIcon icon={chevronBackOutline} slot="start" />Gallery</IonButton>
                      <span>{selectedRecord.practiceType}</span>
                    </div>
                    {selectedRecord.imageDataUrl && <img src={selectedRecord.imageDataUrl} alt={`Saved handwriting for ${selectedRecord.label}`} />}
                    <div className="sulat-record-script hanunoo-glyph">{selectedRecord.hanunooText}</div>
                    <h3>{selectedRecord.originalText}</h3>
                    <p>{formatDate(selectedRecord.createdAt)}</p>
                    {selectedRecord.note && <blockquote>{selectedRecord.note}</blockquote>}
                    <div className="sulat-rename-row">
                      <IonInput value={renameLabel} maxlength={80} onIonInput={(event) => setRenameLabel(String(event.detail.value ?? ''))} />
                      <IonButton fill="outline" onClick={() => void renameRecord()}>Rename</IonButton>
                    </div>
                    <div className="sulat-record-actions">
                      <IonButton fill="outline" onClick={() => openPractice({
                        label: selectedRecord.label,
                        originalText: selectedRecord.originalText,
                        hanunooText: selectedRecord.hanunooText,
                        practiceType: selectedRecord.practiceType === 'Character' ? 'Character' : 'Word',
                      }, selectedRecord.practiceType === 'Freehand' ? 'freehand' : 'guided', selectedRecord.strokes)}>
                        <IonIcon icon={refreshOutline} slot="start" /> Practice Again
                      </IonButton>
                      <IonButton fill="outline" disabled={!selectedRecord.imageDataUrl} onClick={() => void exportRecord(selectedRecord)}>
                        <IonIcon icon={downloadOutline} slot="start" /> Export Image
                      </IonButton>
                      <IonButton color="danger" fill="outline" onClick={() => void removeRecord(selectedRecord)}>
                        <IonIcon icon={trashOutline} slot="start" /> Delete
                      </IonButton>
                    </div>
                  </section>
                ) : records.length ? (
                  <div className="sulat-history-grid">
                    {records.map((record) => (
                      <button key={record.id} type="button" className="sulat-history-card card" onClick={() => openRecord(record)}>
                        {record.thumbnailDataUrl ? <img src={record.thumbnailDataUrl} alt="" /> : <div className="hanunoo-glyph">{record.hanunooText}</div>}
                        <span>{record.practiceType}</span>
                        <strong>{record.label}</strong>
                        <small>{formatDate(record.createdAt)}</small>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="sulat-empty card">
                    <IonIcon icon={imagesOutline} />
                    <h3>Wala pang saved writing</h3>
                    <p>Trace a character or word, then save it to build your private offline gallery.</p>
                    <IonButton onClick={() => setSection('practice')}>Start practicing</IonButton>
                  </div>
                )}
              </>
            )}
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}

