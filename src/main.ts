import './style.css';

const canvas = document.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Game canvas not found');
}

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('2D canvas context not available');
}

context.fillStyle = '#87ceeb';
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = '#ffffff';
context.font = '16px sans-serif';
context.textAlign = 'center';
context.textBaseline = 'middle';
context.fillText(
  'Flappy Bird — press Space',
  canvas.width / 2,
  canvas.height / 2,
);
