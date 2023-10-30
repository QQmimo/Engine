import { BaseObject } from "../BaseObject";
import { GameObject } from "../GameObject";
import { GameScene } from "../GameScene";

export class GameLayer extends BaseObject {
    constructor(name: string, scene: GameScene) {
        super(name);
        this.Parent = scene;
        this.Context = scene.Context;
    }

    private _Order: number;
    protected Parent: GameScene;
    protected get Childs(): GameObject[] {
        return super.Childs as GameObject[];
    }
    public get Scene(): GameScene {
        return this.Parent;
    }
    public get Order(): number {
        return this._Order;
    }
    public set Order(value: number) {
        this._Order = value;
        this.Parent.sortLayers();
    }

    public IsHidden: boolean = false;

    public readonly Context: CanvasRenderingContext2D;

    public addObject = (gameObject: GameObject): void => {
        gameObject.setLayer(this);
    }

    public update = (): void => {
        this.Childs.forEach(gameObject => {
            if (gameObject.broadcast && this.IsHidden === false) {
                gameObject.broadcast('update');
            }
        });
    }
}