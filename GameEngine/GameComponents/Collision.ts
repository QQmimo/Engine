import { Distance, Vector } from "../../Utilities";
import { Simplex } from "../../Utilities/Simplex/Simplex";
import { Component, GameObject, Position } from "../GameObject";
import { Shape } from "./Shape";

export class Collision extends Component {
    private _onCollision: (target: GameObject, obj: GameObject) => void;
    public update = (): void => {
        const allCollision: GameObject[] = GameObject.findByComponent(Collision);
        allCollision.filter(obj => obj.Name !== this.GameObject.Name).forEach(obj => {
            if (Collision.check(this.GameObject, obj)) {
                if (this._onCollision) {
                    this._onCollision(this.GameObject, obj);
                }
            }
        });
    }

    public onCollision = (action: (target: GameObject, obj: GameObject) => void): void => {
        this._onCollision = action;
    }


    private static _farthestPoint(obj: GameObject, direction: Vector): Vector {
        let distance: number;
        let farPoint: Position = { X: 0, Y: 0 };
        let shape: Shape = obj.getComponent(Shape);
        for (const point of shape.getDots()) {
            const distanceInDirection: number = direction.multiply(new Vector(point));
            if (!distance || distance < distanceInDirection) {
                farPoint = point;
                distance = distanceInDirection;
            }
        }
        return new Vector(farPoint);
    }

    private static _support(objA: GameObject, objB: GameObject, direction: Vector): Vector {
        const fartestPointA: Vector = this._farthestPoint(objA, direction);
        const fartestPointB: Vector = this._farthestPoint(objB, direction.invert());

        return fartestPointA.sub(fartestPointB);
    }

    public static check(objA: GameObject, objB: GameObject): boolean {
        const simplex: Simplex = new Simplex();
        let direction: Vector = new Vector(0, 1);
        const initSupportPoint = Collision._support(objA, objB, direction);
        simplex.add(initSupportPoint);
        direction = direction.invert();

        while (direction) {
            const supportPoint = Collision._support(objA, objB, direction);

            if (supportPoint.multiply(direction!) <= 0) {
                return false;
            }

            simplex.add(supportPoint);
            direction = simplex.calculateDirection();
        }

        return true;
    }
}