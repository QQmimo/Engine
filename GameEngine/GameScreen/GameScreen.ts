import { BaseObject } from "../BaseObject";
import { GameLayer } from "../GameLayer";
import { GameObject } from "../GameObject";

export class GameScreen extends BaseObject {
    constructor(target: HTMLElement, width?: number, height?: number) {
        super('GameScreen');
        this.Canvas = document.createElement('canvas');
        this.Context = this.Canvas.getContext('2d');
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

    protected Loop: number;
    protected get Childs(): GameLayer[] {
        return super.Childs as GameLayer[];
    }
    public readonly Canvas: HTMLCanvasElement;
    public readonly Context: CanvasRenderingContext2D;

    private _resizeCanvas = (): void => {
        this.Canvas.width = innerWidth;
        this.Canvas.height = innerHeight;
        this.Canvas.style.cssText = 'position: absolute; top: 0; left: 0;';
    }

    public addLayer = (name: string): GameLayer => {
        const layer: GameLayer = new GameLayer(name, this);
        layer.Order = this.Childs.length;
        return layer;
    }

    public removeLayer = (name: string): void => {
        GameLayer.find(name)?.destroy();
    }

    public update = (): void => {
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        this.Childs.forEach(layer => {
            this.Context.setTransform(1, 0, 0, 1, 0, 0);
            layer.update();
            this.Context.restore();
        });
    }

    public sortLayers = (): void => {
        BaseObject.BaseObjects = new Map(Array.from(BaseObject.BaseObjects, ([key, value]) => value)
            .sort((a, b) => {
                if (!(a instanceof GameLayer) || !(b instanceof GameLayer)) {
                    return 0;
                }
                else if (a.Order > b.Order) {
                    return 1;
                }
                else if (a.Order < b.Order) {
                    return -1;
                }
                return 0;
            })
            .map(obj => [obj.Name, obj]));
    }

    public runLoop = (): void => {
        this.update();
        requestAnimationFrame(this.runLoop);
    }

    public stopLoop = (): void => {
        cancelAnimationFrame(this.Loop);
    }
}