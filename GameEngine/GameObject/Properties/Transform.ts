import { GameObject } from "../GameObject";
import { Position } from "./Position";
import { Rotation } from "./Rotation";

export class Transform {
    constructor(gameObject: GameObject) {
        this.GameObject = gameObject;
        this.Rotation = new Rotation(gameObject);
        this.Position = { X: 0, Y: 0 };
        this.Scale = 1;
    }

    protected GameObject: GameObject;
    public Position: Position;
    public Rotation: Rotation;
    public Scale: number;
}