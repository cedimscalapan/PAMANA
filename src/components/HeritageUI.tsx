import { IonIcon } from '@ionic/react';
import { arrowBackOutline, arrowForwardOutline, cloudOfflineOutline, imagesOutline, searchOutline, settingsOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mascot from '../assets/reference/ka-pamana-icon.png';
import { sourceById } from '../data/content';
import { LibraryMedia, LibraryState, mediaUrl, readLibrary } from '../services/library';

export function HeritageHero({ eyebrow, title, description, tone = 'green', image }: { eyebrow: string; title: string; description: string; tone?: string; image?: string }) {
  return <header className={`heritage-hero tone-${tone} ${image ? 'with-photo' : ''}`} style={image ? { backgroundImage: `linear-gradient(90deg,#FFFFFF 0%,rgba(255,255,255,.98) 40%,rgba(255,255,255,.89) 70%,rgba(255,255,255,.72) 100%),url(${image})` } : undefined}>
    <div className="heritage-topbar"><Link to="/home" className="heritage-brand"><img src={mascot} alt="" /><span>SMART <b>PAMANA</b></span></Link><Link to="/settings" className="round-action" aria-label="Open settings"><IonIcon icon={settingsOutline} /></Link></div>
    <div className="heritage-hero-copy"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p><span className="offline-label"><IonIcon icon={cloudOfflineOutline} /> Your heritage, always close.</span></div>
  </header>;
}

export function SearchField({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="heritage-search"><IonIcon icon={searchOutline} /><span className="sr-only">{placeholder}</span><input type="search" placeholder={placeholder} value={value} onChange={event => onChange(event.target.value)} /></label>;
}

export function FilterChips({ values, selected, onChange, label = 'Filter' }: { values: string[]; selected: string; onChange: (value: string) => void; label?: string }) {
  return <div className="filter-chips" role="group" aria-label={label}>{values.map(value => <button type="button" key={value} aria-pressed={selected === value} className={selected === value ? 'chosen' : ''} onClick={() => onChange(value)}>{value}</button>)}</div>;
}

export function DetailBack({ onBack, label }: { onBack: () => void; label: string }) {
  return <button type="button" className="detail-back" onClick={onBack}><IonIcon icon={arrowBackOutline} />{label}</button>;
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="heritage-empty"><IonIcon icon={imagesOutline} /><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function SourceNotes({ ids, checked = '17 October 2026' }: { ids: string[]; checked?: string }) {
  const sources = [...new Set(ids)].map(sourceById).filter(Boolean);
  return <details className="reference-notes"><summary>Sources &amp; reading <span>{sources.length} references</span></summary><p>Offline edition: {checked}. Source verification does not establish community approval or reproduction permission.</p>{sources.map(source => source && <a key={source.id} href={source.url} target="_blank" rel="noreferrer"><span><strong>{source.title}</strong><small>{source.publisher} · {source.status}</small></span><IonIcon icon={arrowForwardOutline} /></a>)}</details>;
}

export function useLibrary() {
  const [state, setState] = useState<LibraryState>(() => { try { return readLibrary(); } catch { return { version: 1, folders: [], media: [], memories: [] }; } });
  const [error, setError] = useState('');
  useEffect(() => {
    const refresh = () => { try { setState(readLibrary()); setError(''); } catch (error) { setError(error instanceof Error ? error.message : 'Your library could not be loaded.'); } };
    refresh();
    window.addEventListener('pamana-library-changed', refresh);
    window.addEventListener('storage', refresh);
    return () => { window.removeEventListener('pamana-library-changed', refresh); window.removeEventListener('storage', refresh); };
  }, []);
  return { state, setState, error };
}

export function LocalMedia({ item, full = false }: { item: LibraryMedia; full?: boolean }) {
  const [src, setSrc] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    let disposed = false;
    let url = '';
    setError(false); setSrc('');
    mediaUrl(item, !full).then(value => { url = value; if (!disposed) setSrc(value); else if (value.startsWith('blob:')) URL.revokeObjectURL(value); }).catch(() => { if (!disposed) setError(true); });
    return () => { disposed = true; if (url.startsWith('blob:')) URL.revokeObjectURL(url); };
  }, [item.id, item.path, full]);
  if (error) return <span className="media-unavailable">Media unavailable on this device</span>;
  if (!src) return <span className="media-loading" aria-label="Loading media" />;
  if (item.kind === 'video') return full ? <video src={src} controls playsInline preload="metadata" aria-label={item.title} /> : <span className="video-thumbnail"><video src={src} muted playsInline preload="metadata" /><span>▶ Video</span></span>;
  return <img src={src} alt={item.description || item.title} loading={full ? 'eager' : 'lazy'} onError={() => setError(true)} />;
}

