import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { checkmarkCircleOutline, cloudOfflineOutline, informationCircleOutline, linkOutline, refreshOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { sources } from '../data/content';
import { localAssets } from '../data/asset-catalog';
import { clearStoredState, storageInfo } from '../services/storage';
import { ModuleHeader, PageFrame } from '../components/AppChrome';
import {useState} from 'react';
import {uiSoundEnabled,setUiSoundEnabled,playUiSound} from '../services/ui-sounds';
import {makeLearningSnapshot,validateLearningSnapshot,restoreLearningSnapshot} from '../services/progress-backup';

export default function SettingsPage() {
  const history = useHistory();
  const [sounds,setSounds]=useState(uiSoundEnabled);
  const [soundSaving,setSoundSaving]=useState(false);
  const [soundError,setSoundError]=useState('');
  const [backupMessage,setBackupMessage]=useState('');
  const [backupBusy,setBackupBusy]=useState(false);
  const exportBackup=()=>{try{const contents=JSON.stringify(makeLearningSnapshot(),null,2);const blob=new Blob([contents],{type:'application/json'});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download='smart-pamana-learning-'+new Date().toISOString().slice(0,10)+'.json';anchor.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);setBackupMessage('Learning snapshot prepared. Keep the file somewhere private. It does not include your private photos, stories or handwriting images.');}catch{setBackupMessage('Could not prepare the backup file.');}};
  const importBackup=async(file:File|undefined)=>{if(!file)return;setBackupBusy(true);setBackupMessage('');try{if(file.size>2_000_000)throw Error('The file is too large for this learning snapshot.');const snapshot=validateLearningSnapshot(JSON.parse(await file.text()));if(!window.confirm('Restore '+Object.keys(snapshot.values).length+' saved learning settings and progress records? Matching records on this device will be replaced. Private photos, memories and writing records are not included or deleted.')){setBackupMessage('Restore cancelled.');return;}const count=await restoreLearningSnapshot(snapshot);setBackupMessage('Restored '+count+' learning records. Reloading the app…');window.location.reload();}catch(e){setBackupMessage(e instanceof Error?'Restore not completed: '+e.message:'Restore failed. Some imported records may have been written; review your progress.');}finally{setBackupBusy(false);}};
  const changeSound=async(enabled:boolean)=>{setSoundSaving(true);setSoundError('');try{await setUiSoundEnabled(enabled);setSounds(enabled);if(enabled)playUiSound('select');}catch{setSoundError('Could not save your sound preference.');}finally{setSoundSaving(false);}};
  const reset = async () => { if (!window.confirm('Permanently delete local progress, writings, private memories, collections, and profile settings? This cannot be undone. Back up important files before continuing.')) return; try { await clearStoredState(); history.replace('/onboarding'); } catch { window.alert('Reset failed; some records may remain.'); } };
  return (
    <IonPage>
      <IonContent fullscreen>
        <PageFrame active="settings">
          <ModuleHeader title="Settings" subtitle="Keep your learning space personal, local, and offline." tone="brown" icon={settingsOutline} />
          <section className="module-content settings-content">
            <article className="settings-status-card"><div className="settings-status-icon"><IonIcon icon={cloudOfflineOutline} /></div><div><p className="module-kicker">OFFLINE STATUS</p><h2>Ready to learn offline</h2><p>Lessons, practice state, quest score, collection state, and bundled assets are available without an account.</p><span className="settings-badge"><IonIcon icon={checkmarkCircleOutline} /> {storageInfo.nativeDatabase ? 'Native SQLite database' : 'Local web storage fallback'}</span></div></article>
            <article className="settings-card pamana11-sound-setting"><h2>Optional interface sounds</h2><p>A small, synthesized confirmation tone can play after correct answers and saved lessons. It works without downloaded audio or internet. Off by default.</p><label><input type="checkbox" checked={sounds} disabled={soundSaving} onChange={event=>void changeSound(event.target.checked)}/> Enable gentle interface sounds</label>{sounds&&<button type="button" className="secondary-action" onClick={()=>playUiSound('success')}>Preview the sound</button>}{soundError&&<p role="alert">{soundError}</p>}</article>
            <article className="settings-card pamana12-backup"><h2>Learning progress backup</h2><p>Save a local JSON snapshot of your profile preferences, Matuto progress and reflections, Journey chapters, and Quest results. This backup is not a copy of private stories, photographs, writing images, or Android-native media files.</p><div className="pamana12-backup-actions"><button type="button" className="secondary-action" onClick={exportBackup} disabled={backupBusy}>Export learning snapshot</button><label className="pamana12-import">Restore learning snapshot<input type="file" accept=".json,application/json" disabled={backupBusy} onChange={e=>{const file=e.target.files?.[0];e.target.value='';void importBackup(file);}}/></label></div><p className="quiet-note">Restoring requires confirmation and replaces matching learning records. Keep both the original device and backup until verification. No file leaves the device automatically.</p>{backupMessage&&<p role="status" className="pamana12-backup-message">{backupMessage}</p>}</article>
            <article className="settings-card"><h2>Aking Pamana</h2><p>Choose your hometown, festival theme, reading experience, and accessibility preferences.</p><IonButton onClick={() => history.push("/profile")}>Edit my profile</IonButton></article>
            <article className="settings-card"><div className="settings-card-title"><IonIcon icon={informationCircleOutline} /><h2>About SMART PAMANA</h2></div><p>Kultura ng Mindoro, Buhay sa Bawat Henerasyon.</p><p>Community-sensitive entries are marked until appropriate review and permission.</p></article>
            <details className="settings-card pamana-disclosure"><summary><IonIcon icon={linkOutline} /> Artwork and credits</summary><p>See attribution for the materials bundled with the app.</p><div className="settings-list">{localAssets.map((asset) => <div className="settings-list-row" key={asset.id}><strong>{asset.id}</strong><span>{asset.purpose}</span><small>{asset.rights === 'provided_by_project_owner' ? 'Provided by project owner' : asset.attribution}</small></div>)}</div></details>
            <details className="settings-card pamana-disclosure"><summary><IonIcon icon={linkOutline} /> Content references</summary><p>Browse official and reviewed cultural references.</p><div className="settings-list">{sources.map((source) => <div className="settings-list-row" key={source.id}><strong>{source.title}</strong><span>{source.publisher} · {source.status}</span><small>{source.use}</small><a href={source.url} target="_blank" rel="noreferrer">Open source reference</a></div>)}</div></details>
            <article className="settings-card settings-danger"><div className="settings-card-title"><IonIcon icon={refreshOutline} /><h2>Reset local state</h2></div><p>Remove onboarding, progress, practice, quest, private story, and collection data from this device.</p><IonButton color="danger" fill="outline" onClick={reset}>Reset local state</IonButton></article>
          </section>
        </PageFrame>
      </IonContent>
    </IonPage>
  );
}
