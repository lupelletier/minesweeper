import { EIcon } from "../enums/e-icon.js";
import { EItem } from "../enums/e-item.js";
import { Item } from "./item.js";

export class ItemRabbit extends Item {
    get type() {
        return EItem.Rabbit;
    }
    get icon() {
        return EIcon.Rabbit;
    }
}