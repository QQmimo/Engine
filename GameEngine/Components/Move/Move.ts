import { GameComponent, GameObject } from "../../Core";
import { Angle, Point, Vector2D } from "../../Utilities";

export class Move extends GameComponent {
    private _onStart?(object: GameObject, component: Move): void;
    private _onFinish?(object: GameObject, component: Move): void;
    private _onMove?(object: GameObject, component: Move): void;
    private _onStop?(object: GameObject, component: Move): void;
    private _MoveAngle: Angle = new Angle(0);
    private _StartTravell: boolean = false;

    public Speed: number;
    public Target: Vector2D;
    public get MoveAngle(): Angle {
        return this._MoveAngle;
    }
    public get IsMoving(): boolean {
        return this.Target !== undefined;
    }
    public moveTo(gameObject: GameObject): void
    public moveTo(point: Vector2D): void
    public moveTo(gameObjectOrPoint: GameObject | Vector2D): void {
        if (gameObjectOrPoint instanceof GameObject) {
            this.Target = gameObjectOrPoint.Transform.Position;
        }
        else {
            this.Target = gameObjectOrPoint;
        }
    }
    public stop = (): void => {
        this.Target = undefined;
        this._StartTravell = false;
        if (this._onStop) {
            this._onStop(this.GameObject, this);
        }
    }
    public onStart = (action: (object: GameObject, component: Move) => void): void => {
        this._onStart = action;
    }
    public onStop = (action: (object: GameObject, component: Move) => void): void => {
        this._onStop = action;
    }
    public onFinish = (action: (object: GameObject, component: Move) => void): void => {
        this._onFinish = action;
    }
    public onMove = (action: (object: GameObject, component: Move) => void): void => {
        this._onMove = action;
    }
    public update = async (deltaTime: number): Promise<void> => {
        if (this._onStart && this.IsMoving && !this._StartTravell) {
            this._StartTravell = true;
            this._onStart(this.GameObject, this);
        }
        if (this.GameObject.Transform.Position.X === this.Target?.X
            && this.GameObject.Transform.Position.Y === this.Target?.Y) {
            this.stop();
            if (this._onFinish) {
                this._onFinish(this.GameObject, this);
            }
            return;
        }
        if (this.IsPause === false && this.IsMoving) {
            this._MoveAngle = Angle.byPoints(this.GameObject, this.Target);

            if (this._onMove) {
                this._onMove(this.GameObject, this);
            }

            const direction: Vector2D = this.Target.subtract(this.GameObject.Transform.Position);
            if (direction.length() < 1) {
                this.stop();
                if (this._onFinish) {
                    this._onFinish(this.GameObject, this);
                }
                return;
            }
            const normilize: Vector2D = direction.normalize();
            this.GameObject.Transform.Position = this.GameObject.Transform.Position.add(normilize.multiply(this.Speed * deltaTime));
        }
    }
}