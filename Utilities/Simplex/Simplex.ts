import { Vector } from "../Vector/Vector";

export class Simplex {
    constructor() {
        this.Points = [];
    }

    protected Points: Vector[];

    public add = (vector: Vector): void => {
        this.Points.push(vector);
    }

    public calculateDirection = (): Vector | undefined => {
        const a: Vector = this.Points[this.Points.length - 1];
        const ao: Vector = a.invert();
        if (this.Points.length === 3) {
            const b: Vector = this.Points[1];
            const c: Vector = this.Points[0];

            const ab: Vector = b.sub(a);
            const ac: Vector = c.sub(a);

            let abPerp = ab.perpendicular();
            if (abPerp.multiply(c) >= 0) {
                abPerp = abPerp.invert();
            }
            if (abPerp.multiply(ao) > 0) {
                this.Points.splice(0, 1);
                return abPerp;
            }

            let acPerp: Vector = ac.perpendicular();
            if (acPerp.multiply(b) >= 0) {
                acPerp = acPerp.invert();
            }
            if (acPerp.multiply(ao) > 0) {
                this.Points.splice(1, 1);
                return acPerp;
            }
            return undefined;
        }

        const b: Vector = this.Points[0];
        const ab = b.sub(a);
        let abPerp: Vector = ab.perpendicular();
        if (abPerp.multiply(ao) <= 0) {
            abPerp = abPerp.invert();
        }
        return abPerp;
    }
}