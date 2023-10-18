import { BaseObject } from "../BaseObject";
import { GameObject } from "../GameObject";
import { GameScreen } from "../GameScreen";

export class GameLayer extends BaseObject {
    constructor(name: string, screen: GameScreen) {
        super(name);
        this.Screen = screen;
        this.Context = this.Screen.Canvas.getContext('2d');
        this.GameObjects = [];
    }

    private _Order: number;
    protected Screen: GameScreen;
    public readonly Context: CanvasRenderingContext2D;
    public GameObjects: GameObject[];
    public set Order(value: number) {
        this._Order = value;
        this.Screen.sortLayers();
    }
    public get Order(): number {
        return this._Order;
    }

    public addObject = (gameObject: GameObject): void => {
        gameObject.setLayer(this);
        this.GameObjects.push(gameObject);
    }

    public update = (): void => {
        this.GameObjects.forEach(gameObject => {
            gameObject.broadcastRun('update');
        });
    }
}