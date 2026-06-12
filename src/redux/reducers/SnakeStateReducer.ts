import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Direction, IPoint, SnakeState } from '../../stateModels/SnakeState';

// Dieser Reducer ist die "Single Source of Truth" fuer die Geometrie der Schlange.
// Er ist bewusst rein: er bewegt/waechst die Schlange, entscheidet aber NICHT
// ueber Punkte oder Game-Over. Diese Orchestrierung uebernimmt der GameService.
const snakeSlice = createSlice({
  name: 'snake',
  initialState: new SnakeState(),
  reducers: {
    // Richtungswunsch setzen. 180-Grad-Wenden werden ignoriert, damit die
    // Schlange nicht in sich selbst faehrt.
    SET_DIRECTION(state: SnakeState, action: PayloadAction<Direction>) {
      const next = action.payload;
      const current = state.Direction;
      const isOpposite =
        (current === 'UP' && next === 'DOWN') ||
        (current === 'DOWN' && next === 'UP') ||
        (current === 'LEFT' && next === 'RIGHT') ||
        (current === 'RIGHT' && next === 'LEFT');
      if (!isOpposite) {
        state.NextDirection = next;
      }
    },

    // Normaler Schritt: neuer Kopf vorne dran, letztes Teil faellt weg.
    MOVE_SNAKE(state: SnakeState) {
      state.Direction = state.NextDirection;
      state.Parts.unshift(getNextHead(state.Parts[0], state.Direction));
      state.Parts.pop();
    },

    // Schritt nach dem Fressen: neuer Kopf vorne dran, Schwanz bleibt -> waechst.
    GROW_SNAKE(state: SnakeState) {
      state.Direction = state.NextDirection;
      state.Parts.unshift(getNextHead(state.Parts[0], state.Direction));
    },

    SET_FOOD(state: SnakeState, action: PayloadAction<IPoint>) {
      state.Food = action.payload;
    },

    // Komplett zuruecksetzen (neues Spiel).
    RESET_SNAKE() {
      return new SnakeState();
    }
  }
});

// Berechnet die Kopfposition fuer den naechsten Schritt aus aktueller
// Kopfposition und Richtung. Reine Logik, daher hier ausgelagert.
function getNextHead(head: IPoint, direction: Direction): IPoint {
  switch (direction) {
    case 'UP':
      return { X: head.X, Y: head.Y - 1 };
    case 'DOWN':
      return { X: head.X, Y: head.Y + 1 };
    case 'LEFT':
      return { X: head.X - 1, Y: head.Y };
    case 'RIGHT':
    default:
      return { X: head.X + 1, Y: head.Y };
  }
}

export default snakeSlice;
export const { SET_DIRECTION, MOVE_SNAKE, GROW_SNAKE, SET_FOOD, RESET_SNAKE } = snakeSlice.actions;

// Export der Hilfsfunktion, damit der GameService den naechsten Kopf vorab
// pruefen kann (Kollision/Futter), bevor er die passende Aktion dispatcht.
export { getNextHead };
