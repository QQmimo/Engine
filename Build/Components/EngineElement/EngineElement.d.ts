import { EnumGeometry, TypeColor } from "../../Utilities";
export declare class EngineElement {
    protected ParentContext?: CanvasRenderingContext2D;
    protected Background: string;
    protected Opacity: number;
    Id: string;
    Type: EnumGeometry;
    X: number;
    Y: number;
    Width: number;
    Height: number;
    constructor(type: EnumGeometry, x: number, y: number, width: number, height?: number);
    setContext: (parentContext: CanvasRenderingContext2D) => void;
    setBackground: (fill: TypeColor, opacity?: number) => void;
    moveTo: (targetX: number, targetY: number, speed?: number) => Promise<void>;
    draw: () => void;
}
