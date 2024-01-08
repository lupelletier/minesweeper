export class Grid {
    constructor() {
        this.WIDTH = 20;
        this.HEIGHT = 20;
        this.DENSITY = 0.1; // 10% de densité de bombes
        this.BOMBS = [];
        this.HITS = [];
        this.CELLS = [];
    }
    // Dessin de la grille
    draw(game) {
        // Créaation d'une grille à l'aide de liste imbriquées
        const htmlMain = document.getElementById('ground');
        const htmlGrid = document.createElement('ul');
        htmlGrid.className = 'ground_grid';
        for (let y = 0; y < this.HEIGHT; y++) {
            this.BOMBS.push([]);
            this.HITS.push([]);
            this.CELLS.push([]);
            // Dessin d'une ligne
            const htmlRow = document.createElement('li');
            const htmlCells = document.createElement('ul');
            htmlRow.className = 'ground_row';
            htmlRow.appendChild(htmlCells);
            htmlGrid.appendChild(htmlRow);
            for (let x = 0; x < this.WIDTH; x++) {
                const bomb = Math.random() < this.DENSITY;
                this.BOMBS[y].push(bomb);
                // Dessin d'une cellule
                const htmlCell = document.createElement('li');
                htmlCell.classList.add('ground_cell', 'mask');
                htmlCell.innerHTML = bomb ? Grid.BOMB : '';
                htmlCell.onclick = () => game.play(this, x, y);
                htmlCells.appendChild(htmlCell);
                this.CELLS[y].push(htmlCell);
            }
        }
        // Insertion du tableau dans la page
        htmlMain === null || htmlMain === void 0 ? void 0 : htmlMain.appendChild(htmlGrid);
        game.start(this);
    }
}
Grid.BOMB = '<span class="material-symbols-outlined bomb">bomb</span>';
