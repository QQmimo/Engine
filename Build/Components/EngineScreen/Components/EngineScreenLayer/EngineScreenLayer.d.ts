import { EngineElement } from "../../../EngineElement/EngineElement";
export declare class EngineScreenLayer {
    protected Elements: EngineElement[];
    protected Context: CanvasRenderingContext2D;
    Canvas: HTMLCanvasElement;
    Name: string;
    Width: number;
    Height: number;
    constructor(name: string, width: number, height: number);
    addElement: (element: EngineElement) => void;
    removeElement(element: EngineElement): void;
    removeElement(elementId: string): void;
    update: () => void;
}
