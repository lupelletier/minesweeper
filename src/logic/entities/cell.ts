import { EIcon } from "../enums/e-icon.js";
import { EItem } from "../enums/e-item.js";
import { Grid } from "./grid.js";
import { Item } from "./item.js";

export class Cell {
    readonly grid: Grid;
    readonly x: number;
    readonly y: number;
    item?: Item;
    hit = false;

    get icon(): EIcon {
        return this.item?.icon ?? EIcon._;
    }

    get bomb() {
        return this.item?.type == EItem.Bomb;
    }
    get ground(){
        return this.item == null;
    }

    constructor(grid: Grid, x: number, y: number) {
        this.grid = grid;
        this.x = x;
        this.y = y;
    }

    // Ajuste et affiche le risque de tomber sur une bombe on découvrant cette cellule et ses voisines 
    get risk(): number {
        let n = 0;
        this.grid.explore(this, (near) => {
            if(near.bomb)
                n += 1;
        });
        return n;
    }
}