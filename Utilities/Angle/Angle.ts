export class Angle {
    constructor(degree: number) {
        this._Degree = degree;
    }

    private _Degree: number;

    public getAsRadian = (): number => {
        return Angle.degreeToRadian(this._Degree);
    }

    public getAsDegree = (): number => {
        return this._Degree;
    }

    public static radianToDegree = (radian: number): number => {
        return radian * 180 / Math.PI;
    }

    public static degreeToRadian = (degree: number): number => {
        return degree * Math.PI / 180;
    }
}