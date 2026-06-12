// Zentrale Spielkonstanten. Canvas und Grid sind fix - daher gehoeren sie nicht
// in den State, sondern hierher.

// Anzahl Zellen pro Achse (Spielfeld ist quadratisch: GRID_SIZE x GRID_SIZE).
export const GRID_SIZE = 20;

// Kantenlaenge einer Zelle in Pixel.
export const CELL_SIZE = 20;

// Gesamtgroesse des Canvas in Pixel.
export const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;

// Vergehende Zeit pro Spielschritt (Tick) in Millisekunden -> Spielgeschwindigkeit.
export const TICK_MS = 130;

// Punkte pro gefressenem Futter.
export const SCORE_PER_FOOD = 10;
