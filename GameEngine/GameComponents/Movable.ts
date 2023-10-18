import { Component, GameObject, Position } from "../GameObject";

export class Movable extends Component {
    private _onMove: (gameObject: GameObject, target: Position, angle: number) => void;
    private _onStart: (gameObject: GameObject, target: Position, angle: number) => void;
    private _onFinish: (gameObject: GameObject, target: Position, angle: number) => void;
    private _IsMoving: boolean = false;
    protected Target: Position;
    public Speed: number = 1;
    public Angle: number = 0;

    public moveTo = (target: Position): void => {
        this.Target = target;
    }

    public onMove = (action: (gameObject: GameObject, target: Position, angle: number) => void): void => {
        this._onMove = action;
    }

    public onFinish = (action: (gameObject: GameObject, target: Position, angle: number) => void): void => {
        this._onFinish = action;
    }

    public onStart = (action: (gameObject: GameObject, target: Position, angle: number) => void): void => {
        this._onStart = action;
    }

    public update = (): void => {
        if (this.GameObject.compareTag('Player')) {
            console.log(this.GameObject.Transform.Position, this.Target);
        }
        if (this.Target !== undefined && this.Target.X !== this.GameObject.Transform.Position.X && this.Target.Y !== this.GameObject.Transform.Position.Y) {
            if (this._onStart && this._IsMoving === false) {
                this._onStart(this.GameObject, this.Target, this.Angle);
            }

            this._IsMoving = true;
            this.Angle = Math.atan2(this.Target.Y - this.GameObject.Transform.Position.Y, this.Target.X - this.GameObject.Transform.Position.X);
            const stepX: number = Math.cos(this.Angle) * this.Speed;
            const stepY: number = Math.sin(this.Angle) * this.Speed;
            this.GameObject.Transform.Position.X += Math.floor(stepX);
            this.GameObject.Transform.Position.Y += Math.floor(stepY);

            if (Math.abs(this.GameObject.Transform.Position.X - this.Target.X) < stepX) {
                this.GameObject.Transform.Position.X = this.Target.X;
            }
            if (Math.abs(this.GameObject.Transform.Position.Y - this.Target.Y) < stepY) {
                this.GameObject.Transform.Position.Y = this.Target.Y;
            }

            if (this._onMove) {
                this._onMove(this.GameObject, this.Target, this.Angle);
            }
        }
        else if (this.Target !== undefined && this._onFinish) {
            this.Target = undefined;
            this._IsMoving = false;
            this._onFinish(this.GameObject, this.Target, this.Angle);
        }
    }
}