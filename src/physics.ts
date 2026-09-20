import { CANVAS_HEIGHT, GROUND_HEIGHT } from './constants';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function intersects(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

export function hitsGround(birdBox: Rect): boolean {
  return birdBox.y + birdBox.h >= CANVAS_HEIGHT - GROUND_HEIGHT;
}

export function hitsCeiling(birdBox: Rect): boolean {
  return birdBox.y <= 0;
}
