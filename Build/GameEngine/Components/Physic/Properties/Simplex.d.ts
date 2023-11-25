import { Vector } from "../../../Utilities";
export declare class Simplex {
    constructor();
    private _Points;
    add: (vector: Vector) => void;
    calculateDirection: () => Vector | undefined;
}
