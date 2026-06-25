import { SET_GAME_SETTINGS, START_GAME } from "../../../../redux/reducers/GameStateReducer";
import { GameState } from "../../../../stateModels/GameState";
import { useAppDispatch, useAppSelector } from "../../GameSnakeWebPart";
import * as React from 'react';


export const MenuComponent: React.FunctionComponent = () =>{
    const dispatch = useAppDispatch();
    const gameState: GameState = useAppSelector(state => state.gameState);

    const onPlayClick = (): void => {
        dispatch(SET_GAME_SETTINGS({Speed: gameState.Speed, FruitCount: gameState.FruitCount}));
        dispatch(START_GAME({SnakePosition: [{x: 5, y: 5}], FruitPosition: [{x: 2, y: 8}]}));
    };

    
    return (
    <div>
        <h1>SNAKE</h1>
        <button onClick={onPlayClick}>Play</button>
    </div>
    ) 
}