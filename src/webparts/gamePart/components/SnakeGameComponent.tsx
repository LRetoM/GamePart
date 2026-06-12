import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { GameState } from '../../../stateModels/GameState';
import { Direction } from '../../../stateModels/SnakeState';
import { GameService } from '../../../services/GameService';
import { SET_DIRECTION } from '../../../redux/reducers/SnakeStateReducer';
import { TICK_MS } from '../../../constants/GameConstants';
import { SnakeCanvasComponent } from './SnakeCanvasComponent';
import { GameHudComponent } from './GameHudComponent';
import styles from './GamePart.module.scss';

// Map: Pfeiltasten + WASD -> Richtung.
const KEY_TO_DIRECTION: { [key: string]: Direction } = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  s: 'DOWN',
  a: 'LEFT',
  d: 'RIGHT'
};

// Orchestriert das eigentliche Spiel: Spielschleife (Tick) und Tastatursteuerung.
// Gezeichnet wird im Canvas, die Spiellogik liegt im GameService/Reducer.
export const SnakeGameComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const game: GameState = useAppSelector(state => state.gameState);

  // Spielschleife: laeuft nur, solange der Status RUNNING ist.
  React.useEffect(() => {
    if (game.Status !== 'RUNNING') {
      return;
    }
    console.log('[GamePart] Spielschleife gestartet (TICK_MS=' + TICK_MS + ')');
    const intervalId = setInterval(() => GameService.tick(), TICK_MS);
    return () => clearInterval(intervalId);
  }, [game.Status]);

  // Tastatursteuerung: Richtungswunsch an den Reducer geben.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const direction = KEY_TO_DIRECTION[event.key];
      if (direction) {
        event.preventDefault();
        dispatch(SET_DIRECTION(direction));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch]);

  return (
    <div className={styles.game}>
      <GameHudComponent />
      <div className={styles.board}>
        <SnakeCanvasComponent />
        {game.Status === 'GAME_OVER' && (
          <MessageBar messageBarType={MessageBarType.warning}>
            Game Over! Score: {game.Score}. Mit &quot;Neustart&quot; nochmal spielen.
          </MessageBar>
        )}
        {game.Status === 'IDLE' && (
          <MessageBar messageBarType={MessageBarType.info}>
            Steuerung: Pfeiltasten oder WASD. Mit &quot;Start&quot; beginnen.
          </MessageBar>
        )}
      </div>
    </div>
  );
};
