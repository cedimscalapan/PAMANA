import AdventureScenery from './AdventureScenery';
import mascot from '../../assets/reference/ka-pamana-icon.png';
/** The web app's storage splash has no artificial minimum delay.
 * The OS-owned Android launch splash may precede this screen.
 */
export default function BootSplash({failed=false,onRetry}:{failed?:boolean;onRetry?:()=>void}){
 return <main className="pamana-boot" role="status" aria-live="polite">
  <section className="pamana-boot-content">
   <div className="pamana-boot-scenery"><AdventureScenery variant="sunrise"/></div>
   <img className="pamana-boot-mascot" src={mascot} alt="" aria-hidden="true"/>
   <span className="pamana-boot-brand">SMART PAMANA</span>
   <h1>Explore. Learn. Play. Preserve.</h1>
   <p>{failed?'Your offline library could not be prepared. No data has been reset.':'Preparing your offline heritage adventure…'}</p>
   {failed?<button type="button" className="pamana2-button pamana2-button--primary" onClick={onRetry}>Try again</button>:
    <span className="pamana-boot-indicator" aria-hidden="true"><i/><i/><i/></span>}
  </section>
 </main>;
}
