import store from '../redux/Store';
import { GRID_SIZE, SCORE_PER_FOOD } from '../constants/GameConstants';
import { IPoint, SnakeState } from '../stateModels/SnakeState';
import { getNextHead, GROW_SNAKE, MOVE_SNAKE, RESET_SNAKE, SET_FOOD } from '../redux/reducers/SnakeStateReducer';
import { ADD_SCORE, GAME_OVER, START_GAME } from '../redux/reducers/GameStateReducer';

// Der GameService orchestriert einen Spielschritt. Die Reducer bleiben rein -
// hier wird entschieden, WELCHE Aktion pro Tick passieren soll.
// Zugriff auf den Store erfolgt direkt (gleiches Muster wie LoggingService).
export class GameService {

  // Startet ein neues Spiel: Schlange zuruecksetzen, Game-Meta (Score/Status)
  // zuruecksetzen und Futter auf eine freie Zelle setzen.
  public static startNewGame(): void {
    const freshSnake = new SnakeState();
    store.dispatch(RESET_SNAKE());
    store.dispatch(START_GAME());
    store.dispatch(SET_FOOD(GameService.getRandomFreeCell(freshSnake.Parts)));
  }

  // Wird pro Tick aus der Spielschleife aufgerufen. Berechnet den naechsten
  // Kopf, prueft Kollision und Futter und dispatcht die passende Aktion.
  public static tick(): void {
    const state = store.getState();

    if (state.gameState.Status !== 'RUNNING') {
      return;
    }

    const snake = state.snakeState;
    const nextHead = getNextHead(snake.Parts[0], snake.NextDirection);

    // 1) Wand-Kollision?
    if (GameService.isOutOfBounds(nextHead)) {
      store.dispatch(GAME_OVER());
      return;
    }

    // 2) Selbst-Kollision? Der Schwanz (letztes Teil) weicht beim normalen
    // Schritt aus, daher zaehlt er nicht als Hindernis.
    const body = snake.Parts.slice(0, snake.Parts.length - 1);
    if (body.some(part => part.X === nextHead.X && part.Y === nextHead.Y)) {
      store.dispatch(GAME_OVER());
      return;
    }

    // 3) Futter gefressen?
    if (nextHead.X === snake.Food.X && nextHead.Y === snake.Food.Y) {
      store.dispatch(GROW_SNAKE());
      store.dispatch(ADD_SCORE(SCORE_PER_FOOD));
      // Neues Futter auf eine freie Zelle (inkl. neuem Kopf) setzen.
      store.dispatch(SET_FOOD(GameService.getRandomFreeCell([nextHead, ...snake.Parts])));
      return;
    }

    // 4) Normaler Schritt.
    store.dispatch(MOVE_SNAKE());
  }

  private static isOutOfBounds(point: IPoint): boolean {
    return point.X < 0 || point.Y < 0 || point.X >= GRID_SIZE || point.Y >= GRID_SIZE;
  }

  // Liefert eine zufaellige Zelle, die nicht von der Schlange belegt ist.
  private static getRandomFreeCell(occupied: IPoint[]): IPoint {
    let cell: IPoint;
    do {
      cell = {
        X: Math.floor(Math.random() * GRID_SIZE),
        Y: Math.floor(Math.random() * GRID_SIZE)
      };
    } while (occupied.some(part => part.X === cell.X && part.Y === cell.Y));
    return cell;
  }
}
