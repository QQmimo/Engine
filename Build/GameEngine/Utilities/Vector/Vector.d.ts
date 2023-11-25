import { Point } from "../Point";
export declare class Vector {
    Value: Point;
    constructor(valueOrPointA: number | Point, valueOrPointB?: number | Point);
    add: (vector: Vector) => Vector;
    sub: (vector: Vector) => Vector;
    multyply(value: number): Vector;
    multyply(vector: Vector): number;
    invert: () => Vector;
    length: () => number;
    perpendicular: () => Vector;
}
