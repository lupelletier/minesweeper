import { CellBomb } from "../logic/entities/cell-bomb.js";
import { CellRabbit } from "../logic/entities/cell-rabbit.js";
import { Cell } from "../logic/entities/cell.js";
import { Grid } from "../logic/entities/grid.js";
import { EItem } from "../logic/enums/e-items.js";

export class GridBuilder {
    grid: Grid;
    width: number;
    height: number;
    density: number = 0.1;
    rabbits: number = 0.03;

    // Création d'une grille Grid
    constructor(grid: Grid, width: number, height: number, density: number, rabbits: number) {
        this.grid = grid;
        this.width = width;
        this.height = height;
        this.density = density;
        this.rabbits = rabbits;

    }

    build(): Cell[][] {
        const nbCells = this.width * this.height;
        const nbBombs = Math.floor(nbCells * this.density);

        // //Création d'un tableau rempli de false (cell != bomb)
        const vector = Array(nbCells).fill(false) as boolean[];

        // On place les bombes sur les premières cases du tableau (cell == true)
        // ON s'assure qu'il y ait toujours le bon nombre de bombes
        for (let i = 0; i < nbBombs; i++)
            vector[i] = true;
        
        // On mélange le les cases du tableau pour répartir les bombes
        let nbShuffle = nbCells;
        for (let shuffle = 0; shuffle < nbShuffle; shuffle++) {
            // On tire au hasard deux cases du tableau et on échange leur valeur
            let i = Math.floor(Math.random() * nbCells);
            let j = Math.floor(Math.random() * nbCells);
            if (i == j)
                continue;
            let a = vector[i];
            let b = vector[j];
            vector[i] = b;
            vector[j] = a;
        }

        // On transfére le tableau dans la grille
        // rows est un tableau de cellules (Cell[][])
        const rows: Cell[][] = [];
        for (let y = 0; y < this.height; y++) {
            let row = [] as Cell[];
            for (let x = 0; x < this.width; x++) {
                const bomb = vector[y * this.width + x];
                // On ajoute des bombes (exactement 10% de bombs)
                if (bomb){
                    row.push(new CellBomb(this.grid, x, y));
                    continue;  
                }
                // On ajoute des lapins (probabilité de rabbits = 0.03 )
                const rabbit = Math.random() < this.rabbits ? EItem.Rabbit : EItem.Ground;
                if (rabbit){
                    row.push(new CellRabbit(this.grid, x, y));
                    console.log('rabbit added');
                    continue;
                }
                row.push(new Cell(this.grid, x, y));
            }
            rows.push(row);
        }
        return rows;
    }
}