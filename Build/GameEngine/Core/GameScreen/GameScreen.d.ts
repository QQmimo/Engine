import { BaseObject } from "../BaseObject";
import { GameScene } from "../GameScene";
export declare class GameScreen extends BaseObject {
    constructor(target: HTMLElement, width?: number, height?: number);
    private _Times;
    private _IsShowFps;
    private _resizeCanvas;
    private _onShowFps;
    protected Loop: number;
    protected get Childs(): GameScene[];
    set Name(value: string);
    get Name(): string;
    get Width(): number;
    get Height(): number;
    readonly Canvas: HTMLCanvasElement;
    readonly Context: CanvasRenderingContext2D;
    get Scenes(): GameScene[];
    addScene: (name: string) => GameScene;
    removeScene: (name: string) => void;
    update: () => Promise<void>;
    showFps: (status?: boolean) => void;
    play: () => void;
    pause: () => void;
    static findSceneByName(name: string): GameScene | undefined;
    static findById(id: string): GameScreen | undefined;
    static findByName(name: string): GameScreen;
    static findByTag(tag: string): GameScreen[];
}
