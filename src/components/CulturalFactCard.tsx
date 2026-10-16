import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { culturalFacts, CulturalFact } from '../data/cultural-facts';
import { imageById, photoForFestival, photoForPlace } from '../data/gallery';
import { getCulturalFact, localDay } from '../services/fact-rotation';
import { sourceById } from '../data/content';
import { MediaCredit } from './MediaFigure';
import { SourceNotes } from './HeritageUI';

export default function CulturalFactCard() {
  const [fact, setFact] = useState<CulturalFact>();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const day = useRef('');
  const pending = useRef(false);
  const alive = useRef(true);
  const refresh = useCallback(async (another = false) => {
    if (pending.current) return;
    pending.current = true; setBusy(true); setError('');
    try {
      const selected = await getCulturalFact(culturalFacts, another);
      if (alive.current) { setFact(selected); day.current = localDay(); }
    } catch { if (alive.current) setError('Your fact selection could not be saved. Try again to keep your reading history.'); }
    finally { pending.current = false; if (alive.current) setBusy(false); }
  }, []);
  useEffect(() => {
    alive.current = true;
    void refresh();
    const checkDay = () => { if (document.visibilityState === 'visible' && day.current !== localDay()) void refresh(); };
    const timer = window.setInterval(checkDay, 30_000);
    document.addEventListener('visibilitychange', checkDay);
    window.addEventListener('focus', checkDay);
    return () => { alive.current = false; window.clearInterval(timer); document.removeEventListener('visibilitychange', checkDay); window.removeEventListener('focus', checkDay); };
  }, [refresh]);
  const candidate = fact && (imageById(fact.imageId) || (fact.placeId ? photoForPlace(fact.placeId) : fact.festivalId ? photoForFestival(fact.festivalId) : undefined));
  const image = candidate?.subjectStatus === 'mismatch' ? undefined : candidate;
  const source = fact?.sourceIds.map(sourceById).find(Boolean);
  return <section className="cultural-fact-card" aria-label="Daily cultural fact" aria-busy={busy}>
    <div className="fact-heading"><span className="eyebrow">A LITTLE DISCOVERY, EVERY DAY</span><span>{culturalFacts.length} readings · offline</span></div>
    <div className={`fact-reading ${image ? 'has-image' : ''}`}>
      {image && <figure><img src={image.src} alt={image.alt} loading="lazy" /><figcaption><MediaCredit image={image} /></figcaption></figure>}
      <div className="fact-copy" aria-live="polite" aria-atomic="true">
        <p className="fact-category">{fact?.category ?? 'Daily Cultural Fact'}{fact && ` · ${fact.locality}`}</p>
        <h2>{fact?.title ?? 'Opening today’s discovery…'}</h2>
        {fact && <><p>{fact.explanation}</p>{fact.referenceYear && <small className="fact-reference">Reference: {fact.referenceYear}</small>}<p className="fact-source">{source && <a href={source.url} target="_blank" rel="noreferrer">{source.publisher} ↗</a>}<span>Verified {fact.verifiedAt}</span></p></>}
      </div>
    </div>
    {fact && <><div className="fact-actions"><button type="button" className="primary-action" disabled={busy} onClick={() => void refresh(true)}>{busy ? 'Opening a discovery…' : 'Discover another fact'} <span aria-hidden="true">↗</span></button>{fact.placeId ? <Link className="text-action" to={`/explore?place=${fact.placeId}`}>Explore this place →</Link> : fact.festivalId ? <Link className="text-action" to={`/explore?festival=${fact.festivalId}`}>Explore the festival →</Link> : fact.lessonId && <Link className="text-action" to={`/learn?lesson=${fact.lessonId}`}>Keep learning →</Link>}</div><SourceNotes ids={fact.sourceIds} checked={fact.verifiedAt} /></>}
    {error && <div className="inline-status" role="alert">{error} <button className="text-action" disabled={busy} onClick={() => void refresh()}>Retry</button></div>}
    <p className="fact-footnote">A new selection each local day. Your reading history stays on this device.</p>
  </section>;
}
