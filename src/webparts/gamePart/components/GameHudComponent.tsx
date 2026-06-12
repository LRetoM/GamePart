import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { GameState } from '../../../stateModels/GameState';
import { GameService } from '../../../services/GameService';
import { PAUSE_GAME, RESUME_GAME } from '../../../redux/reducers/GameStateReducer';
import styles from './GamePart.module.scss';

// Zeigt Score/HighScore/Status an und bietet die Steuer-Buttons.
export const GameHudComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const game: GameState = useAppSelector(state => state.gameState);

  const isRunning = game.Status === 'RUNNING';
  const isPaused = game.Status === 'PAUSED';

  return (
    <div className={styles.hud}>
      <div className={styles.stats}>
        <span><strong>Score:</strong> {game.Score}</span>
        <span><strong>Highscore:</strong> {game.HighScore}</span>
        <span><strong>Status:</strong> {game.Status}</span>
      </div>
      <div className={styles.controls}>
        <PrimaryButton text={game.Status === 'IDLE' ? 'Start' : 'Neustart'} onClick={() => GameService.startNewGame()} />
        {isRunning && <DefaultButton text="Pause" onClick={() => dispatch(PAUSE_GAME())} />}
        {isPaused && <DefaultButton text="Weiter" onClick={() => dispatch(RESUME_GAME())} />}
      </div>
    </div>
  );
};
