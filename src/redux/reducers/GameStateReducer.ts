import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, GameStatus } from '../../stateModels/GameState';

const gameSlice = createSlice({
  name: 'game',
  initialState: new GameState(),
  reducers: {
    START_GAME(state: GameState) {
      return { ...state, Status: 'RUNNING' as GameStatus, Score: 0, Lives: 3, Level: 1 };
    },
    PAUSE_GAME(state: GameState) {
      return { ...state, Status: 'PAUSED' as GameStatus };
    },
    RESUME_GAME(state: GameState) {
      return { ...state, Status: 'RUNNING' as GameStatus };
    },
    GAME_OVER(state: GameState) {
      return {
        ...state,
        Status: 'GAME_OVER' as GameStatus,
        HighScore: state.Score > state.HighScore ? state.Score : state.HighScore
      };
    },
    ADD_SCORE(state: GameState, action: PayloadAction<number>) {
      return { ...state, Score: state.Score + action.payload };
    },
    NEXT_LEVEL(state: GameState) {
      return { ...state, Level: state.Level + 1 };
    },
    LOSE_LIFE(state: GameState) {
      return { ...state, Lives: state.Lives - 1 };
    }
  }
});

export default gameSlice;
export const { START_GAME, PAUSE_GAME, RESUME_GAME, GAME_OVER, ADD_SCORE, NEXT_LEVEL, LOSE_LIFE } = gameSlice.actions;
