import { combineReducers } from '@reduxjs/toolkit';
import commonsSlice from './CommonsStateReducer';
import gameSlice from './GameStateReducer';
import snakeSlice from './SnakeStateReducer';

const RootReducer = combineReducers({
  commonsState: commonsSlice.reducer,
  gameState: gameSlice.reducer,
  snakeState: snakeSlice.reducer,
});

export default RootReducer;
