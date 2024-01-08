import { win, lose } from "./popup.js";
import { Grid } from "./grid.js";
export class Game{
    private _remaining = 0;

    // Démarrage du jeu
    start(grid: Grid){
        this._remaining = grid.WIDTH * grid.HEIGHT;
        console.log(this._remaining);
        for(let x=0; x<grid.WIDTH; x++)
            for(let y=0; y<grid.HEIGHT; y++)
                if(grid.BOMBS[y][x])
                    this._remaining -= 1;
                console.log(this._remaining);
    }

    // Gestion d'un clic sur une cellule
    play(grid: Grid, x:number, y:number) {
        if (grid.HITS[y][x])
            return;
        const cell = grid.CELLS[y][x];
        cell.classList.remove("mask");
        grid.HITS[y][x] = true;
        if(grid.BOMBS[y][x]){
            lose();
        }else{
            let n = Game.risk(grid, x, y);
            let hint = n>=1 ? `${n}` : "";
            grid.CELLS[y][x].innerHTML = hint;
            this._remaining -= 1;
            console.log(this._remaining);
            if(this._remaining == 0){
                win();
                return;
            }
            if (n == 0)
                Game.explore(grid, x, y, (xi, yi) => this.play(grid, xi, yi));
        }
    }

    // Gestion d'un clic sur une cellule
    private static risk(grid: Grid, column: number, line: number): number {
        let n = 0;
        Game.explore(grid, column, line, (x,y) => {
            if(grid.BOMBS[y][x])
                n += 1;
        });
        return n;
    }

    // Explore le voisinage d'une cellule
    private static explore(grid: Grid, column: number, line: number, visit: (x: number, y: number) => void){
        const xmin = Math.max(column-1, 0);
        const xmax = Math.min(column+1, grid.WIDTH-1);
        const ymin = Math.max(line-1, 0);
        const ymax = Math.min(line+1, grid.HEIGHT-1);
        for (let x=xmin; x<=xmax; x++)
            for(let y=ymin; y<ymax; y++)
                if(x != column || y != line)
                    visit(x,y);
    }
}