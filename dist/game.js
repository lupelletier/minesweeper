import { win, lose } from "./popup.js";
export class Game {
    constructor() {
        this._remaining = 0;
    }
    // Démarrage du jeu
    start(grid) {
        this._remaining = grid.WIDTH * grid.HEIGHT;
        console.log(this._remaining);
        for (let x = 0; x < grid.WIDTH; x++)
            for (let y = 0; y < grid.HEIGHT; y++)
                if (grid.BOMBS[y][x])
                    this._remaining -= 1;
        console.log(this._remaining);
    }
    // Gestion d'un clic sur une cellule
    play(grid, x, y) {
        if (grid.HITS[y][x])
            return;
        const cell = grid.CELLS[y][x];
        cell.classList.remove("mask");
        grid.HITS[y][x] = true;
        if (grid.BOMBS[y][x]) {
            lose();
        }
        else {
            let n = Game.risk(grid, x, y);
            let hint = n >= 1 ? `${n}` : "";
            grid.CELLS[y][x].innerHTML = hint;
            this._remaining -= 1;
            console.log(this._remaining);
            if (this._remaining == 0) {
                win();
                return;
            }
            if (n == 0)
                Game.explore(grid, x, y, (xi, yi) => this.play(grid, xi, yi));
        }
    }
    // Gestion d'un clic sur une cellule
    static risk(grid, column, line) {
        let n = 0;
        Game.explore(grid, column, line, (x, y) => {
            if (grid.BOMBS[y][x])
                n += 1;
        });
        return n;
    }
    // Explore le voisinage d'une cellule
    static explore(grid, column, line, visit) {
        const xmin = Math.max(column - 1, 0);
        const xmax = Math.min(column + 1, grid.WIDTH - 1);
        const ymin = Math.max(line - 1, 0);
        const ymax = Math.min(line + 1, grid.HEIGHT - 1);
        for (let x = xmin; x <= xmax; x++)
            for (let y = ymin; y < ymax; y++)
                if (x != column || y != line)
                    visit(x, y);
    }
}
