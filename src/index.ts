import { Grid } from "./logic/entities/grid.js";
import { Game } from "./logic/game.js";

import { GridView } from "./ui/grid.view.js";

window.addEventListener('load', (_) => {
    let grid = new Grid(20, 20, 0.1);
    console.log("Grid ready !");
    let view = new GridView(grid);
    console.log("View ready !");
    let game = new Game();
    console.log("Game ready !");
    game.start();    
    view.draw(game);
});
