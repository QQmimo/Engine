import { GameObject } from "../GameObject";

export class GameComponent {
    constructor(gameObject: GameObject) {
        this.GameObject = gameObject;
    }

    protected GameObject: GameObject;
    protected get IsPause(): boolean {
        return this.GameObject.Scene.IsPause;
    }

    public update?: () => void;
}