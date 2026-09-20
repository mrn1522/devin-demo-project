import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GROUND_HEIGHT,
  PIPE_GAP,
  PIPE_MIN_TOP,
  PIPE_SPEED,
  PIPE_WIDTH,
} from './constants';
import type { Rect } from './physics';

export interface Pipe {
  x: number;
  gapY: number;
  passed: boolean;
}

export function spawnPipe(random: () => number): Pipe {
  const maxTop = CANVAS_HEIGHT - GROUND_HEIGHT - PIPE_GAP - PIPE_MIN_TOP;
  const gapY = PIPE_MIN_TOP + random() * (maxTop - PIPE_MIN_TOP);
  return { x: CANVAS_WIDTH, gapY, passed: false };
}

export function updatePipes(pipes: Pipe[], dt: number): Pipe[] {
  return pipes
    .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED * dt }))
    .filter((pipe) => pipe.x + PIPE_WIDTH >= 0);
}

export function pipeBoxes(pipe: Pipe): [Rect, Rect] {
  const groundY = CANVAS_HEIGHT - GROUND_HEIGHT;
  return [
    { x: pipe.x, y: 0, w: PIPE_WIDTH, h: pipe.gapY },
    {
      x: pipe.x,
      y: pipe.gapY + PIPE_GAP,
      w: PIPE_WIDTH,
      h: groundY - pipe.gapY - PIPE_GAP,
    },
  ];
}
