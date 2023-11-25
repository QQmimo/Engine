import { BaseObject } from "../BaseObject";
import { GameScreen } from "../GameScreen";
import { GameLayer } from "../GameLayer";

export class GameScene extends BaseObject {
    constructor(parent: GameScreen, name: string) {
        super(name);
        this.Parent = parent;
        this.IsActive = true;
        this.IsPause = false;
    }

    protected Parent: GameScreen;
    public get Childs(): GameLayer[] {
        return super.Childs as GameLayer[];
    }

    //#region public fields and methods
    public IsActive: boolean;
    public IsPause: boolean;
    public get Layers(): GameLayer[] {
        return this.Childs;
    }
    public get Screen(): GameScreen | undefined {
        return this.Parent;
    }
    public addLayer = (name: string): GameLayer => {
        const layer: GameLayer = new GameLayer(this, name);
        layer.Order = this.Childs.length;
        return layer;
    }
    public update = async (): Promise<void> => {
        const all: Promise<void>[] = [];
        this.Childs.forEach(layer => {
            all.push(layer.update());
        });
        await Promise.all(all);
    }
    public play = (): void => {
        this.IsPause = false;
    }
    public pause = (): void => {
        this.IsPause = true;
    }
    //#endregion

    //#region static fields and methods
    public static findById(id: string): BaseObject | undefined {
        return this.Objects.get(id);
    }
    public static findByName(name: string): GameScene | undefined {
        return super.findByName(name) as GameScene;
    }
    public static findByTag(tag: string): GameScene[] {
        return super.findByTag(tag) as GameScene[];
    }
    public static findByParent(parent: GameScreen): GameScene[] {
        return super.findByParent(parent) as GameScene[];
    }
    //#endregion
}