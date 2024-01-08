import { IGridView } from "../interfaces/i-grid-view.js";
import { Cell } from "../logic/entities/cell.js";
import { Grid } from "../logic/entities/grid.js";

import { Game } from "../logic/game.js";


export class GridView implements IGridView {
    private static readonly BOMB = '<span class="material-symbols-outlined bomb">bomb</span>';
    
    readonly grid: Grid;
    readonly cells: HTMLElement[][] = [];

    constructor(grid: Grid) {
        this.grid = grid;
    }

    draw(game: Game) {
        // Créaation d'une grille à l'aide de liste imbriquées
        const htmlMain = document.getElementById('ground');
        const htmlGrid = document.createElement('ul');
        htmlGrid.className = 'ground_grid';

        let width = this.grid.width;
        let height = this.grid.height;

        for (let y=0; y<height; y++) 
        {
            this.cells.push([]);

            // Dessin d'une ligne
            const htmlRow = document.createElement('li');
            const htmlCells = document.createElement('ul');
            htmlRow.className = 'ground_row';
            htmlRow.appendChild(htmlCells);
            htmlGrid.appendChild(htmlRow);

            for (let x=0; x<width; x++) 
            {
                // Dessin d'une cellule
                const cell = this.grid.cells[y][x];
                const htmlCell = document.createElement('li');
                htmlCell.classList.add('ground_cell', 'mask');
                htmlCell.innerHTML = cell.bomb ? GridView.BOMB : '';
                htmlCell.onclick = () => game.play(this, cell);
                htmlCells.appendChild(htmlCell);
                this.cells[y].push(htmlCell);
            }
        }
        // Insertion du tableau dans la page
        htmlMain?.appendChild(htmlGrid);
        game.start();
    }

    show(cell: Cell) {
        this.cells[cell.y][cell.x].classList.remove('mask');
    }

    help(cell: Cell, hint: string) {
        this.cells[cell.y][cell.x].innerHTML = hint;
    }
}