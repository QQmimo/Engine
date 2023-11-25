import { GameComponent } from "../../Core";
import { Angle, Point } from "../../Utilities";
import { FillStyle, LineStyle } from "./Properties";

export class Shape extends GameComponent {
    private _Dots: Point[] = [];
    private _LineStyle: LineStyle;
    private _FillStyle: FillStyle;

    public IsHidden: boolean = false;
    public set LineStyle(value: LineStyle) {
        this._LineStyle = { ...this._LineStyle, ...value };
    }
    public get LineStyle(): LineStyle {
        return this._LineStyle;
    }
    public set FillStyle(value: FillStyle) {
        this._FillStyle = { ...this._FillStyle, ...value };
    }
    public get FillStyle(): FillStyle {
        return this._FillStyle;
    }
    public get Dots(): Point[] {
        return this._Dots.map(dot => {
            return {
                X: dot.X + this.GameObject.Transform.Position.X,
                Y: dot.Y + this.GameObject.Transform.Position.Y
            };
        });
    }
    public clearLineStyle = (): void => {
        this._LineStyle = {};
    }
    public clearFillStyle = (): void => {
        this._FillStyle = {};
    }
    public draw = (...dots: Point[]): void => {
        this._Dots = dots;
        if (this.GameObject.Layer && !this.IsHidden) {
            this.GameObject.Screen.Context.beginPath();
            const centerX: number = this.GameObject.Transform.Position.X;
            const centerY: number = this.GameObject.Transform.Position.Y;
            const angle: number = this.GameObject.Transform.Rotation.toRadian();
            this._Dots.forEach((dot, index, self) => {
                const dotX: number = dot.X + centerX;
                const dotY: number = dot.Y + centerY;
                const cos: number = Math.cos(angle);
                const sin: number = Math.sin(angle);

                if (index === 0) {
                    this.GameObject.Screen.Context.moveTo(
                        (cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX,
                        (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY
                    );
                }
                else {
                    this.GameObject.Screen.Context.lineTo(
                        (cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX,
                        (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY
                    );
                }

                if (index === dots.length - 1) {
                    const dotX: number = self[0].X + centerX;
                    const dotY: number = self[0].Y + centerY;
                    this.GameObject.Screen.Context.lineTo(
                        (cos * (dotX - centerX)) + (sin * (dotY - centerY)) + centerX,
                        (cos * (dotY - centerY)) - (sin * (dotX - centerX)) + centerY
                    );
                }
            });
            if (this.LineStyle?.Color !== undefined && this.LineStyle?.Width !== 0) {
                this.GameObject.Screen.Context.globalAlpha = this.LineStyle?.Opacity || 1;
                this.GameObject.Screen.Context.setLineDash(this.LineStyle?.Template || []);
                this.GameObject.Screen.Context.lineWidth = this.LineStyle?.Width;
                this.GameObject.Screen.Context.strokeStyle = this.LineStyle?.Color;
                this.GameObject.Screen.Context.stroke();
            }
            this.GameObject.Screen.Context.globalAlpha = this.FillStyle?.Opacity || 1;
            this.GameObject.Screen.Context.fillStyle = this.FillStyle?.Color;
            this.GameObject.Screen.Context.fill();
            this.GameObject.Screen.Context.closePath();
        }
    }
    public drawByDotsCount = (count: number, distance: number): void => {
        const dots: Point[] = [];
        for (let i: number = 0; i < count; i++) {
            const angle: Angle = Angle.degree(360 / count * i);
            const CX: number = this.GameObject.Transform.Position.X;
            const CY: number = this.GameObject.Transform.Position.Y;
            const X: number = CX + distance;
            const Y: number = CY;
            const cos: number = Math.cos(angle.toRadian());
            const sin: number = Math.sin(angle.toRadian());

            dots.push({
                X: (cos * (X - CX)) + (sin * (Y - CY)),
                Y: (cos * (Y - CY)) - (sin * (X - CX))
            });
        }
        this.draw(...dots);
    }
    public drawLine = (pointA: Point, pointB: Point): void => {
        this.draw(pointA, pointB);
    }
    public update = async (): Promise<void> => {
        this.draw(...this._Dots);
    }
}