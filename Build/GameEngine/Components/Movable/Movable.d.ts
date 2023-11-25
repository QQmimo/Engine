import { GameComponent, GameObject } from "../../Core";
import { Angle, Point } from "../../Utilities";
export declare class Movable extends GameComponent {
    private _onStart;
    private _onFinish;
    private _onMove;
    private _IsMoving;
    private _MoveAngle;
    Speed: number;
    Target: Point;
    get MoveAngle(): Angle;
    moveTo(gameObject: GameObject): void;
    moveTo(point: Point): void;
    onStart: (action: (object: GameObject, component: Movable) => void) => void;
    onFinish: (action: (object: GameObject, component: Movable) => void) => void;
    onMove: (action: (object: GameObject, component: Movable) => void) => void;
    update: () => void;
}
