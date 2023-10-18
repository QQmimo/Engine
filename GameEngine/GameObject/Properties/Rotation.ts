import { Angle } from "../../../Utilities";
import { GameObject } from "../GameObject";

export class Rotation {
    constructor(gameObject: GameObject) {
        this._Angle = new Angle(0);
        this.GameObject = gameObject;
    }

    protected GameObject: GameObject;
    private _Angle: Angle;

    public setAsDegree = (degree: number): void => {
        this._Angle = new Angle(degree);
    }

    public setAsRadian = (radian: number): void => {
        this._Angle = new Angle(Angle.radianToDegree(radian));
    }

    public getAsRadian = (): number => {
        return this._Angle.getAsRadian();
    }

    public getAsDegree = (): number => {
        return this._Angle.getAsDegree();
    }
}