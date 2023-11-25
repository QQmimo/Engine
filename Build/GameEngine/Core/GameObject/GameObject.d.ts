import { BaseObject } from "../BaseObject";
import { GameComponent } from "../GameComponent";
import { GameLayer } from "../GameLayer";
import { GameScene } from "../GameScene";
import { GameScreen } from "../GameScreen";
import { Transform } from "./Properties";
export declare class GameObject extends BaseObject {
    constructor(name: string, ...components: typeof GameComponent[]);
    protected Components: Map<string, GameComponent>;
    protected addComponent: <T extends GameComponent>(componentType: new (gameObject: GameObject) => T) => void;
    protected Parent: GameLayer;
    Transform: Transform;
    get Layer(): GameLayer | undefined;
    get Scene(): GameScene | undefined;
    get Screen(): GameScreen | undefined;
    setLayer: (layer: GameLayer) => void;
    broadcast: (methodName: string, ...args: unknown[]) => Promise<void>;
    getComponent: <T extends GameComponent>(componentType: new (gameObject: GameObject) => T) => T;
    tryGetComponent: <T extends GameComponent>(componentType: new (gameObject: GameObject) => T) => T;
    detachComponent: <T extends GameComponent>(componentType: new (gameObject: GameObject) => T) => void;
    static findById(id: string): GameObject | undefined;
    static findByName(name: string): GameObject;
    static findByTag(tag: string): GameObject[];
    static findByParent(parent: GameLayer): GameObject[];
    static findByComponent(component: {
        new (gameObject: GameObject): GameComponent;
    }): GameObject[];
}
