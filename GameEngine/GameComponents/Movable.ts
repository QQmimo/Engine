import { Component, GameObject, Position } from "../GameObject";

export class Movable extends Component {
    private _onMove: (component: Movable, gameObject: GameObject, target: Position) => void;
    private _onStart: (component: Movable, gameObject: GameObject, target: Position) => void;
    private _onFinish: (component: Movable, gameObject: GameObject) => void;
    private _IsMoving: boolean = false;
    protected Target: Position;
    public Speed: number = 1;
    public Angle: number = 0;

    public moveTo = (target: Position): void => {
        this.Target = target;
    }

    public onMove = (action: (component: Movable, gameObject: GameObject, target: Position) => void): void => {
        this._onMove = action;
    }

    public onFinish = (action: (component: Movable, gameObject: GameObject) => void): void => {
        this._onFinish = action;
    }

    public onStart = (action: (component: Movable, gameObject: GameObject, target: Position) => void): void => {
        this._onStart = action;
    }

    private _move = (): void => {
        if (this.Target !== undefined && this.Target.X !== this.GameObject.Transform.Position.X && this.Target.Y !== this.GameObject.Transform.Position.Y) {
            this.Angle = Math.atan2(this.Target.Y - this.GameObject.Transform.Position.Y, this.Target.X - this.GameObject.Transform.Position.X);

            if (this._onStart && this._IsMoving === false) {
                this._onStart(this, this.GameObject, this.Target);
            }

            this._IsMoving = true;
            const stepX: number = Math.cos(this.Angle) * this.Speed;
            const stepY: number = Math.sin(this.Angle) * this.Speed;
            this.GameObject.Transform.Position.X += stepX;
            this.GameObject.Transform.Position.Y += stepY;

            if (Math.abs(this.GameObject.Transform.Position.X - this.Target.X) < stepX) {
                this.GameObject.Transform.Position.X = this.Target.X;
            }
            if (Math.abs(this.GameObject.Transform.Position.Y - this.Target.Y) < stepY) {
                this.GameObject.Transform.Position.Y = this.Target.Y;
            }

            if (this._onMove) {
                this._onMove(this, this.GameObject, this.Target);
            }
        }
        else if (this.Target !== undefined && this._onFinish) {
            this.Target = undefined;
            this._IsMoving = false;
            this._onFinish(this, this.GameObject);
        }
    }

    public update = (): void => {
        this._move();
    }
}