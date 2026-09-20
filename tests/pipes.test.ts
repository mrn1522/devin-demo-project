import { describe, expect, it } from 'vitest';

import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GROUND_HEIGHT,
  PIPE_GAP,
  PIPE_MIN_TOP,
  PIPE_WIDTH,
} from '../src/constants';
import { spawnPipe, updatePipes } from '../src/pipes';

describe('pipes', () => {
  it('spawns gaps within the playable bounds', () => {
    const minimum = spawnPipe(() => 0);
    const maximum = spawnPipe(() => 0.999);
    const maxTop = CANVAS_HEIGHT - GROUND_HEIGHT - PIPE_GAP - PIPE_MIN_TOP;

    expect(minimum.x).toBe(CANVAS_WIDTH);
    expect(minimum.gapY).toBe(PIPE_MIN_TOP);
    expect(maximum.gapY).toBeLessThanOrEqual(maxTop);
    expect(maximum.gapY).toBeGreaterThan(PIPE_MIN_TOP);
  });

  it('removes pipes after they leave the screen', () => {
    const pipes = [{ x: -PIPE_WIDTH - 1, gapY: 100, passed: false }];

    expect(updatePipes(pipes, 0)).toEqual([]);
  });
});
