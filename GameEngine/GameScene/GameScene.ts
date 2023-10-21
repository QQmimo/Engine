import { BaseObject } from "../BaseObject";
import { GameLayer } from "../GameLayer";
import { GameScreen } from "../GameScreen";

export class GameScene extends BaseObject {
    constructor(name: string, screen: GameScreen) {
        super(name);
        this.Parent = screen;
        this.Context = screen.Context;
        this._IsActive = false;
    }

    private _IsActive: boolean;
    private _Order: number;
    protected Loop: number;
    protected Parent: GameScreen;
    public readonly Context: CanvasRenderingContext2D;
    public get IsActive(): boolean {
        return this._IsActive;
    }
    public set IsActive(value: boolean) {
        this._IsActive = value;
    }
    protected get Childs(): GameLayer[] {
        return super.Childs as GameLayer[];
    }
    public get Order(): number {
        return this._Order;
    }
    public set Order(value: number) {
        this._Order = value;
        this.Parent.sortScenes();
    }

    public addLayer = (name: string): GameLayer => {
        const layer: GameLayer = new GameLayer(name, this);
        layer.Order = this.Childs.length;
        return layer;
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

    public update = (): void => {
        this.Childs.forEach(layer => {
            layer.update();
        });
    }
}