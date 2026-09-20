import { describe, expect, it } from 'vitest';

import { CANVAS_HEIGHT, GROUND_HEIGHT } from '../src/constants';
import { createGame, flapGame, updateGame } from '../src/game';

describe('game', () => {
  it('starts playing when the ready game is flapped', () => {
    const game = flapGame(createGame(0));

    expect(game.state).toBe('playing');
  });

  it('increments the score when a pipe is passed', () => {
    const game = flapGame(createGame(0));
    const withPipe = {
      ...game,
      pipes: [{ x: 0, gapY: 150, passed: false }],
    };
    const updated = updateGame(withPipe, 0, () => 0);

    expect(updated.score).toBe(1);
    expect(updated.pipes[0].passed).toBe(true);
  });

  it('ends on ground collision and updates the high score', () => {
    const game = flapGame(createGame(0));
    const nearGround = {
      ...game,
      score: 3,
      bird: {
        ...game.bird,
        y: CANVAS_HEIGHT - GROUND_HEIGHT,
      },
    };
    const updated = updateGame(nearGround, 0, () => 0);

    expect(updated.state).toBe('gameover');
    expect(updated.highScore).toBe(3);
  });

  it('restarts after game over while preserving the high score', () => {
    const game = {
      ...createGame(8),
      state: 'gameover' as const,
      score: 5,
    };
    const restarted = flapGame(game);

    expect(restarted.state).toBe('ready');
    expect(restarted.score).toBe(0);
    expect(restarted.highScore).toBe(8);
  });
});
