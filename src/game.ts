import { birdBox, createBird, flap, updateBird } from './bird';
import { PIPE_SPAWN_INTERVAL, PIPE_WIDTH } from './constants';
import { hitsCeiling, hitsGround, intersects } from './physics';
import { pipeBoxes, spawnPipe, updatePipes } from './pipes';
import type { Bird } from './bird';
import type { Pipe } from './pipes';

export type GameState = 'ready' | 'playing' | 'gameover';

export interface Game {
  state: GameState;
  bird: Bird;
  pipes: Pipe[];
  score: number;
  highScore: number;
  spawnTimer: number;
}

export function createGame(highScore: number): Game {
  return {
    state: 'ready',
    bird: createBird(),
    pipes: [],
    score: 0,
    highScore,
    spawnTimer: 0,
  };
}

export function flapGame(game: Game): Game {
  if (game.state === 'gameover') {
    return createGame(game.highScore);
  }

  return {
    ...game,
    state: 'playing',
    bird: flap(game.bird),
  };
}

export function updateGame(game: Game, dt: number, random: () => number): Game {
  if (game.state !== 'playing') {
    return game;
  }

  const bird = updateBird(game.bird, dt);
  let spawnTimer = game.spawnTimer + dt;
  let pipes = updatePipes(game.pipes, dt);

  while (spawnTimer >= PIPE_SPAWN_INTERVAL) {
    spawnTimer -= PIPE_SPAWN_INTERVAL;
    pipes = [...pipes, spawnPipe(random)];
  }

  let score = game.score;
  pipes = pipes.map((pipe) => {
    if (!pipe.passed && pipe.x + PIPE_WIDTH < bird.x) {
      score += 1;
      return { ...pipe, passed: true };
    }
    return pipe;
  });

  const birdRectangle = birdBox(bird);
  const collidedWithPipe = pipes.some((pipe) => {
    const [topBox, bottomBox] = pipeBoxes(pipe);
    return (
      intersects(birdRectangle, topBox) || intersects(birdRectangle, bottomBox)
    );
  });
  const state =
    hitsGround(birdRectangle) || hitsCeiling(birdRectangle) || collidedWithPipe
      ? 'gameover'
      : 'playing';

  return {
    ...game,
    state,
    bird,
    pipes,
    score,
    highScore: Math.max(game.highScore, score),
    spawnTimer,
  };
}
