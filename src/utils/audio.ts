/**
 * Audio Pronunciation Utility
 * Plays word pronunciation using standard browser SpeechSynthesis
 * prioritized for Azerbaijani (az-AZ) or Turkish (tr-TR)
 */

export function playPronunciation(text: string, lang: 'az' | 'fa' = 'az'): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported in this browser.');
      resolve(false);
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Slightly slower for clarity
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();

      if (lang === 'az') {
        // Try finding Azerbaijani voice, then Turkish voice
        const azVoice = voices.find(v => v.lang.startsWith('az'));
        const trVoice = voices.find(v => v.lang.startsWith('tr'));
        if (azVoice) {
          utterance.voice = azVoice;
          utterance.lang = 'az-AZ';
        } else if (trVoice) {
          utterance.voice = trVoice;
          utterance.lang = 'tr-TR';
        } else {
          utterance.lang = 'tr-TR';
        }
      } else {
        // Persian voice
        const faVoice = voices.find(v => v.lang.startsWith('fa'));
        if (faVoice) {
          utterance.voice = faVoice;
          utterance.lang = 'fa-IR';
        } else {
          utterance.lang = 'fa-IR';
        }
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        resolve(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Audio playback error:', err);
      resolve(false);
    }
  });
}
