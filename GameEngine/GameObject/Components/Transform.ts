import { GameObject } from "../GameObject";
import { Position } from "./Position";
import { Rotation } from "./Rotation";

export class Transform {
    constructor(gameObject: GameObject) {
        this.GameObject = gameObject;
        this.Rotation = new Rotation();
    }

    protected GameObject: GameObject;
    public Position: Position;
    public Rotation: Rotation;
}