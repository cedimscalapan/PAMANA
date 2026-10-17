import { artworkForHometown, generatedHometownSprite, generatedTileForHometown } from '../data/festival-artwork';

type Props = { hometown: string; className: string };

/** Displays a single panel of the previously generated concept illustration.
 * SVG remains as a fallback where the browser cannot decode AVIF.
 * All visible locality labels remain real accessible text in the parent component.
 */
export default function HometownScene({ hometown, className }: Props) {
  const tile = generatedTileForHometown(hometown);
  return <div className={`${className} pamana-generated-scene`}
    aria-hidden="true"
    style={{ backgroundImage: `url("${artworkForHometown(hometown)}")` }}>
    {tile && <div className="pamana-generated-scene-layer" style={{
      backgroundImage: `url("${generatedHometownSprite}")`,
      backgroundPosition: `${tile.col * 25}% ${tile.row * 50}%`,
    }} />}
  </div>;
}
