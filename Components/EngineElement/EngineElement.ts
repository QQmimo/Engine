import { EnumGeometry, Guid, TypeColor } from "../../Utilities";

export class EngineElement {
    protected ParentContext?: CanvasRenderingContext2D;
    protected Background: string;
    protected Opacity: number;
    public Id: string;
    public Type: EnumGeometry;
    public X: number;
    public Y: number;
    public Width: number;
    public Height: number;

    constructor(type: EnumGeometry, x: number, y: number, width: number, height: number = width) {
        this.Id = Guid.New();
        this.Type = type;
        this.X = x;
        this.Y = y;
        this.Width = width;
        this.Height = height;
        this.Opacity = 1;
    }

    public setContext = (parentContext: CanvasRenderingContext2D): void => {
        this.ParentContext = parentContext;
    }

    public setBackground = (fill: TypeColor, opacity: number = 1): void => {
        this.Background = fill;
        this.Opacity = opacity;
    }

    public moveTo = (targetX: number, targetY: number, speed: number = 1): Promise<void> => {
        return new Promise(resolve => {
            const move = (): void => {
                const angle: number = Math.atan2(targetY - this.Y, targetX - this.X);
                this.X += Math.round((Math.cos(angle) * speed + Number.EPSILON) * 10) / 10;
                this.Y += Math.round((Math.sin(angle) * speed + Number.EPSILON) * 10) / 10;

                if (Math.floor(this.X) === targetX) {
                    this.X = targetX;
                }

                if (Math.floor(this.Y) === targetY) {
                    this.Y = targetY;
                }

                console.log(`target: (${targetX}; ${targetY}) | obj: (${this.X}; ${this.Y})`);

                if (this.X === targetX && this.Y === targetY) {
                    resolve();
                }
                else {
                    setTimeout(() => {
                        move();
                    }, 10);
                }
            }
            move();
        });
    }

    public draw = (): void => {
        if (this.ParentContext) {
            this.ParentContext.beginPath();
            if (this.Background) {
                this.ParentContext.fillStyle = this.Background;
            }
            this.ParentContext.globalAlpha = this.Opacity;
            if (this.Type === EnumGeometry.Circle) {
                this.ParentContext.arc(this.X, this.Y, this.Width, 0, 2 * Math.PI);
            }
            else if (this.Type === EnumGeometry.Square) {
                this.ParentContext.fillRect(this.X, this.Y, this.Width, this.Height);
            }
            this.ParentContext.fill();
            this.ParentContext.closePath();
            this.ParentContext.restore();
        }
    }
}