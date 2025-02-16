import { GameComponent } from "../../Core";
import { Vector2D } from "../../Utilities";
import { FillStyle, LineStyle } from "./Properties";
export declare class Shape extends GameComponent {
    private _Dots;
    private _LineStyle;
    private _FillStyle;
    IsHidden: boolean;
    set LineStyle(value: LineStyle);
    get LineStyle(): LineStyle;
    set FillStyle(value: FillStyle);
    get FillStyle(): FillStyle;
    get Dots(): Vector2D[];
    clearLineStyle: () => void;
    clearFillStyle: () => void;
    draw: (...dots: Vector2D[]) => void;
    drawByDotsCount: (count: number, size: number) => void;
    drawLine: (pointA: Vector2D, pointB: Vector2D) => void;
    update: (deltaTime: number) => Promise<void>;
}
