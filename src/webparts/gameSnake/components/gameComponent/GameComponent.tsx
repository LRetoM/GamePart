import * as React from 'react';
import styles from '../GameSnake.module.scss';
import { GameState } from "../../../../stateModels/GameState";
import { useAppDispatch, useAppSelector } from "../../GameSnakeWebPart";
import { BoardSizes, Speed } from '../../../../constants/GameConstants';
import { BEGIN_GAME, CHANGE_DIRECTION, MOVE_SNAKE } from '../../../../redux/reducers/GameStateReducer';
import { GameService } from '../../../../services/GameService';


export const GameComponent: React.FunctionComponent = () =>{

    const dispatch = useAppDispatch();
    const gameState: GameState = useAppSelector(state => state.gameState);
    const snakePositions = gameState.SnakePosition.map(pos => `${pos.x},${pos.y}`);
    const fruitPositions = gameState.FruitPosition.map(pos => `${pos.x},${pos.y}`);

    const getCellType = (columnIndex: number, rowIndex: number): string => {
        const cellKey = `${columnIndex},${rowIndex}`;
        const headKey = `${gameState.SnakePosition[0].x},${gameState.SnakePosition[0].y}`;

        if (cellKey === headKey) return "snakeHead";
        if (snakePositions.includes(cellKey)) return "snakeBody";
        if (fruitPositions.includes(cellKey)) return "fruit";

        return "empty"
    }

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void =>{
            if(event.key === "ArrowUp"){
                dispatch(CHANGE_DIRECTION({Direction: "UP"})) 
            }else if(event.key === "ArrowDown"){
                dispatch(CHANGE_DIRECTION({Direction: "DOWN"}))
            }else if(event.key === "ArrowRight"){
                dispatch(CHANGE_DIRECTION({Direction: "RIGHT"}))
            }else if(event.key === "ArrowLeft"){
                dispatch(CHANGE_DIRECTION({Direction: "LEFT"}))
            }else{
                return;
            }

            if(gameState.GameStatus === "READY"){
                dispatch(BEGIN_GAME())
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    },[gameState.GameStatus]);


    React.useEffect(() => {

    if(gameState.GameStatus !== "RUNNING") return;
        const intervalId = setInterval(() => {
            dispatch(MOVE_SNAKE({SnakePosition: GameService.moveSnake(gameState.SnakePosition, gameState.Direction)}))
        }, Speed[gameState.Speed]);
    
     return () => {
        clearInterval(intervalId);
     };   
    }, [gameState.GameStatus]);
    
    return (
        <div>
            {Array.from({length: BoardSizes[gameState.BoardSize].height}).map((_: unknown, rowIndex: number) => (
                <div key= {rowIndex} className={styles.row}>
                    {Array.from({length: BoardSizes[gameState.BoardSize].width}).map((_: unknown, columnIndex: number) => (
                       <div key= {`${rowIndex}-${columnIndex}`} className={(styles as Record <string, string>)[getCellType(columnIndex, rowIndex)]}/>   
                    ))}
                </div>
            ))}
        </div>
    ) 
}