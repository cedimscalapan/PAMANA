import { themeForHometown } from './festival-themes';

/** Hometown visual tokens. No bitmap sprites, stretched photos or network assets.
 * These are creative color/emoji motifs, never official municipal imagery.
 */
export function hometownVisualForTown(town:string) {
  const theme=themeForHometown(town);
  return { emoji:theme.emoji,primary:theme.primary,secondary:theme.secondary,
    accent:theme.accent,canvas:theme.canvas,description:theme.motif };
}
