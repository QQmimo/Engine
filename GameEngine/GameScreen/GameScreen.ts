import { BaseObject } from "../BaseObject";
import { GameLayer } from "../GameLayer";

export class GameScreen extends BaseObject {
    constructor(target: HTMLElement, width?: number, height?: number) {
        super('GameScreen');
        this.Layers = [];
        this.Canvas = document.createElement('canvas');
        if (width === undefined || height === undefined || width === null || height === null) {
            this._resizeCanvas();
            window.addEventListener("resize", (e) => {
                this._resizeCanvas();
            });
        }
        else {
            this.Canvas.width = width;
            this.Canvas.height = height;
        }
        target.appendChild(this.Canvas);
    }

    public Canvas: HTMLCanvasElement;
    protected Layers: GameLayer[];


    private _resizeCanvas = (): void => {
        this.Canvas.width = innerWidth;
        this.Canvas.height = innerHeight;
        this.Canvas.style.cssText = 'position: absolute; top: 0; left: 0;';
    }

    public addLayer = (name: string): GameLayer => {
        const layer: GameLayer = new GameLayer(name, this);
        layer.Order = this.Layers.length;
        this.Layers.push(layer);
        return layer;
    }

    public sortLayers = (): void => {
        this.Layers = this.Layers.sort((a, b) => {
            if (a.Order > b.Order) {
                return -1;
            }
            else if (a.Order < b.Order) {
                return 1;
            }
            return 0;
        });
        this.update();
    }

    public removeLayer = (name: string): void => {
        this.Layers.find(layer => layer.Name === name)?.destroy();
    }

    public update = (): void => {
        this.clearGarbage();
        this.Layers.forEach(layer => {
            layer.Context.setTransform(1, 0, 0, 1, 0, 0);
            layer.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
            layer.update();
            layer.Context.restore();
        });

    }

    public clearGarbage = (): void => {
        this.Layers = this.Layers.filter(layer => layer.Name !== undefined);
    }

    public runLoop = (): void => {
        this.update();
        requestAnimationFrame(this.runLoop);
    }
}