import { GameComponent, GameObject } from "../../Core";
export declare class Physic extends GameComponent {
    private _solveNeighbours;
    private _NeighboursCount;
    private _onNeighboursChange;
    private _onCollision;
    private _Neighbours;
    update: () => void;
    onCollision: (action: (objectA: GameObject, objectB: GameObject) => void) => void;
    onNeighboursChange: (count: number, action: (gameObject: GameObject, neighbours: GameObject[]) => void) => void;
    private static _getFarthestPoint;
    private static _getSupportPoint;
    static check(objectA: GameObject, objectB: GameObject): boolean;
}
