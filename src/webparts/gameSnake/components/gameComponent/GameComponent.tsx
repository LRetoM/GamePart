import * as React from 'react';
import styles from '../GameSnake.module.scss';
import { GameState } from "../../../../stateModels/GameState";
import { useAppSelector } from "../../GameSnakeWebPart";
import { BoardSizes } from '../../../../constants/GameConstants';


export const GameComponent: React.FunctionComponent = () =>{
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