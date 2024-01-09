import { EIcon } from "../enums/e-icon.js";
import { EItem } from "../enums/e-item.js";
import { Cell } from "./cell.js";
import { Item } from "./item.js";

export class ItemRabbit extends Item {
    //Propriétés
    get type() {
        return EItem.Rabbit;
    }
    get icon() {
        return EIcon.Rabbit;
    }

    wakeUp(cell: Cell): void {
        if (Math.random() < 0.2)
            this.move(cell);
    }

    move(cell: Cell)
    {
        // Choisir une case de destination
        const grid = cell.grid;
        const moves: Cell[] = [];
        grid.explore(cell, near => {
            if (!near.bomb)
                moves.push(near);
        });
        if (moves.length == 0)
            return;

        // Déplacer le lapin
        const i = Math.floor(Math.random() * moves.length);
        grid.swap(cell, moves[i])
    }
}