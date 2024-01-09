import { Subject } from "../helpers/subjects.js";
import { Popup } from "../facades/popup.js";
export class Game {
    constructor() {
        // Slots de notifications 
        this.onHit = new Subject();
        this.onHelp = new Subject();
    }
    // Démarrage du jeu
    // Ne fait rien pour l'instant, mais va devenir utile par la suite
    // ex : démarrer un timer, initialliser un score, etc.
    start() { }
    // Gestion d'un clic sur une cellule
    play(cell) {
        if (cell.hit)
            return;
        cell.hit = true;
        // En 
        this.onHit.raise(cell);
        if (cell.bomb) {
            Popup.INSTANCE.lose();
        }
        else {
            let n = cell.risk;
            let hint = cell.ground && n >= 1 ? `${n}` : cell.icon;
            this.onHelp.raise({ cell, hint });
            let grid = cell.grid;
            console.log(grid.remaining);
            if (grid.remaining == 0) {
                Popup.INSTANCE.win();
                return;
            }
            if (n == 0)
                grid.explore(cell, near => this.play(near));
        }
    }
}
// Singleton
Game.INSTANCE = new Game();
