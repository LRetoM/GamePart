import { combineReducers } from '@reduxjs/toolkit';
import commonsSlice from './CommonsStateReducer';
import gameSlice from './GameStateReducer';

const RootReducer = combineReducers({
  commonsState: commonsSlice.reducer,
  gameState: gameSlice.reducer,
});

export default RootReducer;
