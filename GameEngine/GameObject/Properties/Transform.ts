import { Position } from "./Position";
import { Rotation } from "./Rotation";

export class Transform {
    constructor() {
        this.Position = { X: 0, Y: 0 };
        this.Rotation = new Rotation(this.Position);
        this.Scale = 1;
    }

    private _Position: Position;

    public get Position(): Position {
        return this._Position
    }
    public set Position(value: Position) {
        this._Position = value;
        this.Rotation?.setCenter(this._Position);
    }
    public Rotation: Rotation;
    public Scale: number;
}