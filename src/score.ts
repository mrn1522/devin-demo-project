const HIGH_SCORE_KEY = 'flappy.highScore';

export function loadHighScore(): number {
  try {
    const stored = globalThis.localStorage?.getItem(HIGH_SCORE_KEY);
    const highScore = Number.parseInt(stored ?? '', 10);
    return Number.isFinite(highScore) && highScore >= 0 ? highScore : 0;
  } catch {
    return 0;
  }
}

export function saveHighScore(score: number): void {
  try {
    globalThis.localStorage?.setItem(HIGH_SCORE_KEY, String(score));
  } catch {
    // Storage may be unavailable in private or non-browser contexts.
  }
}
