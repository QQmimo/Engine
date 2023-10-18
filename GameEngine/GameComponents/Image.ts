import { Component } from "../GameObject";

export class Image extends Component {
    private _drawAction: Function;
    private _strokeWidth: number;
    private _strokeColor: string;
    private _backgroundColor: string;
    public draw = (): void => {
        this._drawAction = (): void => {
            
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
            
        }
    }
}