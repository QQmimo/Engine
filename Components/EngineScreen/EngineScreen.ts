import { EngineScreenLayer } from "./Components/EngineScreenLayer/EngineScreenLayer";

export class EngineScreen {
    protected Target: HTMLElement;
    protected Layers: EngineScreenLayer[];
    protected Width: number;
    protected Height: number;

    constructor(target: HTMLElement, width: number, height: number) {
        this.Target = target;
        this.Width = width;
        this.Height = height;
        this.Layers = [];
    }

    public addLayer = (layerName: string): EngineScreenLayer => {
        const findLayerByName: EngineScreenLayer | undefined = this.getLayerByName(layerName);
        if (findLayerByName) {
            throw new Error(`У слоев должно быть уникальное имя. Имя '${layerName}' уже существует.`);
        }

        const engineScreenLayer: EngineScreenLayer = new EngineScreenLayer(layerName, this.Width, this.Height);
        this.Layers.push(engineScreenLayer);
        this.Target.appendChild(engineScreenLayer.Canvas);
        return engineScreenLayer;
    }

    public getLayerByName = (layerName: string): EngineScreenLayer | undefined => {
        return this.Layers.find(layer => layer.Name === layerName);
    }

    public render = (): void => {
        this.Layers.forEach(layer => {
            layer.update();
        });
    }

    public run = (): void => {
        this.render();

        requestAnimationFrame(this.run);
    }
}