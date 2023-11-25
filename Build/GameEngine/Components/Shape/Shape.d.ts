import { GameComponent } from "../../Core";
import { Point } from "../../Utilities";
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
    get Dots(): Point[];
    clearLineStyle: () => void;
    clearFillStyle: () => void;
    draw: (...dots: Point[]) => void;
    drawByDotsCount: (count: number, distance: number) => void;
    drawLine: (pointA: Point, pointB: Point) => void;
    update: () => Promise<void>;
}
