import { BaseObject } from "../BaseObject";
import { GameScene } from "../GameScene";

export class GameScreen extends BaseObject {
    constructor(target: HTMLElement, width?: number, height?: number) {
        super('GameScreen');
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

    protected Loop: number;
    protected get Childs(): GameScene[] {
        return super.Childs as GameScene[];
    }
    public readonly Canvas: HTMLCanvasElement;
    public readonly Context: CanvasRenderingContext2D;

    private _resizeCanvas = (): void => {
        this.Canvas.width = innerWidth;
        this.Canvas.height = innerHeight;
        this.Canvas.style.cssText = 'position: absolute; top: 0; left: 0;';
    }

    public addScene = (name: string): GameScene => {
        const scene: GameScene = new GameScene(name, this);
        scene.Order = this.Childs.length;
        return scene;
    }

    public removeScene = (name: string): void => {
        GameScene.find(name)?.destroy();
    }

    public update = (): void => {
        this.Context.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
        this.Childs.filter(scene => scene.IsActive).forEach(scene => {
            this.Context.setTransform(1, 0, 0, 1, 0, 0);
            scene.update();
            this.Context.restore();
        });
    }

    public sortScenes = (): void => {
        BaseObject.BaseObjects = new Map(Array.from(BaseObject.BaseObjects, ([key, value]) => value)
            .sort((a, b) => {
                if (!(a instanceof GameScene) || !(b instanceof GameScene)) {
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
            .map(obj => [obj.Name, obj]));
    }

    public play = (): void => {
        //FIXME: Нужно подумать как переделать play/pause чтобы оно относилось только к активной scene
        this.update();
        this.Loop = requestAnimationFrame(this.play);
    }

    public pause = (): void => {
        cancelAnimationFrame(this.Loop);
    }
}