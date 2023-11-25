import { BaseObject } from "../BaseObject";
import { GameScreen } from "../GameScreen";
import { GameLayer } from "../GameLayer";
export declare class GameScene extends BaseObject {
    constructor(parent: GameScreen, name: string);
    protected Parent: GameScreen;
    get Childs(): GameLayer[];
    IsActive: boolean;
    IsPause: boolean;
    get Layers(): GameLayer[];
    get Screen(): GameScreen | undefined;
    addLayer: (name: string) => GameLayer;
    update: () => Promise<void>;
    play: () => void;
    pause: () => void;
    static findById(id: string): BaseObject | undefined;
    static findByName(name: string): GameScene | undefined;
    static findByTag(tag: string): GameScene[];
    static findByParent(parent: GameScreen): GameScene[];
}
