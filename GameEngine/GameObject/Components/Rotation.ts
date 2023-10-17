import { Angle } from "../../../Utilities";

export class Rotation {
    constructor(angle: Angle = new Angle(0)) {
        this._Angle = angle;
    }

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