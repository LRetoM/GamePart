import { BoardSizeOptions, Direction, FruitCountOptions, GameStatus, SpeedOptions } from "../constants/GameConstants";
import { IPosition } from "../interfaces/IPosition";

export class GameState {
    public Speed: SpeedOptions;
    public FruitCount: FruitCountOptions;
    public BoardSize: BoardSizeOptions;
    public SnakePosition: IPosition[];
    public FruitPosition: IPosition[];
    public Score: number;
    public GameStatus: GameStatus;
    public Direction: Direction;
    public IsLoading: boolean;
    
    constructor(){
        this.Speed = "NORMAL";
        this.FruitCount = 3;
        this.BoardSize = "MEDIUM";
        this.SnakePosition = [];
        this.FruitPosition = undefined;
        this.Score = 0;
        this.GameStatus = "IDLE";
        this.Direction = "RIGHT";
        this.IsLoading = true;
    }
}