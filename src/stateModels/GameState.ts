import { Direction, FruitCountOptions, GameStatus, SpeedOptions } from "../constants/GameConstants";
import { IPosition } from "../interfaces/IPosition";

export class GameState {
    public Speed: SpeedOptions;
    public FruitCount: FruitCountOptions;
    public SnakePosition: IPosition[];
    public FruitPosition: IPosition[];
    public Score: number;
    public GameStatus: GameStatus;
    public Direction: Direction;
    public IsLoading: boolean;
    
    constructor(){
        this.Speed = undefined;
        this.FruitCount = undefined;
        this.FruitPosition = undefined;
        this.SnakePosition = [];
        this.Score = 0;
        this.GameStatus = "IDLE";
        this.Direction = "RIGHT";
        this.IsLoading = true;
    }
}