import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { Capacitor } from '@capacitor/core';
import { addOutline, arrowForwardOutline, calendarOutline, cameraOutline, imageOutline, locationOutline, lockClosedOutline, videocamOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Link, Prompt, useHistory, useLocation } from 'react-router-dom';
import { PageFrame } from '../components/AppChrome';
import { DetailBack, EmptyState, HeritageHero, LocalMedia, SearchField, useLibrary } from '../components/HeritageUI';
import MemoryCapture from '../components/MemoryCapture';
import { changeLibrary, localDateTime, Memory, MemoryDraft, saveMemory, validateMedia } from '../services/library';

const formatDate = (date: string) => date ? new Date(date).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' }) : 'Event date not recorded';

function MemoryEditor({ memory, onDone, onCancel }: { memory?: Memory; onDone: (id: string) => void; onCancel: () => void }) {
  const { state } = useLibrary();
  const [draft, setDraft] = useState<MemoryDraft>(() => memory ? { ...memory, occurredAt: memory.occurredAt ? localDateTime(new Date(memory.occurredAt)) : '' } : { title: '', description: '', location: '', occurredAt: localDateTime(), mediaIds: [] });
  const [pending, setPending] = useState<{ file: File; url: string }[]>([]);
  const pendingRef = useRef(pending); pendingRef.current = pending;
  const [capture, setCapture] = useState<'photo' | 'video'>();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [locating, setLocating] = useState(false);
  const [dirty, setDirty] = useState(false);
  const photoInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  useEffect(() => () => pendingRef.current.forEach(item => URL.revokeObjectURL(item.url)), []);
  const change = (patch: Partial<MemoryDraft>) => { setDraft(previous => ({ ...previous, ...patch })); setDirty(true); };
  const changeEventPart = (part: 'date' | 'time', value: string) => {
    setDraft(previous => {
      const [date, time] = previous.occurredAt.split('T');
      return { ...previous, occurredAt: part === 'date' ? `${value}T${time || '12:00'}` : `${date || localDateTime().split('T')[0]}T${value}` };
    });
    setDirty(true);
  };
  const addFiles = (files: File[]) => {
    try {
      files.forEach(validateMedia);
      setPending(previous => [...previous, ...files.map(file => ({ file, url: URL.createObjectURL(file) }))]);
      setError(''); setDirty(true); setCapture(undefined);
    } catch (error) { setError(error instanceof Error ? error.message : 'The media could not be opened.'); }
  };
  const record = (type: 'photo' | 'video') => {
    if (Capacitor.isNativePlatform()) (type === 'photo' ? photoInput : videoInput).current?.click();
    else setCapture(type);
  };
  const locate = () => {
    if (!navigator.geolocation) { setError('Location is unavailable here. You can type the place name instead.'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(position => {
      change({ latitude: position.coords.latitude, longitude: position.coords.longitude, location: draft.location || `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}` });
      setLocating(false); setError('');
    }, () => { setLocating(false); setError('Your location could not be found or permission was declined. Enter a place name manually.'); }, { timeout: 12000, enableHighAccuracy: false });
  };
  const save = async (event: React.FormEvent) => {
    event.preventDefault(); setSaving(true); setError('');
    const form = new FormData(event.currentTarget as HTMLFormElement);
    const eventDate = String(form.get('eventDate') ?? '');
    const eventTime = String(form.get('eventTime') ?? '');
    const occurredAt = eventDate && eventTime ? `${eventDate}T${eventTime}` : '';
    try {
      if (!memory && !pending.length && !draft.mediaIds.length) throw new Error('Add a photo or video to begin your memory.');
      if (!occurredAt && !memory) throw new Error('Add the date and time of your memory.');
      const next = await saveMemory({ ...draft, occurredAt: occurredAt ? new Date(occurredAt).toISOString() : '' }, pending.map(item => item.file));
      setDirty(false); onDone(draft.id ?? next.memories[0].id);
    } catch (error) { setError(error instanceof Error ? error.message : 'Your memory could not be saved. Please try again.'); }
    finally { setSaving(false); }
  };
  return <article className="heritage-body memory-editor">
    <Prompt when={dirty && !saving} message="Leave this memory? Your unsaved changes will be discarded." />
    <DetailBack onBack={onCancel} label="Your memories" /><span className="eyebrow">KEEP THE MOMENT. TELL ITS STORY.</span><h1>{memory ? 'Edit your memory' : 'A memory worth keeping'}</h1><p className="reading-lead">A photo, a place, a few words. Make the moment yours.</p>
    <form onSubmit={save}>
      <div className="capture-choices"><button type="button" onClick={() => record('photo')}><IonIcon icon={cameraOutline} /><strong>Take a photo</strong></button><button type="button" onClick={() => record('video')}><IonIcon icon={videocamOutline} /><strong>Record a video</strong></button><button type="button" onClick={() => galleryInput.current?.click()}><IonIcon icon={imageOutline} /><strong>Choose media</strong></button></div>
      <input ref={photoInput} className="sr-only" aria-hidden="true" tabIndex={-1} type="file" accept="image/*" capture="environment" onChange={event => { addFiles(Array.from(event.target.files ?? [])); event.target.value = ''; }} />
      <input ref={videoInput} className="sr-only" aria-hidden="true" tabIndex={-1} type="file" accept="video/*" capture="environment" onChange={event => { addFiles(Array.from(event.target.files ?? [])); event.target.value = ''; }} />
      <input ref={galleryInput} className="sr-only" aria-hidden="true" tabIndex={-1} type="file" accept="image/*,video/*" multiple onChange={event => { addFiles(Array.from(event.target.files ?? [])); event.target.value = ''; }} />
      <p className="quiet-note">Photos and videos up to 50 MB each. Camera availability depends on your device.</p>
      <div className="memory-media-previews">{draft.mediaIds.map(id => { const item = state.media.find(item => item.id === id); return item && <div key={id}><LocalMedia item={item} full /><button type="button" onClick={() => change({ mediaIds: draft.mediaIds.filter(value => value !== id) })}>Remove from memory</button></div>; })}{pending.map((item, index) => <div key={item.url}>{item.file.type.startsWith('video/') ? <video src={item.url} controls playsInline /> : <img src={item.url} alt={`Preview of ${item.file.name}`} />}<button type="button" onClick={() => { URL.revokeObjectURL(item.url); setPending(previous => previous.filter((_, position) => position !== index)); setDirty(true); }}>Remove / retake</button></div>)}</div>
      {!!state.media.filter(item => !draft.mediaIds.includes(item.id)).length && <details className="existing-media-picker"><summary>Add from Koleksyon</summary><div className="photo-grid">{state.media.filter(item => !draft.mediaIds.includes(item.id)).map(item => <button type="button" key={item.id} onClick={() => change({ mediaIds: [...draft.mediaIds, item.id] })}><LocalMedia item={item} /><span>{item.title}</span></button>)}</div></details>}
      <div className="journal-fields"><label>Give it a title<input required maxLength={160} placeholder="A morning by the lake" value={draft.title} onChange={event => change({ title: event.target.value })} /></label><label>Tell the story<textarea required rows={5} placeholder="What happened? What made this moment meaningful?" value={draft.description} onChange={event => change({ description: event.target.value })} /></label>
      <label>Where was this?<input placeholder="Place, barangay, or municipality" value={draft.location} onChange={event => change({ location: event.target.value, latitude: undefined, longitude: undefined })} /></label><button type="button" className="text-action location-action" disabled={locating} onClick={locate}><IonIcon icon={locationOutline} />{locating ? 'Finding your location…' : 'Use my current location'}</button>{draft.latitude !== undefined && <small>Coordinates saved: {draft.latitude.toFixed(5)}, {draft.longitude?.toFixed(5)} · Edit the place field to remove coordinates.</small>}
      <div className="date-time-fields"><label>Date<input name="eventDate" required={!memory} type="date" value={draft.occurredAt.split('T')[0] || ''} onInput={event => changeEventPart('date', event.currentTarget.value)} onChange={event => changeEventPart('date', event.currentTarget.value)} /></label><label>Time<input name="eventTime" required={!memory} type="time" value={draft.occurredAt.split('T')[1] || ''} onInput={event => changeEventPart('time', event.currentTarget.value)} onChange={event => changeEventPart('time', event.currentTarget.value)} /></label></div><p className="quiet-note">Use the date and local time of the event. Imported files may have different capture dates; check before saving.</p></div>
      {error && <p className="inline-status" role="alert">{error}</p>}<button className="primary-action wide" type="submit" disabled={saving}>{saving ? 'Saving your memory…' : 'Save memory'}</button><p className="privacy-caption"><IonIcon icon={lockClosedOutline} /> Private on this device · no account or upload</p>
    </form>{capture && <MemoryCapture mode={capture} onCapture={file => addFiles([file])} onClose={() => setCapture(undefined)} />}
  </article>;
}

export default function StoriesPage() {
  const history = useHistory();
  const location = useLocation();
  const { state, error: libraryError } = useLibrary();
  const content = useRef<HTMLIonContentElement>(null);
  const scroll = useRef(0);
  const params = new URLSearchParams(location.search);
  const id = params.get('memory');
  const selected = state.memories.find(memory => memory.id === id);
  const editing = id === 'new' || params.get('edit') === 'true';
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('All memories');
  const [status, setStatus] = useState('');
  useEffect(() => { void content.current?.scrollToPoint(0, id ? 0 : scroll.current, 0); setStatus(''); }, [id, editing]);
  const memories = state.memories.filter(memory => `${memory.title} ${memory.description} ${memory.location}`.toLowerCase().includes(query.toLowerCase()) && (kind === 'All memories' || memory.mediaIds.some(id => state.media.find(item => item.id === id)?.kind === (kind === 'Photos' ? 'photo' : 'video')))).sort((a, b) => (b.occurredAt || b.createdAt).localeCompare(a.occurredAt || a.createdAt));
  const remove = async () => {
    if (!selected || !window.confirm('Delete this memory? Its photos stay in Koleksyon so other memories keep working.')) return;
    try { await changeLibrary(state => ({ ...state, memories: state.memories.filter(memory => memory.id !== selected.id) })); history.replace('/stories'); } catch { setStatus('The memory could not be deleted. Please try again.'); }
  };
  return <IonPage><IonContent ref={content} scrollEvents onIonScroll={event => { if (!id) scroll.current = event.detail.scrollTop; }}><PageFrame active="stories">
    {editing ? <MemoryEditor key={id} memory={selected} onDone={id => { history.replace(`/stories?memory=${id}`); setStatus('Memory saved on this device.'); }} onCancel={() => history.replace(selected ? `/stories?memory=${selected.id}` : '/stories')} /> : selected ? <article className="heritage-body memory-detail reading-page">
      <DetailBack onBack={() => history.replace('/stories')} label="Your memories" /><span className="eyebrow">YOUR OWN LITTLE PIECE OF PAMANA</span><h1>{selected.title}</h1><div className="memory-facts"><span><IonIcon icon={calendarOutline} />{formatDate(selected.occurredAt)}</span>{selected.location && <span><IonIcon icon={locationOutline} />{selected.location}</span>}</div>
      <div className="memory-detail-media">{selected.mediaIds.map(id => { const item = state.media.find(item => item.id === id); return item && <figure key={id}><LocalMedia item={item} full />{item.kind === 'photo' && <figcaption><Link to={`/collection?photo=${id}`}>Open photo in Koleksyon ↗</Link></figcaption>}</figure>; })}</div><p className="memory-description">{selected.description}</p>{selected.latitude !== undefined && <p className="quiet-note">Recorded coordinates: {selected.latitude.toFixed(5)}, {selected.longitude?.toFixed(5)}</p>}
      <p className="privacy-caption"><IonIcon icon={lockClosedOutline} /> Only on this device</p><div className="button-row"><button className="secondary-action" onClick={() => history.push(`/stories?memory=${selected.id}&edit=true`)}>Edit memory</button><button className="danger-action" onClick={remove}>Delete memory</button></div><p className="quiet-note">Created {formatDate(selected.createdAt)}<br />Last edited {formatDate(selected.updatedAt)}</p>
    </article> : <>
      <HeritageHero eyebrow="Some moments deserve to stay." title="Kuwento Pamana" description="The places you go. The things you notice. The stories only you can tell." tone="purple" />
      <section className="heritage-body"><button className="create-memory-card" onClick={() => history.push('/stories?memory=new')}><span className="create-memory-icon"><IonIcon icon={addOutline} /></span><span><strong>Keep a new memory</strong><small>Capture a photo or video and tell its story.</small></span><IonIcon icon={arrowForwardOutline} /></button><p className="privacy-caption"><IonIcon icon={lockClosedOutline} /> Your journal is private and stays on this device.</p>
      <div className="section-heading"><div><span className="eyebrow">COLLECTED ALONG THE WAY</span><h2>Your memories</h2></div><span>{state.memories.length} entries</span></div><SearchField value={query} onChange={setQuery} placeholder="Find a memory, moment, or place" /><div className="library-toolbar"><label>Show<select value={kind} onChange={event => setKind(event.target.value)}><option>All memories</option><option>Photos</option><option>Videos</option></select></label><span>Newest moments first</span></div>
      {!!id && !selected && <p className="inline-status">This memory is unavailable on this device.</p>}
      <div className="memory-grid">{memories.map(memory => {
        const cover = state.media.find(item => item.id === memory.mediaIds[0]);
        return <button className="memory-card" key={memory.id} onClick={() => history.push(`/stories?memory=${memory.id}`)}><div className="memory-card-cover">{cover ? <LocalMedia item={cover} /> : <IonIcon icon={cameraOutline} />}<span>{memory.mediaIds.length ? `${memory.mediaIds.length} ${memory.mediaIds.length === 1 ? 'moment' : 'moments'}` : 'Written memory'}</span></div><div className="memory-card-copy"><small>{formatDate(memory.occurredAt)}</small><h3>{memory.title}</h3><p>{memory.description}</p>{memory.location && <span><IonIcon icon={locationOutline} />{memory.location}</span>}</div></button>;
      })}</div>{!memories.length && <EmptyState title={query || state.memories.length ? 'No memories found' : 'Your story starts here'} description={query || state.memories.length ? 'Try another word or media filter.' : 'Capture a familiar place, a celebration, or a small moment you want to remember.'} action={<button className="primary-action" onClick={() => history.push('/stories?memory=new')}>Create your first memory</button>} />}</section>
    </>}{(libraryError || status) && <p className="inline-status" role="status">{libraryError || status}</p>}
  </PageFrame></IonContent></IonPage>;
}

