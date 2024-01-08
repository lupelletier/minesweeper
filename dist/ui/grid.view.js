export class GridView {
    constructor(grid) {
        this.cells = [];
        this.grid = grid;
    }
    draw(game) {
        // Créaation d'une grille à l'aide de liste imbriquées
        const htmlMain = document.getElementById('ground');
        const htmlGrid = document.createElement('ul');
        htmlGrid.className = 'ground_grid';
        let width = this.grid.width;
        let height = this.grid.height;
        for (let y = 0; y < height; y++) {
            this.cells.push([]);
            // Dessin d'une ligne
            const htmlRow = document.createElement('li');
            const htmlCells = document.createElement('ul');
            htmlRow.className = 'ground_row';
            htmlRow.appendChild(htmlCells);
            htmlGrid.appendChild(htmlRow);
            for (let x = 0; x < width; x++) {
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
        htmlMain === null || htmlMain === void 0 ? void 0 : htmlMain.appendChild(htmlGrid);
        game.start();
    }
    show(cell) {
        this.cells[cell.y][cell.x].classList.remove('mask');
    }
    help(cell, hint) {
        this.cells[cell.y][cell.x].innerHTML = hint;
    }
}
GridView.BOMB = '<span class="material-symbols-outlined bomb">bomb</span>';
