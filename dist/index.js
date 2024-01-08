// var WORLD = 'JS-World';
// function hello(who: string = WORLD):string {
//     return `Hello ${who}... Hot Reload `;
// }
// console.log("JS-Ready!");
// window.addEventListener('load', function(_) {
//     this.document.body.textContent = hello();
// });
import { Game } from './game.js';
import { Grid } from './grid.js';
window.addEventListener('load', (_) => {
    let grid = new Grid();
    console.log("Grid ready !");
    let game = new Game();
    console.log("Game ready !");
    grid.draw(game);
});
