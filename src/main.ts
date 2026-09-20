import './style.css';

import { flapGame, createGame, updateGame } from './game';
import { onFlap } from './input';
import { render } from './render';
import { loadHighScore, saveHighScore } from './score';

const canvas = document.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Game canvas not found');
}

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('2D canvas context not available');
}

const renderingContext: CanvasRenderingContext2D = context;

const STEP = 1 / 60;
let game = createGame(loadHighScore());
let lastTime = performance.now();
let accumulator = 0;

onFlap(() => {
  game = flapGame(game);
});

function frame(time: number): void {
  const frameDelta = Math.min((time - lastTime) / 1000, 0.1);
  lastTime = time;
  accumulator += frameDelta;

  while (accumulator >= STEP) {
    const previousState = game.state;
    game = updateGame(game, STEP, Math.random);
    if (previousState !== 'gameover' && game.state === 'gameover') {
      saveHighScore(game.highScore);
    }
    accumulator -= STEP;
  }

  render(renderingContext, game);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
