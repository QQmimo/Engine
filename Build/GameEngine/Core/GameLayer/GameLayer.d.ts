import { BaseObject } from "../BaseObject";
import { GameObject } from "../GameObject";
import { GameScene } from "../GameScene";
import { GameScreen } from "../GameScreen";
export declare class GameLayer extends BaseObject {
    constructor(parent: GameScene, name: string);
    private _Order;
    protected Parent: GameScene;
    protected get Childs(): GameObject[];
    IsHidden: boolean;
    set Order(value: number);
    get Order(): number;
    get Scene(): GameScene | undefined;
    get Screen(): GameScreen | undefined;
    get GameObjects(): GameObject[];
    addGameObject: (gameObject: GameObject) => void;
    update: (deltaTime: number) => Promise<void>;
    static findById(id: string): GameLayer | undefined;
    static findByName(name: string): GameLayer;
    static findByTag(tag: string): GameLayer[];
    static findByParent(parent: GameScene): GameLayer[];
}
