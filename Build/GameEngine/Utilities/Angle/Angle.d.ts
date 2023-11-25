import { GameObject } from "../../Core";
import { Point } from "../Point";
export declare class Angle extends Number {
    toDegree(): number;
    toRadian(): number;
    static degree(value: number): Angle;
    static byPoints(objectA: GameObject, objectB: GameObject): Angle;
    static byPoints(object: GameObject, point: Point): Angle;
    static byPoints(point: Point, object: GameObject): Angle;
    static byPoints(pointA: Point, pointB: Point): Angle;
}
