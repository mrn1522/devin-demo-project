import { describe, expect, it } from 'vitest';

import { createBird, flap, updateBird } from '../src/bird';
import { FLAP_VELOCITY, GRAVITY } from '../src/constants';

describe('bird', () => {
  it('accelerates downward with gravity', () => {
    const bird = createBird();
    const updated = updateBird(bird, 0.1);

    expect(updated.vy).toBeCloseTo(GRAVITY * 0.1);
    expect(updated.y).toBeGreaterThan(bird.y);
  });

  it('sets the flap velocity', () => {
    expect(flap(createBird()).vy).toBe(FLAP_VELOCITY);
  });
});
