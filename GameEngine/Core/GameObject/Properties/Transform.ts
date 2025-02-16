import { Angle, Point, Vector2D } from "../../../Utilities";
import { GameObject } from "../GameObject";

export class Transform {
    constructor(gameObject: GameObject) {
        this.Position = new Vector2D(0, 0);
        this.Rotation = new Angle(0);
        this.Scale = 1;
        this._GameObject = gameObject;
    }

    private _GameObject: GameObject;

    public Position: Vector2D;
    public Rotation: Angle;
    public Scale: number;

    public rotateToPoint(point: Point): void
    public rotateToPoint(object: GameObject): void
    public rotateToPoint(pointOrObject: Point | GameObject): void {
        const point: Point = pointOrObject instanceof GameObject ? pointOrObject.Transform.Position : pointOrObject;
        this.Rotation = new Angle(-Angle.byPoints(this._GameObject, point).toRadian());
    }
}