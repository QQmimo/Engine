import { GameObject } from "../../Core";
import { Point } from "../Point";
export declare class Distance {
    static solve(pointA: Point, pointB: Point): number;
    static solve(objectA: GameObject, objectB: GameObject): number;
    static solve(point: Point, object: GameObject): number;
    static solve(object: GameObject, point: Point): number;
}
