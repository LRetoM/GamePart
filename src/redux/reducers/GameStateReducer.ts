import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameState } from "../../stateModels/GameState";
import { Direction, FruitCountOptions, SpeedOptions } from "../../constants/GameConstants";
import { IPosition } from "../../interfaces/IPosition";

const gameSlice = createSlice({
    name: 'game',
    initialState: new GameState(),
    reducers: {
        LOADING_GAME_DONE(state: GameState){
            return {...state, IsLoading: false}
        },
        SET_GAME_SETTINGS(state: GameState, action: PayloadAction<{Speed: SpeedOptions, FruitCount: FruitCountOptions}>){
            return {
                    ...state, 
                    Speed: action.payload.Speed,
                    FruitCount: action.payload.FruitCount
            }
        },
        START_GAME(state: GameState, action: PayloadAction<{SnakePosition: IPosition[], FruitPosition: IPosition[]}>){
            return{
                    ...state,
                    GameStatus: "READY" as const,
                    SnakePosition: action.payload.SnakePosition,
                    FruitPosition: action.payload.FruitPosition    
            }
        },
        BEGIN_GAME(state: GameState){
            return{
                    ...state,
                    GameStatus: "RUNNING" as const, 
            }
        },
        MOVE_SNAKE(state: GameState, action: PayloadAction<{SnakePosition: IPosition[]}>){
            return{...state, SnakePosition: action.payload.SnakePosition}
        },
        CHANGE_DIRECTION(state: GameState, action: PayloadAction<{Direction: Direction}>){
            return{
                    ...state,
                    Direction: action.payload.Direction
            }
        },
        EAT_FRUIT(state: GameState, action: PayloadAction<{SnakePosition: IPosition[], FruitPosition: IPosition[]}>){
            return{
                    ...state,
                    Score: state.Score + 1,
                    SnakePosition: action.payload.SnakePosition,
                    FruitPosition: action.payload.FruitPosition,
            }
        },
        SET_GAME_OVER(state: GameState){
            return{
                    ...state,
                    GameStatus: "GAME_OVER" as const
            }
        },
        RESET_GAME(){
            return new GameState();
        }
    }
});

export default gameSlice;
export const {LOADING_GAME_DONE, SET_GAME_SETTINGS, START_GAME, BEGIN_GAME, MOVE_SNAKE, CHANGE_DIRECTION, EAT_FRUIT, SET_GAME_OVER, RESET_GAME} = gameSlice.actions;