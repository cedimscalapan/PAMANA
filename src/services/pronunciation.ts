/**
 * Local pronunciation manifest.
 *
 * Only recordings reviewed as authentic Hanunó'o speaker audio may be added
 * here. The project currently contains no such recordings, so the interface
 * reports that honestly instead of using browser/device speech synthesis.
 */
export type PronunciationRecording = {
  characterCodePoint: string;
  source: string;
  reviewedBy: string;
  assetUrl: string;
};

export const verifiedPronunciations: Record<string, PronunciationRecording> = {};

export type PronunciationPlayer = {
  play: (codePoint: string, replay?: boolean) => Promise<'played' | 'muted' | 'unavailable' | 'error'>;
  stop: () => void;
  setMuted: (muted: boolean) => void;
  isMuted: () => boolean;
};

export function createPronunciationPlayer(): PronunciationPlayer {
  let activeAudio: HTMLAudioElement | undefined;
  let muted = false;

  const stop = () => {
    if (!activeAudio) return;
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = undefined;
  };

  return {
    async play(codePoint, replay = false) {
      if (muted) return 'muted';
      const recording = verifiedPronunciations[codePoint];
      if (!recording) return 'unavailable';
      stop();
      try {
        activeAudio = new Audio(recording.assetUrl);
        activeAudio.preload = 'auto';
        await activeAudio.play();
        if (replay) activeAudio.currentTime = 0;
        return 'played';
      } catch (error) {
        console.warn('Unable to play verified pronunciation.', error);
        stop();
        return 'error';
      }
    },
    stop,
    setMuted(value) {
      muted = value;
      if (value) stop();
    },
    isMuted: () => muted,
  };
}

