import { combineReducers } from "@reduxjs/toolkit";
import commonsSlice from "./CommonsStateReducer";
import gameSlice from "./GameStateReducer";

export default combineReducers({
    commonsState: commonsSlice.reducer,
    gameState: gameSlice.reducer
});

