import { Position } from "../../GameEngine";

export class Vector {
    public Value: Position

    constructor(pointA: number | Position, pointB?: number | Position) {
        if (typeof pointA === 'number' && typeof pointB === 'number') {
            this.Value = { X: pointA, Y: pointB };
        }
        else {
            this.Value = {
                X: pointB ? (pointB as Position).X - (pointA as Position).X : (pointA as Position).X,
                Y: pointB ? (pointB as Position).Y - (pointA as Position).Y : (pointA as Position).Y
            };
        }
    }

    public add = (vector: Vector): Vector => {
        return new Vector(this.Value.X + vector.Value.X, this.Value.Y + vector.Value.Y);
    }

    public sub = (vector: Vector): Vector => {
        return new Vector(this.Value.X - vector.Value.X, this.Value.Y - vector.Value.Y);
    }

    public dot = (value: number): Vector => {
        return new Vector(this.Value.X * value, this.Value.Y * value);
    }

    public invert = (): Vector => {
        return this.dot(-1);
    }

    public multiply = (vector: Vector): number => {
        return [this.Value.X * vector.Value.X, this.Value.Y * vector.Value.Y].reduce((a, b) => a + b, 0);
    }

    public length = (): number => {
        return Math.sqrt(Math.pow(this.Value.X, 2) + Math.pow(this.Value.Y || 0, 2));
    }

    public perpendicular = (): Vector => {
        return new Vector(this.Value.Y, -this.Value.X);
    }
}
