export interface ScrollState {
  rawProgress: number; // 0.0 to 1.0 from DOM scroll
  smoothProgress: number; // 0.0 to 1.0 after lerp damping
  activeSectionIndex: number;
}

type Listener = (state: ScrollState) => void;

class ScrollStore {
  private rawProgress = 0;
  private smoothProgress = 0;
  private activeSectionIndex = 0;
  private listeners: Set<Listener> = new Set();
  private containerElement: HTMLElement | null = null;

  public setContainer(el: HTMLElement | null) {
    this.containerElement = el;
  }

  public getContainer(): HTMLElement | null {
    return this.containerElement;
  }

  public setRawProgress(progress: number) {
    this.rawProgress = Math.max(0, Math.min(1, progress));
    // Determine active section index (7 sections total, intervals of ~0.1428)
    const count = 7;
    const index = Math.min(count - 1, Math.floor(this.rawProgress * count + 0.1));
    this.activeSectionIndex = index;
    this.notify();
  }

  public setSmoothProgress(progress: number) {
    this.smoothProgress = Math.max(0, Math.min(1, progress));
  }

  public addProgressDelta(delta: number) {
    const nextProgress = Math.max(0, Math.min(1, this.rawProgress + delta));
    this.rawProgress = nextProgress;
    const count = 7;
    const index = Math.min(count - 1, Math.floor(this.rawProgress * count + 0.1));
    this.activeSectionIndex = index;
    if (this.containerElement) {
      const scrollMax = this.containerElement.scrollHeight - this.containerElement.clientHeight;
      if (scrollMax > 0) {
        this.containerElement.scrollTop = this.rawProgress * scrollMax;
      }
    }
    this.notify();
  }

  public getState(): ScrollState {
    return {
      rawProgress: this.rawProgress,
      smoothProgress: this.smoothProgress,
      activeSectionIndex: this.activeSectionIndex,
    };
  }

  public scrollToSection(index: number) {
    if (!this.containerElement) return;
    const targetRatio = index / 6;
    const scrollMax = this.containerElement.scrollHeight - this.containerElement.clientHeight;
    this.containerElement.scrollTo({
      top: targetRatio * scrollMax,
      behavior: 'smooth',
    });
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((l) => l(state));
  }
}

export const scrollStore = new ScrollStore();

