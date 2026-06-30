import { Direction } from "../constants/GameConstants";
import { IPosition } from "../interfaces/IPosition";

export class GameService {
    public static moveSnake(SnakePosition: IPosition[], direction: Direction): IPosition[] {
        const head = SnakePosition[0];
        
        if(direction === "RIGHT"){
            const newHead = {x: head.x + 1, y: head.y}
            return [newHead, ...SnakePosition.slice(0, -1)] 
        } else if(direction === "LEFT"){
            const newHead = {x: head.x -1, y: head.y}
            return [newHead, ...SnakePosition.slice(0, -1)] 
        } else if(direction === "DOWN"){
            const newHead = {x: head.x, y: head.y + 1}
            return [newHead, ...SnakePosition.slice(0, -1)] 
        } else{
            const newHead = {x: head.x, y: head.y - 1}
            return [newHead, ...SnakePosition.slice(0, -1)] 
        }
    }
}