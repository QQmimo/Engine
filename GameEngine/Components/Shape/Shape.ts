import { GameComponent } from "../../Core";
import { Angle, Point, Vector2D } from "../../Utilities";
import { FillStyle, LineStyle } from "./Properties";

export class Shape extends GameComponent {
    private _Dots: Vector2D[] = [];
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
    public get Dots(): Vector2D[] {
        return this._Dots.map(dot => dot.add(this.GameObject.Transform.Position));
    }
    public clearLineStyle = (): void => {
        this._LineStyle = {};
    }
    public clearFillStyle = (): void => {
        this._FillStyle = {};
    }
    public draw = (...dots: Vector2D[]): void => {
        this._Dots = dots;
        if (this.GameObject.Layer && !this.IsHidden) {
            this.GameObject.Screen.Context.beginPath();
            this._Dots.forEach((dot, index, self) => {
                if (index === 0) {
                    this.GameObject.Screen.Context.moveTo(
                        dot.X + this.GameObject.Transform.Position.X,
                        dot.Y + this.GameObject.Transform.Position.Y
                    );
                }
                else {
                    this.GameObject.Screen.Context.lineTo(
                        dot.X + this.GameObject.Transform.Position.X,
                        dot.Y + this.GameObject.Transform.Position.Y
                    );
                }
                if (index === dots.length - 1) {
                    this.GameObject.Screen.Context.lineTo(
                        self[0].X + this.GameObject.Transform.Position.X,
                        self[0].Y + this.GameObject.Transform.Position.Y
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
    public drawByDotsCount = (count: number, size: number): void => {
        const dots: Vector2D[] = [];
        for (let i: number = 0; i < count; i++) {
            const angle: Angle = Angle.degree(360 / count * i + this.GameObject.Transform.Rotation.toDegree());
            const CX: number = this.GameObject.Transform.Position.X;
            const CY: number = this.GameObject.Transform.Position.Y;
            const X: number = CX + size;
            const Y: number = CY;
            const cos: number = Math.cos(angle.toRadian());
            const sin: number = Math.sin(angle.toRadian());

            dots.push(new Vector2D(
                (cos * (X - CX)) + (sin * (Y - CY)),
                (cos * (Y - CY)) - (sin * (X - CX))
            ));
        }
        this.draw(...dots);
    }
    public drawLine = (pointA: Vector2D, pointB: Vector2D): void => {
        this.draw(pointA, pointB);
    }
    public update = async (deltaTime: number): Promise<void> => {
        this.draw(...this._Dots);
    }
}