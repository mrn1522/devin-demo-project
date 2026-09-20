import {
  BIRD_SIZE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GROUND_HEIGHT,
  PIPE_GAP,
  PIPE_WIDTH,
} from './constants';
import type { Game } from './game';

export function render(context: CanvasRenderingContext2D, game: Game): void {
  const groundY = CANVAS_HEIGHT - GROUND_HEIGHT;

  context.fillStyle = '#87ceeb';
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  context.fillStyle = '#8b5a2b';
  context.fillRect(0, groundY, CANVAS_WIDTH, GROUND_HEIGHT);
  context.fillStyle = '#70c24a';
  context.fillRect(0, groundY, CANVAS_WIDTH, 8);

  for (const pipe of game.pipes) {
    const [top, bottom] = [
      { x: pipe.x, y: 0, height: pipe.gapY },
      {
        x: pipe.x,
        y: pipe.gapY + PIPE_GAP,
        height: groundY - pipe.gapY - PIPE_GAP,
      },
    ];
    context.fillStyle = '#2e8b37';
    context.fillRect(top.x, top.y, PIPE_WIDTH, top.height);
    context.fillRect(bottom.x, bottom.y, PIPE_WIDTH, bottom.height);
    context.fillStyle = '#23702b';
    context.fillRect(top.x - 3, top.height - 12, PIPE_WIDTH + 6, 12);
    context.fillRect(bottom.x - 3, bottom.y, PIPE_WIDTH + 6, 12);
  }

  context.save();
  context.translate(game.bird.x, game.bird.y);
  context.rotate(Math.max(-0.5, Math.min(1.2, game.bird.vy / 500)));
  context.fillStyle = '#ffd83d';
  context.beginPath();
  context.arc(0, 0, BIRD_SIZE / 2, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#ffffff';
  context.beginPath();
  context.arc(5, -5, 4, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#222222';
  context.beginPath();
  context.arc(6, -5, 2, 0, Math.PI * 2);
  context.fill();
  context.restore();

  context.textAlign = 'center';
  context.font = 'bold 32px sans-serif';
  context.lineWidth = 4;
  context.strokeStyle = '#1f2937';
  context.strokeText(String(game.score), CANVAS_WIDTH / 2, 44);
  context.fillStyle = '#ffffff';
  context.fillText(String(game.score), CANVAS_WIDTH / 2, 44);

  if (game.state === 'ready') {
    drawOverlay(context, ['Press Space / tap to start']);
  } else if (game.state === 'gameover') {
    drawOverlay(context, [
      'Game Over',
      `Score: ${game.score}`,
      `Best: ${game.highScore}`,
      'Press Space to restart',
    ]);
  }
}

function drawOverlay(context: CanvasRenderingContext2D, lines: string[]): void {
  context.fillStyle = 'rgba(0, 0, 0, 0.35)';
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.textAlign = 'center';
  context.fillStyle = '#ffffff';
  context.strokeStyle = '#1f2937';
  context.lineWidth = 3;
  context.font = 'bold 24px sans-serif';
  const startY = CANVAS_HEIGHT / 2 - ((lines.length - 1) * 30) / 2;
  lines.forEach((line, index) => {
    const y = startY + index * 30;
    context.strokeText(line, CANVAS_WIDTH / 2, y);
    context.fillText(line, CANVAS_WIDTH / 2, y);
  });
}
