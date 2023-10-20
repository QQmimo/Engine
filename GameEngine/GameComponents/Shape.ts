import { Component, Position } from "../GameObject";

export class Shape extends Component {
    private _drawAction: Function;
    private _Dots: Position[] = [];
    protected StrokeWidth: number;
    protected StrokeColor: string;
    protected StrokeDashTemplate: number[];
    protected BackgroundColor: string;
    protected Opacity: number = 1;

    public drawByDots = (...dots: Position[]): void => {
        this._Dots = dots;
        this._drawAction = (): void => {
            if (this.GameObject.Layer && !this.GameObject.IsHidden) {
                this.GameObject.Layer.Context.beginPath();
                this.GameObject.Layer.Context.globalAlpha = this.Opacity;
                const centerX: number = this.GameObject.Transform.Position.X;
                const centerY: number = this.GameObject.Transform.Position.Y;
                const andle: number = this.GameObject.Transform.Rotation.RadianAngle;
                this._Dots.forEach((dot, index, self) => {
                    const dotX: number = dot.X + centerX;
                    const dotY: number = dot.Y + centerY;
                    const cos: number = Math.cos(andle);
                    const sin: number = Math.sin(andle);

                    if (index === 0) {
                        this.GameObject.Layer.Context.moveTo(
                            (cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX,
                            (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY
                        );
                    }
                    else {
                        this.GameObject.Layer.Context.lineTo(
                            (cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX,
                            (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY
                        );
                    }

                    if (index === dots.length - 1) {
                        const dotX: number = self[0].X + centerX;
                        const dotY: number = self[0].Y + centerY;
                        this.GameObject.Layer.Context.lineTo(
                            (cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX,
                            (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY
                        );
                    }
                });
                if (this.StrokeColor) {
                    this.GameObject.Layer.Context.setLineDash(this.StrokeDashTemplate || []);
                    this.GameObject.Layer.Context.strokeStyle = this.StrokeColor;
                    this.GameObject.Layer.Context.lineWidth = this.StrokeWidth;
                    this.GameObject.Layer.Context.stroke();
                }
                if (this.BackgroundColor) {
                    this.GameObject.Layer.Context.fillStyle = this.BackgroundColor;
                    this.GameObject.Layer.Context.fill();
                }
                this.GameObject.Layer.Context.closePath();
            }
        }
    }

    public drawByDotsCount = (count: number, distance: number): void => {
        this._Dots = [];
        for (let i: number = 0; i < count; i++) {
            // FIXME: Нужен класс для конвертирования углов из радианы в градусы и обратно
            const angle: number = (360 / count) * (Math.PI / 180) * i;
            const CX: number = this.GameObject.Transform.Position.X;
            const CY: number = this.GameObject.Transform.Position.Y;
            const X: number = CX + distance;
            const Y: number = CY;
            const cos: number = Math.cos(angle);
            const sin: number = Math.sin(angle);

            this._Dots.push({
                X: (cos * (X - CX)) + (sin * (Y - CY)),
                Y: (cos * (Y - CY)) - (sin * (X - CX))
            });
        }

        this.drawByDots(...this._Dots);
    }

    public setStroke = (width: number, color: string = 'black'): void => {
        this.StrokeWidth = width;
        this.StrokeColor = color;
    }

    public setStrokeDash = (template: number[]): void => {
        this.StrokeDashTemplate = template;
    }

    public getStrokeWidth = (): number => {
        return this.StrokeWidth;
    }

    public getStrokeColor = (): string => {
        return this.StrokeColor;
    }

    public drawCircle = (radius: number): void => {
        this._drawAction = (): void => {
            if (this.GameObject.Layer && !this.GameObject.IsHidden) {
                this.GameObject.Layer.Context.beginPath();
                this.GameObject.Layer.Context.globalAlpha = this.Opacity;
                const centerX: number = this.GameObject.Transform.Position.X;
                const centerY: number = this.GameObject.Transform.Position.Y;

                this.GameObject.Layer.Context.arc(centerX, centerY, radius, this.GameObject.Transform.Rotation.RadianAngle, 2 * Math.PI);

                if (this.StrokeColor) {
                    this.GameObject.Layer.Context.setLineDash(this.StrokeDashTemplate || []);
                    this.GameObject.Layer.Context.strokeStyle = this.StrokeColor;
                    this.GameObject.Layer.Context.lineWidth = this.StrokeWidth;
                    this.GameObject.Layer.Context.stroke();
                }
                if (this.BackgroundColor) {
                    this.GameObject.Layer.Context.fillStyle = this.BackgroundColor;
                    this.GameObject.Layer.Context.fill();
                }
                this.GameObject.Layer.Context.closePath();
            }
        }
    }

    public drawLineTo = (point: Position): void => {
        this._drawAction = (): void => {
            if (this.GameObject.Layer && !this.GameObject.IsHidden) {
                this.GameObject.Layer.Context.beginPath();
                this.GameObject.Layer.Context.globalAlpha = this.Opacity;

                this.GameObject.Layer.Context.moveTo(this.GameObject.Transform.Position.X, this.GameObject.Transform.Position.Y);
                this.GameObject.Layer.Context.lineTo(point.X, point.Y);

                if (this.StrokeColor) {
                    this.GameObject.Layer.Context.setLineDash(this.StrokeDashTemplate || []);
                    this.GameObject.Layer.Context.strokeStyle = this.StrokeColor;
                    this.GameObject.Layer.Context.lineWidth = this.StrokeWidth;
                    this.GameObject.Layer.Context.stroke();
                }
            }
        }
    }

    public setBackground = (color: string): void => {
        this.BackgroundColor = color;
    }

    public getBackground = (): string => {
        return this.BackgroundColor;
    }

    public setOpacity = (opacity: number = 1): void => {
        this.Opacity = opacity;
    }

    public getOpacity = (): number => {
        return this.Opacity;
    }

    public update = (): void => {
        if (typeof this._drawAction !== 'undefined') {
            this._drawAction();
        }
    }
}