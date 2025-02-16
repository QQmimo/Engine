import { Angle, Point, Vector2D } from "../../../Utilities";
import { GameObject } from "../GameObject";
export declare class Transform {
    constructor(gameObject: GameObject);
    private _GameObject;
    Position: Vector2D;
    Rotation: Angle;
    Scale: number;
    rotateToPoint(point: Point): void;
    rotateToPoint(object: GameObject): void;
}
