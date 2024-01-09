import { EItem } from "../enums/e-items.js";
import { Cell } from "./cell.js";
import { Grid } from "./grid.js";

export class CellRabbit extends Cell {
    constructor(grid: Grid, x: number, y: number) {
        // appelle le constructeur de la classe mère avec un item = EItem.Rabbit : polymorphisme
        super(grid, x, y, EItem.Rabbit);
    }

    get icon(): string {
        // set icone du lapin
        return '<span class="material-symbols-outlined">cruelty_free</span>';
    }
}

