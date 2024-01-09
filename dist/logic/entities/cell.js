import { EItem } from "../enums/e-items.js";
export class Cell {
    get icon() {
        return '';
    }
    get bomb() {
        return this.item == EItem.Bomb;
    }
    get ground() {
        return this.item == EItem.Ground;
    }
    constructor(grid, x, y, item) {
        this.hit = false;
        this.grid = grid;
        this.x = x;
        this.y = y;
        this.item = item !== null && item !== void 0 ? item : EItem.Ground;
    }
    // Ajuste et affiche le risque de tomber sur une bombe on découvrant cette cellule et ses voisines 
    get risk() {
        let n = 0;
        this.grid.explore(this, (near) => {
            if (near.bomb)
                n += 1;
        });
        return n;
    }
}
