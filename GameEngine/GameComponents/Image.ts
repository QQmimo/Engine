import { Component } from "../GameObject";

export class Image extends Component {
    private _drawAction: Function;
    private _StrokeWidth: number;
    private _StrokeColor: string;
    private _BackgroundColor: string;
    private _Opacity: number = 1;

    public draw = (): void => {
        this._drawAction = (): void => {
            if (this.GameObject.Layer && !this.GameObject.IsHidden) {
                this.GameObject.Layer.Context.beginPath();
                this.GameObject.Layer.Context.globalAlpha = this._Opacity;

                //FIXME: Добавить отрисовку картинки

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

    public setStroke = (width: number, color: string): void => {
        this._StrokeWidth = width;
        this._StrokeColor = color;
        this.update();
    }

    public setBackground = (color: string): void => {
        this._BackgroundColor = color;
        this.update();
    }

    public update = (): void => {
        if (this._drawAction) {
            this._drawAction();
        }
    }
}