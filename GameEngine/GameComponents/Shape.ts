import { Component, Position } from "../GameObject";

export class Shape extends Component {
    private _drawAction: Function;
    private _Dots: Position[] = [];
    private _Radius: number;
    protected StrokeWidth: number;
    protected StrokeColor: string;
    protected StrokeDashTemplate: number[];
    protected BackgroundColor: string;
    protected Opacity: number = 1;

    public drawByDots = (...dots: Position[]): void => {
        this._Radius = undefined;
        this._Dots = dots;
        this._drawAction = (): void => {
            if (this.GameObject.Layer && !this.GameObject.IsHidden) {
                this.GameObject.Layer.Context.beginPath();
                this.GameObject.Layer.Context.globalAlpha = this.Opacity;
                const centerX: number = this.GameObject.Transform.Position.X;
                const centerY: number = this.GameObject.Transform.Position.Y;
                const angle: number = this.GameObject.Transform.Rotation.RadianAngle;
                this._Dots.forEach((dot, index, self) => {
                    const dotX: number = dot.X + centerX;
                    const dotY: number = dot.Y + centerY;
                    const cos: number = Math.cos(angle);
                    const sin: number = Math.sin(angle);

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
                this.GameObject.Layer.Context.setLineDash(this.StrokeDashTemplate || []);
                this.GameObject.Layer.Context.strokeStyle = this.StrokeColor;
                this.GameObject.Layer.Context.lineWidth = this.StrokeWidth;
                this.GameObject.Layer.Context.stroke();
                this.GameObject.Layer.Context.fillStyle = this.BackgroundColor;
                this.GameObject.Layer.Context.fill();
                this.GameObject.Layer.Context.closePath();
            }
        }
    }

    public drawByDotsCount = (count: number, distance: number): void => {
        const dots: Position[] = [];
        for (let i: number = 0; i < count; i++) {
            // FIXME: Нужен класс для конвертирования углов из радианы в градусы и обратно
            const angle: number = (360 / count) * (Math.PI / 180) * i;
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
        this._Radius = radius;
        this._drawAction = (): void => {
            if (this.GameObject.Layer && !this.GameObject.IsHidden) {
                this.GameObject.Layer.Context.beginPath();
                this.GameObject.Layer.Context.globalAlpha = this.Opacity;
                const centerX: number = this.GameObject.Transform.Position.X;
                const centerY: number = this.GameObject.Transform.Position.Y;

                this.GameObject.Layer.Context.arc(centerX, centerY, radius, this.GameObject.Transform.Rotation.RadianAngle, 2 * Math.PI + this.GameObject.Transform.Rotation.RadianAngle);

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
        this._Radius = undefined;
        this._Dots = [this.GameObject.Transform.Position, point];
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

    public getDots = (): Position[] => {
        return this._Dots.map(dot => {
            return {
                X: dot.X + this.GameObject.Transform.Position.X,
                Y: dot.Y + this.GameObject.Transform.Position.Y
            };
        });
    }

    public getRadius = (): number => {
        return this._Radius;
    }

    public update = (): void => {
        if (typeof this._drawAction !== 'undefined') {
            this._drawAction();
        }
    }
}