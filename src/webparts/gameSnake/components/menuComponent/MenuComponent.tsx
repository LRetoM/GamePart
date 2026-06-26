import * as React from 'react';
import { CHANGE_SPEED, CHANGE_FRUIT_COUNT, CHANGE_BOARD_SIZE, START_GAME } from "../../../../redux/reducers/GameStateReducer";
import { GameState } from "../../../../stateModels/GameState";
import { useAppDispatch, useAppSelector } from "../../GameSnakeWebPart";
import { BoardSizeOptions, BoardSizes, FruitCountOptions, FruitCounts, Speed, SpeedOptions } from '../../../../constants/GameConstants';


export const MenuComponent: React.FunctionComponent = () =>{
    const dispatch = useAppDispatch();
    const gameState: GameState = useAppSelector(state => state.gameState);

    const onSpeedChange = (speed: SpeedOptions): void =>{
        dispatch(CHANGE_SPEED({Speed: speed}));
    }

    const onFruitCountChange = (fruitCount: FruitCountOptions): void => {
        dispatch(CHANGE_FRUIT_COUNT({FruitCount: fruitCount}))
    }

    const onBoardSizeChange = (boardSize: BoardSizeOptions): void => {
        dispatch(CHANGE_BOARD_SIZE({BoardSize: boardSize}))
    }

    const onPlayClick = (): void => { 
        dispatch(START_GAME({SnakePosition: [{x: 5, y: 5}], FruitPosition: [{x: 2, y: 8}]}));
    };

    
    return (
    <div>
        <h1>SNAKE</h1>
        <div>
            {Object.keys(Speed).map((speedOption) => (
                <button key={speedOption} onClick= {() => onSpeedChange(speedOption as SpeedOptions)}>{speedOption}</button>
            ))}
        </div>
        <div>
            {FruitCounts.map((fruitCount) => (
            <button key={fruitCount} onClick= {() => onFruitCountChange(fruitCount)}>{fruitCount}</button>
            ))}
        </div>
        <div>
            {Object.keys(BoardSizes).map((boardSize) => (
                <button key={boardSize} onClick= {() => onBoardSizeChange(boardSize as BoardSizeOptions)}>{boardSize}</button>
            ))}
        </div>
        <button onClick= {onPlayClick}>Play</button>
    </div>
    ) 
}