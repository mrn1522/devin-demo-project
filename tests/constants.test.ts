import { describe, expect, it } from 'vitest';

import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../src/constants';

describe('canvas constants', () => {
  it('uses the expected canvas dimensions', () => {
    expect(CANVAS_WIDTH).toBe(288);
    expect(CANVAS_HEIGHT).toBe(512);
  });
});
