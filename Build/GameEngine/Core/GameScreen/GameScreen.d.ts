import { BaseObject } from "../BaseObject";
import { GameScene } from "../GameScene";
export declare class GameScreen extends BaseObject {
    constructor(target: HTMLElement, width?: number, height?: number);
    private _LastTime;
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
    update: (deltaTime: number) => Promise<void>;
    fps: (status?: boolean) => void;
    play: (currentTime?: number) => void;
    pause: () => void;
    static findSceneByName(name: string): GameScene | undefined;
    static findById(id: string): GameScreen | undefined;
    static findByName(name: string): GameScreen;
    static findByTag(tag: string): GameScreen[];
}
