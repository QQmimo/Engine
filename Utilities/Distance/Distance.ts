import { Position } from "../../GameEngine";

export class Distance {
    public static solve = (pointA: Position, pointB: Position = { X: 0, Y: 0 }): number => {
        return Math.sqrt(Math.pow(pointB.X - pointA.X, 2) + Math.pow(pointB.Y - pointA.Y, 2));
    }
}