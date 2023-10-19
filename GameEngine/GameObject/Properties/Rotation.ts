import { GameObject } from "../GameObject";
import { Position } from "./Position";

export class Rotation {
    constructor(gameObject: GameObject) {
        this.RadianAngle = 0;
        this.GameObject = gameObject;
    }

    protected GameObject: GameObject;
    public RadianAngle: number;
    public get DegreeAngle(): number {
        return this.RadianAngle * 180 / Math.PI;
    }

    public rotateByPoint = (point: Position): number => {
        this.RadianAngle = -Math.atan2(point.Y - this.GameObject.Transform.Position.Y, point.X - this.GameObject.Transform.Position.X);
        return this.RadianAngle;
    }

    public rotateByDegree = (degree: number): number => {
        this.RadianAngle = degree * Math.PI / 180;
        return this.RadianAngle;
    }

    public rotateByRadian = (radian: number): number => {
        this.RadianAngle = radian;
        return this.RadianAngle;
    }
}