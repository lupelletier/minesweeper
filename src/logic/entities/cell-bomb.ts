import { EItem } from "../enums/e-items.js";
import { Cell } from "./cell.js";
import { Grid } from "./grid.js";

export class CellBomb extends Cell {
    constructor(grid: Grid, x: number, y: number) {
        // appelle le constructeur de la classe mère avec un item = EItem.Bomb : polymorphisme
        super(grid, x, y, EItem.Bomb);
    }

    get icon(): string {
        // set icone de la bombe
        return '<span class="material-symbols-outlined bomb">bomb</span>';
    }
}

