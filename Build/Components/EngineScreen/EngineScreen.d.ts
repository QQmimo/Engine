import { EngineScreenLayer } from "./Components/EngineScreenLayer/EngineScreenLayer";
export declare class EngineScreen {
    protected Target: HTMLElement;
    protected Layers: EngineScreenLayer[];
    protected Width: number;
    protected Height: number;
    constructor(target: HTMLElement, width: number, height: number);
    addLayer: (layerName: string) => EngineScreenLayer;
    getLayerByName: (layerName: string) => EngineScreenLayer | undefined;
    render: () => void;
    run: () => void;
}
