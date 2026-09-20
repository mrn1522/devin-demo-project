export function onFlap(callback: () => void): () => void {
  const canvas = document.querySelector<HTMLCanvasElement>('#game');

  if (!canvas) {
    throw new Error('Game canvas not found');
  }

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
      event.preventDefault();
      callback();
    }
  };

  window.addEventListener('keydown', onKeyDown);
  canvas.addEventListener('pointerdown', callback);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    canvas.removeEventListener('pointerdown', callback);
  };
}
