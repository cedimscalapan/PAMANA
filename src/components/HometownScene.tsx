import { hometownVisualForTown } from '../data/festival-artwork';

type Props = { hometown: string; className?: string };

/** Image-free, resolution-independent hometown decoration.
 * All factual place names remain real text in parent components.
 * Festival palettes are design interpretations, not official emblems.
 */
export default function HometownScene({ hometown, className = '' }: Props) {
  const theme = hometownVisualForTown(hometown);
  return (
    <div
      className={`${className} pamana-town-art`}
      aria-hidden="true"
      style={{
        backgroundColor: theme.canvas,
        ['--town-primary' as string]: theme.primary,
        ['--town-secondary' as string]: theme.secondary,
        ['--town-accent' as string]: theme.accent,
      }}
    >
      <span className="pamana-town-art-sun" />
      <span className="pamana-town-art-hill hill-back" />
      <span className="pamana-town-art-hill hill-front" />
      <span className="pamana-town-art-symbol">{theme.emoji}</span>
    </div>
  );
}
