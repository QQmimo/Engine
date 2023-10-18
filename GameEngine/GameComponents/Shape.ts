import { Component, Position } from "../GameObject";

export class Shape extends Component {
    private _drawAction: Function;
    private _strokeWidth: number;
    private _strokeColor: string;
    private _backgroundColor: string;
    private _dots: Position[] = [];

    public draw = (...dots: Position[]): void => {
        this._dots = dots;
        this._drawAction = (): void => {
            if (this.GameObject.Layer) {
                this.GameObject.Layer.Context.beginPath();
                this._dots.forEach((dot, index, self) => {
                    if (index === 0) {
                        this.GameObject.Layer.Context.moveTo(
                            dot.X + this.GameObject.Transform.Position.X,
                            dot.Y + this.GameObject.Transform.Position.Y
                        );
                    }
                    else {
                        this.GameObject.Layer.Context.lineTo(
                            dot.X + this.GameObject.Transform.Position.X,
                            dot.Y + this.GameObject.Transform.Position.Y
                        );
                    }

                    if (index === dots.length - 1) {
                        this.GameObject.Layer.Context.lineTo(
                            self[0].X + this.GameObject.Transform.Position.X,
                            self[0].Y + this.GameObject.Transform.Position.Y
                        );
                    }
                });
                if (this._strokeColor) {
                    this.GameObject.Layer.Context.strokeStyle = this._strokeColor;
                    this.GameObject.Layer.Context.lineWidth = this._strokeWidth;
                    this.GameObject.Layer.Context.stroke();
                }
                if (this._backgroundColor) {
                    this.GameObject.Layer.Context.fillStyle = this._backgroundColor;
                    this.GameObject.Layer.Context.fill();
                }
                this.GameObject.Layer.Context.closePath();
            }
        }

        this.update();
    }

    public setStroke = (width: number, color: string): void => {
        this._strokeWidth = width;
        this._strokeColor = color;
        this.update();
    }

    public setBackground = (color: string): void => {
        this._backgroundColor = color;
        this.update();
    }

    public update = (): void => {
        if (this._drawAction) {
            this._drawAction();
        }
        this._rotate();
    }

    private _rotate = (): void => {
        if (this.GameObject.Layer) {
            const angle: number = this.GameObject.Transform.Rotation.getAsRadian();
            this._dots.forEach(dot => {
                const CX: number = this.GameObject.Transform.Position.X;
                const CY: number = this.GameObject.Transform.Position.Y;
                const X: number = dot.X + CX;
                const Y: number = dot.Y + CY;
                const cos: number = Math.cos(angle);
                const sin: number = Math.sin(angle);
                dot.X = (cos * (X - CX)) + (sin * (Y - CY));
                dot.Y = (cos * (Y - CY)) - (sin * (X - CX));
            });
        }
    }
}