import { GameComponent, GameObject } from "../../Core";
import { Angle, Point } from "../../Utilities";

export class Move extends GameComponent {
    private _onStart?(object: GameObject, component: Move): void;
    private _onFinish?(object: GameObject, component: Move): void;
    private _onMove?(object: GameObject, component: Move): void;
    private _IsMoving: boolean = false;
    private _MoveAngle: Angle = new Angle(0);

    public Speed: number = 0;
    public Target: Point;
    public get MoveAngle(): Angle {
        return this._MoveAngle;
    }
    public get IsMoving(): boolean {
        return this._IsMoving;
    }
    public moveTo(gameObject: GameObject): void
    public moveTo(point: Point): void
    public moveTo(gameObjectOrPoint: GameObject | Point): void {
        if (gameObjectOrPoint instanceof GameObject) {
            this.Target = gameObjectOrPoint.Transform.Position;
        }
        else {
            this.Target = gameObjectOrPoint;
        }
    }
    public stop = (): void => {
        this.Target = undefined;
    }
    public onStart = (action: (object: GameObject, component: Move) => void): void => {
        this._onStart = action;
    }
    public onFinish = (action: (object: GameObject, component: Move) => void): void => {
        this._onFinish = action;
    }
    public onMove = (action: (object: GameObject, component: Move) => void): void => {
        this._onMove = action;
    }
    public update = async (): Promise<void> => {
        if (this.IsPause === false
            && this.Target !== undefined
            && (this.Target.X !== this.GameObject.Transform.Position.X
                || this.Target.Y !== this.GameObject.Transform.Position.Y)) {
            this._MoveAngle = Angle.byPoints(this.GameObject, this.Target);

            if (this._onStart && this._IsMoving === false) {
                this._onStart(this.GameObject, this);
            }

            this._IsMoving = true;
            const stepX: number = Math.cos(this._MoveAngle.toRadian()) * this.Speed;
            const stepY: number = Math.sin(this._MoveAngle.toRadian()) * this.Speed;
            this.GameObject.Transform.Position.X += stepX;
            this.GameObject.Transform.Position.Y += stepY;

            if (Math.abs(this.GameObject.Transform.Position.X - this.Target.X) < stepX) {
                this.GameObject.Transform.Position.X = this.Target.X;
            }
            if (Math.abs(this.GameObject.Transform.Position.Y - this.Target.Y) < stepY) {
                this.GameObject.Transform.Position.Y = this.Target.Y;
            }

            if (this._onMove) {
                this._onMove(this.GameObject, this);
            }
        }
        else if (this.Target !== undefined && this._onFinish) {
            this.Target = undefined;
            this._IsMoving = false;
            this._onFinish(this.GameObject, this);
        }
    }
}