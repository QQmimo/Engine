import { GameObject } from "../../Core";
import { Point } from "../Point";

export class Distance {
    public static solve(pointA: Point, pointB: Point): number
    public static solve(objectA: GameObject, objectB: GameObject): number
    public static solve(point: Point, object: GameObject): number
    public static solve(object: GameObject, point: Point): number
    public static solve(objectOrPointA: GameObject | Point, objectOrPointB: GameObject | Point): number {
        const pointA: Point = objectOrPointA instanceof GameObject ? objectOrPointA.Transform.Position : objectOrPointA;
        const pointB: Point = objectOrPointB instanceof GameObject ? objectOrPointB.Transform.Position : objectOrPointB;

        return Math.sqrt(Math.pow(pointB.X - pointA.X, 2) + Math.pow(pointB.Y - pointA.Y, 2));
    }
}