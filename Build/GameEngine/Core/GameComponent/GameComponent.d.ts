import { GameObject } from "../GameObject";
export declare class GameComponent {
    constructor(gameObject: GameObject);
    protected GameObject: GameObject;
    protected get IsPause(): boolean;
    update?: (deltaTime: number) => void;
}
