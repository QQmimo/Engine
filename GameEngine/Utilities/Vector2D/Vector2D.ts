import { Point } from "../Point";

export class Vector2D extends Point {
    constructor(x: number, y: number) {
        super();
        this.X = x;
        this.Y = y;
    }

    public X: number;
    public Y: number;

    public add(vector: Vector2D): Vector2D {
        return new Vector2D(this.X + vector.X, this.Y + vector.Y);
    }

    public multiply(scalar: number): Vector2D {
        return new Vector2D(this.X * scalar, this.Y * scalar);
    }
}