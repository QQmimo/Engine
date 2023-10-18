import { GameObject } from "../GameObject";

export class Component {
    constructor(gameObject: GameObject) {
        this.GameObject = gameObject;
    }

    protected GameObject: GameObject;

    public update = (): void  => {}
}