export type GameStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'GAME_OVER';

export class GameState {
  public Status: GameStatus;
  public Score: number;
  public Lives: number;
  public Level: number;
  public HighScore: number;

  constructor() {
    this.Status = 'IDLE';
    this.Score = 0;
    this.Lives = 3;
    this.Level = 1;
    this.HighScore = 0;
  }
}
