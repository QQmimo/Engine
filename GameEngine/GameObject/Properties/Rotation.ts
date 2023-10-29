import { Position } from "./Position";

export class Rotation {
    constructor(center: Position) {
        this.RadianAngle = 0;
        this.Center = center;
    }

    protected Center: Position;
    public RadianAngle: number;
    public get DegreeAngle(): number {
        return this.RadianAngle * 180 / Math.PI;
    }

    public rotateByPoint = (point: Position): number => {
        this.RadianAngle = -Math.atan2(point.Y - this.Center.Y, point.X - this.Center.X);
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

    public setCenter = (center: Position): void => {
        this.Center = center;
    }
}