import { GameComponent, GameObject } from "../../Core";
import { Angle, Point } from "../../Utilities";
export declare class Move extends GameComponent {
    private _onStart;
    private _onFinish;
    private _onMove;
    private _IsMoving;
    private _MoveAngle;
    Speed: number;
    Target: Point;
    get MoveAngle(): Angle;
    get IsMoving(): boolean;
    moveTo(gameObject: GameObject): void;
    moveTo(point: Point): void;
    stop: () => void;
    onStart: (action: (object: GameObject, component: Move) => void) => void;
    onFinish: (action: (object: GameObject, component: Move) => void) => void;
    onMove: (action: (object: GameObject, component: Move) => void) => void;
    update: () => Promise<void>;
}
