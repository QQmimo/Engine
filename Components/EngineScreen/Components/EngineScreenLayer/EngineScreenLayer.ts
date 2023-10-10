import { EngineElement } from "../../../EngineElement/EngineElement";

export class EngineScreenLayer {
    protected Elements: EngineElement[];
    protected Context: CanvasRenderingContext2D;
    public Canvas: HTMLCanvasElement;
    public Name: string;
    public Width: number;
    public Height: number;

    constructor(name: string, width: number, height: number) {
        this.Name = name;
        this.Width = width;
        this.Height = height;
        this.Canvas = document.createElement('canvas');
        this.Context = this.Canvas.getContext('2d');
        this.Canvas.width = this.Width;
        this.Canvas.height = this.Height;
        this.Elements = [];
    }

    public addElement = (element: EngineElement): void => {
        element.setContext(this.Context);
        this.Elements.push(element);
    }

    public removeElement(element: EngineElement): void
    public removeElement(elementId: string): void
    public removeElement(elementOrId: EngineElement | string): void {
        this.Elements = this.Elements.filter(e => e.Id !== (typeof elementOrId === 'string' ? elementOrId : elementOrId.Id));
    }

    public update = (): void => {
        this.Context.clearRect(0, 0, this.Width, this.Height);
        this.Elements.forEach(element => {
            element.draw();
        });
    }
}