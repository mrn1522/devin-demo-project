import { describe, expect, it } from 'vitest';

import { CANVAS_HEIGHT, GROUND_HEIGHT } from '../src/constants';
import { hitsCeiling, hitsGround, intersects } from '../src/physics';

describe('physics', () => {
  it('detects overlapping rectangles', () => {
    expect(
      intersects({ x: 0, y: 0, w: 10, h: 10 }, { x: 5, y: 5, w: 10, h: 10 }),
    ).toBe(true);
    expect(
      intersects({ x: 0, y: 0, w: 10, h: 10 }, { x: 10, y: 10, w: 10, h: 10 }),
    ).toBe(false);
  });

  it('detects ground and ceiling collisions', () => {
    expect(
      hitsGround({
        x: 0,
        y: CANVAS_HEIGHT - GROUND_HEIGHT - 10,
        w: 10,
        h: 10,
      }),
    ).toBe(true);
    expect(hitsCeiling({ x: 0, y: 0, w: 10, h: 10 })).toBe(true);
    expect(hitsCeiling({ x: 0, y: 1, w: 10, h: 10 })).toBe(false);
  });
});
