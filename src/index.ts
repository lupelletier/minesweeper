import { Grid } from "./logic/entities/grid.js";
import { Game } from "./logic/game.js";
import { GridView } from "./ui/grid.view.js";

window.addEventListener('load', (_) => {
    // Création de la grille en appelant le helper grid.builder.ts 
    let grid = new Grid(20, 20, 0.1, 0.03);
    console.log("Grid ready !");
    // Création de la vue en appelant le ui/grid.view.ts et lance le jeu
    let view = new GridView(grid);
    view.draw();
    console.log("View ready !");
    Game.INSTANCE.start();
});
