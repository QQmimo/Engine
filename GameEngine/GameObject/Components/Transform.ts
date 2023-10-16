import { GameObject } from "../GameObject";

export class Transform {
    constructor(gameObject: GameObject) {
        this.GameObject = gameObject;
    }

    protected GameObject: GameObject;
}