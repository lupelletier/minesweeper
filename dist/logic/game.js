import { win, lose } from "../popup.js";
export class Game {
    // Démarrage du jeu
    // Ne fait rien pour l'instant, mais va devenir utile par la suite
    // ex : démarrer un timer, initialliser un score, etc.
    start() { }
    // Gestion d'un clic sur une cellule
    play(view, cell) {
        if (cell.hit)
            return;
        cell.hit = true;
        view.show(cell);
        if (cell.bomb) {
            lose();
        }
        else {
            let n = cell.risk;
            let hint = n >= 1 ? `${n}` : "";
            view.help(cell, hint);
            let grid = cell.grid;
            console.log(grid.remaining);
            if (grid.remaining == 0) {
                win();
                return;
            }
            if (n == 0)
                grid.explore(cell, (near) => this.play(view, near));
        }
    }
}
