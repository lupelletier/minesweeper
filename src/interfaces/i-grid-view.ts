
import { Cell } from "../logic/entities/cell.js";
import { Game } from "../logic/game.js";

export interface IGridView {
    draw(game: Game): void;
    show(cell: Cell): void;
    help(cell: Cell, hint: string): void;
}