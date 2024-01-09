import { Cell } from "./entities/cell.js";
import { Subject } from "../helpers/subjects.js";
import { Popup } from "../facades/popup.js";
export class Game{

    // Singleton
    public static INSTANCE : Game = new Game();
    private constructor(){}

    // Slots de notifications 
    onHit = new Subject<Cell>();
    // onHelp = new Subject<{cell: Cell, hint: string}>();
    onChange = new Subject<Cell>();

    // Démarrage du jeu
    // Ne fait rien pour l'instant, mais va devenir utile par la suite
    // ex : démarrer un timer, initialliser un score, etc.
    start(){}

    // Gestion d'un clic sur une cellule
    play(cell: Cell) {
        if (cell.hit)
            return;

        cell.hit = true;
        // En 
        this.onHit.raise(cell);
        if(cell.bomb){
           Popup.INSTANCE.lose();
        }else{
            let n = cell.risk;
            let hint = cell.ground && n>=1 ? `${n}` : cell.icon;
            this.onChange.raise(cell);
            let grid = cell.grid;
            console.log(grid.remaining);
            if(grid.remaining == 0){
                Popup.INSTANCE.win();
                return;
            }
            if (n == 0)
                grid.explore(cell, near => this.play(near));
        }
    }
}