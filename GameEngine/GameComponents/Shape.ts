import { Angle } from "../../Utilities";
import { Component, Position } from "../GameObject";

export class Shape extends Component {
    private _drawAction: Function;
    private _StrokeWidth: number;
    private _StrokeColor: string;
    private _BackgroundColor: string;
    private _Opacity: number = 1;
    private _Dots: Position[] = [];

    public drawByDots = (...dots: Position[]): void => {
        this._Dots = dots;
        this._drawAction = (): void => {
            if (this.GameObject.Layer && !this.GameObject.IsHidden) {
                this.GameObject.Layer.Context.beginPath();
                this.GameObject.Layer.Context.globalAlpha = this._Opacity;
                this._Dots.forEach((dot, index, self) => {
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
                if (this._StrokeColor) {
                    this.GameObject.Layer.Context.strokeStyle = this._StrokeColor;
                    this.GameObject.Layer.Context.lineWidth = this._StrokeWidth;
                    this.GameObject.Layer.Context.stroke();
                }
                if (this._BackgroundColor) {
                    this.GameObject.Layer.Context.fillStyle = this._BackgroundColor;
                    this.GameObject.Layer.Context.fill();
                }
                this.GameObject.Layer.Context.closePath();
            }
        }

        this.update();
    }

    public drawByDotsCount = (count: number, distance: number): void => {
        const dots: Position[] = [];
        for (let i: number = 0; i < count; i++) {
            const angle: number = new Angle(360 / count).getAsRadian() * i;
            const CX: number = this.GameObject.Transform.Position.X;
            const CY: number = this.GameObject.Transform.Position.Y;
            const X: number = CX + distance;
            const Y: number = CY;
            const cos: number = Math.cos(angle);
            const sin: number = Math.sin(angle);

            dots.push({
                X: (cos * (X - CX)) + (sin * (Y - CY)),
                Y: (cos * (Y - CY)) - (sin * (X - CX))
            });
        }

        this.drawByDots(...dots);
    }

    public setStroke = (width: number, color: string = 'black'): void => {
        this._StrokeWidth = width;
        this._StrokeColor = color;
        this.update();
    }

    public setBackground = (color: string): void => {
        this._BackgroundColor = color;
        this.update();
    }

    public setOpacity = (opacity: number = 1): void => {
        this._Opacity = opacity;
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
            this._Dots.forEach(dot => {
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