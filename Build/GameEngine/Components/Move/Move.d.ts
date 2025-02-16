import { GameComponent, GameObject } from "../../Core";
import { Angle, Vector2D } from "../../Utilities";
export declare class Move extends GameComponent {
    private _onStart;
    private _onFinish;
    private _onMove;
    private _onStop;
    private _MoveAngle;
    private _StartTravell;
    Speed: number;
    Target: Vector2D;
    get MoveAngle(): Angle;
    get IsMoving(): boolean;
    moveTo(gameObject: GameObject): void;
    moveTo(point: Vector2D): void;
    stop: () => void;
    onStart: (action: (object: GameObject, component: Move) => void) => void;
    onStop: (action: (object: GameObject, component: Move) => void) => void;
    onFinish: (action: (object: GameObject, component: Move) => void) => void;
    onMove: (action: (object: GameObject, component: Move) => void) => void;
    update: (deltaTime: number) => Promise<void>;
}
