import { GridBuilder } from "../../helpers/grid.builder.js";
import { Game } from "../game.js";
import { Cell } from "./cell.js";

export class Grid{    
    readonly width: number;
    readonly height: number;
    readonly cells: Cell[][] = [];

    // Nombre de cellules saines non découvertes
    get remaining(){
        let n = 0;
        for(let row of this.cells)
            for(let cell of row)
                if(!cell.bomb && !cell.hit)
                    n += 1;
        return n;
    }

    constructor(width: number, height: number, density: number, rabbitsProbability: number) {
        this.width = width;
        this.height = height;
        // Utilisation du builder pour créer la grille avec les cellules remplies 
        const builder = new GridBuilder(this, width, height, density, rabbitsProbability);
        // Création de la grille remplie de bombes (nombre exact) et de lapins (probabilité)
        this.cells = builder.build();
    }

    // Explore le voisinage d'une cellule
    explore(cell: Cell, visit: (near: Cell) => void) {
        const xmin = Math.max(cell.x-1, 0);
        const xmax = Math.min(cell.x+1, this.width-1);
        const ymin = Math.max(cell.y-1, 0);
        const ymax = Math.min(cell.y+1, this.height-1);
        for (let x=xmin; x<=xmax; x++)
            for(let y=ymin; y<=ymax; y++)
                if(x != cell.x || y != cell.y)
                    visit(this.cells[y][x]);
    }    

    // Inverse 2 cellules 
    swap(cell1: Cell, cell2: Cell) {
        // Init de variables temporaires
        const item1 = cell1.item;
        const item2 = cell2.item;
        // Inversion du contenu des cellules
        cell1.item = item2;
        cell2.item = item1;
        // Déclenchement des événements de changement dans le jeu
        Game.INSTANCE.onChange.raise(cell1);
        Game.INSTANCE.onChange.raise(cell2);
    }
}