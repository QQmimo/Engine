import { Vector } from "../../../Utilities";

export class Simplex {
    constructor() {
        this._Points = [];
    }

    private _Points: Vector[];

    public add = (vector: Vector): void => {
        this._Points.push(vector);
    }
    public calculateDirection = (): Vector | undefined => {
        const firstPoint: Vector = this._Points[this._Points.length - 1];
        const firstPointInvert: Vector = firstPoint.invert();

        if (this._Points.length === 3) {
            const secontPoint: Vector = this._Points[1];
            const thirdPoint: Vector = this._Points[0];

            const edgeFirstSecond: Vector = secontPoint.sub(firstPoint);
            const edgeFirstThird: Vector = thirdPoint.sub(firstPoint);

            let perpendicularFirstSecond: Vector = edgeFirstSecond.perpendicular();
            if (perpendicularFirstSecond.multyply(thirdPoint) >= 0) {
                perpendicularFirstSecond = perpendicularFirstSecond.invert();
            }

            if (perpendicularFirstSecond.multyply(firstPointInvert) > 0) {
                this._Points.splice(0, 1);
                return perpendicularFirstSecond;
            }

            let perpendicularFirstThird: Vector = edgeFirstThird.perpendicular();
            if (perpendicularFirstThird.multyply(secontPoint) >= 0) {
                perpendicularFirstThird = perpendicularFirstThird.invert();
            }

            if (perpendicularFirstThird.multyply(firstPointInvert) > 0) {
                this._Points.splice(1, 1);
                return perpendicularFirstThird;
            }
            return undefined;
        }

        const secondPoint: Vector = this._Points[0];
        const edgeFirstSecond: Vector = secondPoint.sub(firstPoint);
        let perpendicularFirstSecond: Vector = edgeFirstSecond.perpendicular();
        if (perpendicularFirstSecond.multyply(firstPointInvert) <= 0) {
            perpendicularFirstSecond = perpendicularFirstSecond.invert();
        }
        return perpendicularFirstSecond;
    }
}