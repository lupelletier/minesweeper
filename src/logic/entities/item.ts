import { EIcon } from "../enums/e-icon.js";
import { EItem } from "../enums/e-item.js";

export abstract class Item {

    // Propriétés 
    abstract get type() : EItem;
    abstract get icon() : EIcon;
}