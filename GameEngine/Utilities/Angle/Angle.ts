import { GameObject } from "../../Core";
import { Point } from "../Point";

export class Angle extends Number {
    public toDegree(): number {
        return this.valueOf() * 180 / Math.PI;
    }
    public toRadian(): number {
        return this.valueOf();
    }

    public static degree(value: number): Angle {
        return new Angle(value * Math.PI / 180);
    }
    public static byPoints(objectA: GameObject, objectB: GameObject): Angle
    public static byPoints(object: GameObject, point: Point): Angle
    public static byPoints(point: Point, object: GameObject): Angle
    public static byPoints(pointA: Point, pointB: Point): Angle
    public static byPoints(pointOrObjectA: Point | GameObject, pointOrObjectB: Point | GameObject): Angle {
        const pointA: Point = pointOrObjectA instanceof GameObject ? pointOrObjectA.Transform.Position : pointOrObjectA;
        const pointB: Point = pointOrObjectB instanceof GameObject ? pointOrObjectB.Transform.Position : pointOrObjectB;
        return new Angle(Math.atan2(pointB.Y - pointA.Y, pointB.X - pointA.X));
    }
}