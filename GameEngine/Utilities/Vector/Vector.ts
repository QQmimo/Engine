import { Point } from "../Point";

export class Vector {
    public Value: Point;

    constructor(valueOrPointA: number | Point, valueOrPointB?: number | Point) {
        if (typeof valueOrPointA === 'number' && typeof valueOrPointB === 'number') {
            this.Value = { X: valueOrPointA, Y: valueOrPointB ?? 0 };
        }
        else {
            this.Value = {
                X: valueOrPointB ? (valueOrPointB as Point).X - (valueOrPointA as Point).X : (valueOrPointA as Point).X,
                Y: valueOrPointB ? (valueOrPointB as Point).Y - (valueOrPointA as Point).Y : (valueOrPointA as Point).Y
            };
        }
    }

    public add = (vector: Vector): Vector => {
        return new Vector(this.Value.X + vector.Value.X, (this.Value?.Y ?? 0) + (vector.Value?.Y ?? 0));
    }
    public sub = (vector: Vector): Vector => {
        return this.add(new Vector(-vector.Value.X, (-vector.Value?.Y ?? 0)));
    }
    public multyply(value: number): Vector
    public multyply(vector: Vector): number
    public multyply(vectorOrValue: Vector | number): Vector | number {
        if (typeof vectorOrValue === 'number') {
            return new Vector(this.Value.X * vectorOrValue, (this.Value?.Y ?? 0) * vectorOrValue);
        }
        else if (vectorOrValue instanceof Vector) {
            return [this.Value.X * vectorOrValue.Value.X, (this.Value?.Y ?? 0) * (vectorOrValue.Value?.Y ?? 0)].reduce((a, b) => a + b, 0);
        }
    }
    public invert = (): Vector => {
        return this.multyply(-1);
    }
    public length = (): number => {
        return Math.sqrt(Math.pow(this.Value.X, 2) + Math.pow(this.Value.Y ?? 0, 2));
    }
    public perpendicular = (): Vector => {
        return new Vector(this.Value?.Y ?? 0, -this.Value.X);
    }
}