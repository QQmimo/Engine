import { GameComponent, GameObject } from "../../Core";
import { Distance, Point, Vector } from "../../Utilities";
import { Move } from "../Move";
import { Shape } from "../Shape";
import { Simplex } from "./Properties";

export class Physic extends GameComponent {
    private _solveNeighbours = (): GameObject[] => {
        const neighbours = GameObject.findByComponent(Physic)
            .filter(object => object.Id !== this.GameObject.Id)
            .map(object => {
                return { distance: Distance.solve(this.GameObject, object), object: object };
            })
            .sort((a, b) => {
                if (a.distance > b.distance) {
                    return 1;
                }
                else if (a.distance < b.distance) {
                    return -1;
                }
                return 0;
            })
            .filter((object, index) => index < this._NeighboursCount)
            .map(object => object.object);

        if (this._onNeighboursChange) {
            this._onNeighboursChange(this.GameObject, neighbours);
        }
        return neighbours;
    }
    private _NeighboursCount: number = 1;
    private _onNeighboursChange: (gameObject: GameObject, neighbours: GameObject[]) => void;
    private _onCollision: (objectA: GameObject, objectB: GameObject) => void;
    private _Neighbours: GameObject[] = [];

    public update = (): void => {
        if (this._onCollision && (this.GameObject.tryGetComponent(Move)?.IsMoving ?? false)) {
            this._Neighbours = this._solveNeighbours();
            this._Neighbours.forEach(neighbour => {
                if (Physic.check(this.GameObject, neighbour)) {
                    this._onCollision(this.GameObject, neighbour);
                }
            });
        }
    };
    public onCollision = (action: (objectA: GameObject, objectB: GameObject) => void): void => {
        this._onCollision = action;
    }
    public onNeighboursChange = (count: number, action: (gameObject: GameObject, neighbours: GameObject[]) => void): void => {
        this._NeighboursCount = count;
        this._onNeighboursChange = action;
    }


    private static _getFarthestPoint(object: GameObject, direction: Vector): Vector {
        let distance: number = undefined;
        let farPoint: Point = { X: 0, Y: 0 };
        const shape: Shape = object.getComponent(Shape);
        shape.Dots.forEach(dot => {
            const distaneInDirection: number = direction.multyply(new Vector(dot));
            if (!distance || distance < distaneInDirection) {
                farPoint = dot;
                distance = distaneInDirection;
            }
        });
        return new Vector(farPoint);
    }
    private static _getSupportPoint(objectA: GameObject, objectB: GameObject, direction: Vector): Vector {
        const farthestPointA: Vector = this._getFarthestPoint(objectA, direction);
        const farthestPointB: Vector = this._getFarthestPoint(objectB, direction);
        return farthestPointA.sub(farthestPointB);
    }
    public static check(objectA: GameObject, objectB: GameObject): boolean {
        const simplex: Simplex = new Simplex();
        let direction: Vector = new Vector(0, 1);
        const supportPoint: Vector = this._getSupportPoint(objectA, objectB, direction);
        simplex.add(supportPoint);
        direction = direction.invert();

        while (direction) {
            const supportPoint: Vector = this._getSupportPoint(objectA, objectB, direction);

            if (supportPoint.multyply(direction!) <= 0) {
                return false;
            }

            simplex.add(supportPoint);
            direction = simplex.calculateDirection();
        }

        return true;
    }
}