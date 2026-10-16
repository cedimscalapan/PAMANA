import { useEffect, useRef, useState } from 'react';

export default function MemoryCapture({ mode, onCapture, onClose }: { mode: 'photo' | 'video'; onCapture: (file: File) => void; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream>();
  const recorder = useRef<MediaRecorder>();
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const deliver = useRef(true);
  useEffect(() => {
    let disposed = false;
    deliver.current = true;
    if (!navigator.mediaDevices?.getUserMedia) { setError('Camera capture is unavailable here. Close this window and choose a photo or video from your device.'); return; }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: mode === 'video' }).then(value => {
      if (disposed) { value.getTracks().forEach(track => track.stop()); return; }
      stream.current = value;
      if (video.current) video.current.srcObject = value;
      setReady(true);
    }).catch(() => setError('Camera access was declined or no camera is available. You can still choose existing media from your device.'));
    return () => { disposed = true; deliver.current = false; if (recorder.current?.state === 'recording') recorder.current.stop(); stream.current?.getTracks().forEach(track => track.stop()); };
  }, [mode]);
  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => setSeconds(previous => previous + 1), 1000);
    return () => window.clearInterval(timer);
  }, [recording]);
  useEffect(() => { if (seconds >= 120 && recorder.current?.state === 'recording') recorder.current.stop(); }, [seconds]);
  const capture = () => {
    if (!video.current || !stream.current) return;
    if (mode === 'photo') {
      const canvas = document.createElement('canvas');
      canvas.width = video.current.videoWidth; canvas.height = video.current.videoHeight;
      canvas.getContext('2d')?.drawImage(video.current, 0, 0);
      canvas.toBlob(blob => { if (blob) onCapture(new File([blob], `memory-${Date.now()}.jpg`, { type: 'image/jpeg' })); else setError('The photo could not be captured. Please try again.'); }, 'image/jpeg', .9);
    } else {
      if (recorder.current?.state === 'recording') { recorder.current.stop(); return; }
      if (typeof MediaRecorder === 'undefined') { setError('Video recording is unavailable in this browser. Choose an existing video instead.'); return; }
      try {
        const chunks: BlobPart[] = [];
        const mime = ['video/webm;codecs=vp9,opus', 'video/webm', 'video/mp4'].find(value => MediaRecorder.isTypeSupported(value));
        const active = new MediaRecorder(stream.current, mime ? { mimeType: mime } : undefined);
        recorder.current = active;
        let bytes = 0;
        active.ondataavailable = event => { if (event.data.size) { chunks.push(event.data); bytes += event.data.size; if (bytes > 45 * 1024 * 1024 && active.state === 'recording') active.stop(); } };
        active.onerror = () => { setRecording(false); setError('Recording was interrupted. Please try again or choose an existing video.'); };
        active.onstop = () => { setRecording(false); if (!deliver.current) return; const type = active.mimeType.split(';')[0]; const blob = new Blob(chunks, { type }); if (blob.size) onCapture(new File([blob], `memory-${Date.now()}.${type.includes('mp4') ? 'mp4' : 'webm'}`, { type })); };
        active.start(1000); setSeconds(0); setRecording(true);
      } catch { setError('Recording could not start. Try choosing an existing video.'); }
    }
  };
  return <div className="capture-overlay" role="dialog" aria-modal="true" aria-labelledby="capture-title"><div className="capture-panel"><h2 id="capture-title">{mode === 'photo' ? 'Capture a moment' : 'Record your memory'}</h2><p>Media stays on this device. Videos stop after two minutes.</p><video ref={video} autoPlay playsInline muted />{error && <p role="alert" className="inline-status">{error}</p>}<div className="button-row"><button type="button" autoFocus className="secondary-action" onClick={onClose}>Cancel</button><button type="button" className="primary-action" disabled={!ready || !!error} onClick={capture}>{recording ? `Stop · ${seconds}s` : mode === 'photo' ? 'Take photo' : 'Start recording'}</button></div></div></div>;
}
