import { BaseObject } from "../BaseObject";
import { GameObject } from "../GameObject";
import { GameScreen } from "../GameScreen";

export class GameLayer extends BaseObject {
    constructor(name: string, screen: GameScreen) {
        super(name);
        this.Parent = screen;
        this.Context = screen.Context;
        //FIXME: Нужно сделать очередь отрисовки на основе слоя
    }

    protected Parent: GameScreen;
    protected get Childs(): GameObject[] {
        return super.Childs as GameObject[];
    }

    public readonly Context: CanvasRenderingContext2D;

    public addObject = (gameObject: GameObject): void => {
        gameObject.setLayer(this);
    }

    public update = (): void => {
        this.Childs.forEach(gameObject => {
            if (gameObject.broadcastRun) {
                gameObject.broadcastRun('update');
            }
        });
    }
}