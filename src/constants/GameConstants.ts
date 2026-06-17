export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type GameStatus = "IDLE" | "RUNNING" | "GAME_OVER";
export type BoardSizeOptions = "SMALL" | "MEDIUM" | "LARGE";

export const BoardSizes: Record<BoardSizeOptions, {width:number; height:number}> = {
    SMALL: {width: 10, height: 10},
    MEDIUM: {width: 20, height: 20},
    LARGE: {width: 30, height: 30},
};