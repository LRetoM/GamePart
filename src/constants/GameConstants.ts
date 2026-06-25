export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export type GameStatus = "IDLE" | "READY" | "RUNNING" | "GAME_OVER";
export type BoardSizeOptions = "SMALL" | "MEDIUM" | "LARGE";
export type SpeedOptions = "SLOW" | "NORMAL" | "FAST";
export type FruitCountOptions = 1 | 3 | 5 | 10;

export const BoardSizes: Record<BoardSizeOptions, {width:number; height:number}> = {
    SMALL: {width: 10, height: 10},
    MEDIUM: {width: 20, height: 20},
    LARGE: {width: 30, height: 30},
};
export const Speed: Record<SpeedOptions, number> = {
    SLOW: 10,
    NORMAL: 20,
    FAST: 30,
};
