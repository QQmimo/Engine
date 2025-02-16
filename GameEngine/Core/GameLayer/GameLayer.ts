import { BaseObject } from "../BaseObject";
import { GameObject } from "../GameObject";
import { GameScene } from "../GameScene";
import { GameScreen } from "../GameScreen";

export class GameLayer extends BaseObject {
    constructor(parent: GameScene, name: string) {
        super(name);
        this.Parent = parent;
        this.IsHidden = false;
    }

    private _Order: number;

    protected Parent: GameScene;
    protected get Childs(): GameObject[] {
        return super.Childs as GameObject[];
    }

    //#region public fields and methods
    public IsHidden: boolean;
    public set Order(value: number) {
        this._Order = value;
        BaseObject.Objects = new Map(Array.from(BaseObject.Objects, ([key, value]) => value)
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
            .map(object => [object.Id, object])
        );
    }
    public get Order(): number {
        return this._Order;
    }
    public get Scene(): GameScene | undefined {
        return this.Parent;
    }
    public get Screen(): GameScreen | undefined {
        return this.Parent?.Screen;
    }
    public get GameObjects(): GameObject[] {
        return this.Childs;
    }
    public addGameObject = (gameObject: GameObject): void => {
        gameObject.setLayer(this);
    }
    public update = async (deltaTime: number): Promise<void> => {
        const all: Promise<void>[] = [];
        this.Childs.forEach(object => {
            if (object.broadcast && this.IsHidden === false) {
                all.push(object.broadcast('update', deltaTime));
            }
        });
        await Promise.all(all);
    }
    //#endregion

    //#region static fields and methods
    public static findById(id: string): GameLayer | undefined {
        return super.findById(id) as GameLayer;
    }
    public static findByName(name: string): GameLayer {
        return super.findByName(name) as GameLayer;
    }
    public static findByTag(tag: string): GameLayer[] {
        return super.findByTag(tag) as GameLayer[];
    }
    public static findByParent(parent: GameScene): GameLayer[] {
        return super.findByParent(parent) as GameLayer[];
    }
    //#endregion
}