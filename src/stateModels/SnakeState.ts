// Ein Punkt auf dem Grid (Zellkoordinate, nicht Pixel).
export interface IPoint {
  X: number;
  Y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Alles, was sich am Snake-Spiel waehrend des Spiels veraendert.
// Laenge der Schlange = Parts.length, Kollision ist reine Logik -> beides
// muss nicht zusaetzlich gespeichert werden.
export class SnakeState {
  public Parts: IPoint[];
  public Direction: Direction;
  public NextDirection: Direction;
  public Food: IPoint;

  constructor() {
    // Schlange startet mit 3 Teilen horizontal in der Mitte.
    this.Parts = [
      { X: 8, Y: 10 },
      { X: 7, Y: 10 },
      { X: 6, Y: 10 }
    ];
    this.Direction = 'RIGHT';
    this.NextDirection = 'RIGHT';
    this.Food = { X: 14, Y: 10 };
  }
}
