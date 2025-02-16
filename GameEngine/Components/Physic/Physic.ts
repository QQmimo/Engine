import { GameComponent, GameObject } from "../../Core";
import { Distance, Point } from "../../Utilities";
import { Move } from "../Move";
import { Shape } from "../Shape";

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

    public update = (deltaTime: number): void => {
        if ((this.GameObject.tryGetComponent(Move)?.IsMoving ?? false) && this._onCollision) {
            this._Neighbours = this._solveNeighbours();
            this._Neighbours.forEach(neighbour => {
                if (this.check(this.GameObject, neighbour)) {
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
    public check(objectA: GameObject, objectB: GameObject): boolean {
        const axes = this._getAxes(objectA).concat(this._getAxes(objectB));

        for (const axis of axes) {
            const proj1 = this._project(objectA, axis);
            const proj2 = this._project(objectB, axis);

            if (!this._overlaps(proj1, proj2)) {
                return false;
            }
        }

        return true;
    }

    private _project(object: GameObject, axis: Point): { min: number; max: number } {
        let min = Infinity;
        let max = -Infinity;

        for (const vertex of object.tryGetComponent(Shape)?.Dots ?? []) {
            const projection = axis.X * vertex.X + axis.Y * vertex.Y;
            min = Math.min(min, projection);
            max = Math.max(max, projection);
        }

        return { min, max };
    }

    private _overlaps(proj1: { min: number; max: number }, proj2: { min: number; max: number }): boolean {
        return proj1.max >= proj2.min && proj2.max >= proj1.min;
    }

    private _getAxes(object: GameObject): Point[] {
        const axes: Point[] = [];
        const vertices = object.tryGetComponent(Shape)?.Dots ?? [];

        for (let i = 0; i < vertices.length; i++) {
            const p1 = vertices[i];
            const p2 = vertices[(i + 1) % vertices.length];
            const edge: Point = { X: p2.X - p1.X, Y: p2.Y - p1.Y };
            const normal: Point = { X: -edge.Y, Y: edge.X };
            const length: number = Math.sqrt(normal.X ** 2 + normal.Y ** 2);
            axes.push({ X: normal.X / length, Y: normal.Y / length });
        }

        return axes;
    }
}