import { BaseObject } from "../BaseObject";
import { GameScene } from "../GameScene";

export class GameScreen extends BaseObject {
    constructor(target: HTMLElement, width?: number, height?: number) {
        super();
        this._Times = [];
        this._IsShowFps = false;
        this.Canvas = document.createElement('canvas');
        this.Context = this.Canvas.getContext('2d');
        if (width === undefined || height === undefined || width === null || height === null) {
            this._resizeCanvas();
            window.addEventListener("resize", (e) => {
                this._resizeCanvas();
            });
        }
        else {
            this.Canvas.width = width;
            this.Canvas.height = height;
        }
        target.appendChild(this.Canvas);
    }

    private _Times: number[];
    private _IsShowFps: boolean;
    private _resizeCanvas = (): void => {
        this.Canvas.width = innerWidth;
        this.Canvas.height = innerHeight;
        this.Canvas.style.cssText = 'position: absolute; top: 0; left: 0;';
    }
    private _onShowFps = (): number => {
        const now: number = performance.now();
        while (this._Times.length > 0 && this._Times[0] <= now - 1000) {
            this._Times.shift();
        }
        this._Times.push(now);
        return this._Times.length;
    }

    protected Loop: number;
    protected get Childs(): GameScene[] {
        return super.Childs as GameScene[];
    }

    //#region public fields and methods
    public set Name(value: string) {
        if (BaseObject.findByName(value)) {
            throw new Error(`ОШИБКА: ${this.constructor.name} с именем '${value}' уже существует.`);
        }
        super.Name = value;
    }
    public get Name(): string {
        return super.Name;
    }
    public get Width(): number {
        return this.Canvas.width;
    }
    public get Height(): number {
        return this.Canvas.height;
    }
    public readonly Canvas: HTMLCanvasElement;
    public readonly Context: CanvasRenderingContext2D;
    public get Scenes(): GameScene[] {
        return this.Childs;
    }
    public addScene = (name: string): GameScene => {
        return new GameScene(this, name);
    }
    public removeScene = (name: string): void => {
        GameScene.findByName(name)?.destroy();
    }
    public update = async (): Promise<void> => {
        const all: Promise<void>[] = [];
        this.Context.clearRect(0, 0, this.Width, this.Height);
        this.Childs.filter(scene => scene.IsActive).forEach(scene => {
            this.Context.setTransform(1, 0, 0, 1, 0, 0);
            all.push(scene.update());
            this.Context.restore();
        });
        if (this._IsShowFps) {
            this.showFps(this._IsShowFps);
        }
        await Promise.all(all);
    }
    public showFps = (status: boolean = false): void => {
        this._IsShowFps = status;
        if (this._IsShowFps) {
            this.Context.beginPath();
            this.Context.globalAlpha = 0.75;
            this.Context.fillStyle = 'black';
            this.Context.fillRect(10, 10, 70, 24);
            this.Context.closePath();
            this.Context.beginPath();
            this.Context.globalAlpha = 1;
            this.Context.textAlign = 'center';
            this.Context.strokeStyle = '#00fb00';
            this.Context.textBaseline = 'middle';
            this.Context.font = 'lighter 18px sans-serif';
            this.Context.moveTo(35, 22);
            this.Context.fillStyle = '#00fb00';
            this.Context.fillText(`FPS: ${this._onShowFps()}`, 45, 22, 70);
            this.Context.closePath();
        }
    }
    public play = (): void => {
        this.update();
        this.Loop = requestAnimationFrame(this.play);
    }
    public pause = (): void => {
        cancelAnimationFrame(this.Loop);
    }
    //#endregion

    //#region static fields and methods
    public static findSceneByName(name: string): GameScene | undefined {
        return Array.from(this.Objects, ([key, value]) => value).find(object => object instanceof GameScene && object.Name === name) as GameScene;
    }
    public static findById(id: string): GameScreen | undefined {
        return super.findById(id) as GameScreen;
    }
    public static findByName(name: string): GameScreen {
        return super.findByName(name) as GameScreen;
    }
    public static findByTag(tag: string): GameScreen[] {
        return super.findByTag(tag) as GameScreen[];
    }
    //#endregion
}