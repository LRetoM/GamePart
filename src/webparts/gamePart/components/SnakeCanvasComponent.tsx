import * as React from 'react';
import { useAppSelector } from '../../../redux/Hooks';
import { SnakeState } from '../../../stateModels/SnakeState';
import { CANVAS_SIZE, CELL_SIZE, GRID_SIZE } from '../../../constants/GameConstants';

// Das Canvas ist reine Darstellung: es liest den SnakeState und zeichnet bei
// jeder Aenderung neu. Es enthaelt KEINE Spiellogik (Single Source of Truth
// bleibt der Redux-State).
export const SnakeCanvasComponent: React.FunctionComponent = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const snake: SnakeState = useAppSelector(state => state.snakeState);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    // Hintergrund.
    context.fillStyle = '#1e1e1e';
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Gitterlinien (dezent).
    context.strokeStyle = '#2b2b2b';
    for (let i = 0; i <= GRID_SIZE; i++) {
      context.beginPath();
      context.moveTo(i * CELL_SIZE, 0);
      context.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      context.stroke();
      context.beginPath();
      context.moveTo(0, i * CELL_SIZE);
      context.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      context.stroke();
    }

    // Futter.
    context.fillStyle = '#e74c3c';
    context.fillRect(snake.Food.X * CELL_SIZE, snake.Food.Y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // Schlange (Kopf etwas heller als der Koerper).
    snake.Parts.forEach((part, index) => {
      context.fillStyle = index === 0 ? '#2ecc71' : '#27ae60';
      context.fillRect(part.X * CELL_SIZE + 1, part.Y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });
  }, [snake.Parts, snake.Food]);

  return <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />;
};
