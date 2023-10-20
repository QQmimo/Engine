import { BaseObject } from "../BaseObject";
import { GameObject } from "../GameObject";
import { GameScreen } from "../GameScreen";

export class GameLayer extends BaseObject {
    constructor(name: string, screen: GameScreen) {
        super(name);
        this.Parent = screen;
        this.Context = screen.Context;
    }

    private _Order: number;
    protected Parent: GameScreen;
    protected get Childs(): GameObject[] {
        return super.Childs as GameObject[];
    }
    public get Order(): number {
        return this._Order;
    }
    public set Order(value: number) {
        this._Order = value;
        this.Parent.sortLayers();
    }

    public readonly Context: CanvasRenderingContext2D;

    public addObject = (gameObject: GameObject): void => {
        gameObject.setLayer(this);
    }

    public update = (): void => {
        this.Childs.forEach(gameObject => {
            if (gameObject.broadcast) {
                gameObject.broadcast('update');
            }
        });
    }
}