import {
  BIRD_SIZE,
  BIRD_X,
  CANVAS_HEIGHT,
  FLAP_VELOCITY,
  GRAVITY,
} from './constants';
import type { Rect } from './physics';

export interface Bird {
  x: number;
  y: number;
  vy: number;
}

export function createBird(): Bird {
  return { x: BIRD_X, y: CANVAS_HEIGHT / 2, vy: 0 };
}

export function updateBird(bird: Bird, dt: number): Bird {
  const vy = bird.vy + GRAVITY * dt;
  return { ...bird, vy, y: bird.y + vy * dt };
}

export function flap(bird: Bird): Bird {
  return { ...bird, vy: FLAP_VELOCITY };
}

export function birdBox(bird: Bird): Rect {
  return {
    x: bird.x - BIRD_SIZE / 2,
    y: bird.y - BIRD_SIZE / 2,
    w: BIRD_SIZE,
    h: BIRD_SIZE,
  };
}
