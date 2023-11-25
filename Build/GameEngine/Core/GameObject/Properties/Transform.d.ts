import { Angle, Point } from "../../../Utilities";
import { GameObject } from "../GameObject";
export declare class Transform {
    constructor(gameObject: GameObject);
    private _GameObject;
    Position: Point;
    Rotation: Angle;
    Scale: number;
    rotateToPoint(point: Point): void;
    rotateToPoint(object: GameObject): void;
}
