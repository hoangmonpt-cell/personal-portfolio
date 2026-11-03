/**
 * Lightweight procedural Web Audio API sound generator for Game HUD interactions.
 * Safe, zero-network, no external audio files required.
 */
class HudSoundManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem('portfolio_audio_enabled');
      this.enabled = saved === 'true';
    } catch {
      this.enabled = false;
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    try {
      localStorage.setItem('portfolio_audio_enabled', String(this.enabled));
    } catch {
      // ignore
    }
    if (this.enabled) {
      this.playBeep(880, 0.05);
    }
    return this.enabled;
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playHover() {
    if (!this.enabled) return;
    this.playBeep(1200, 0.02, 'sine', 0.03);
  }

  public playClick() {
    if (!this.enabled) return;
    this.playBeep(600, 0.04, 'triangle', 0.06);
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.playChord([523.25, 659.25, 783.99], 0.1);
  }

  private playBeep(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.05) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // audio context might be blocked by browser autoplay policy
    }
  }

  private playChord(freqs: number[], duration: number) {
    try {
      freqs.forEach((f) => this.playBeep(f, duration, 'sine', 0.04));
    } catch {
      // ignore
    }
  }
}

export const hudSound = new HudSoundManager();

