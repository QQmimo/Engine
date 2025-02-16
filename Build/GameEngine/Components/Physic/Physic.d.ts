import { GameComponent, GameObject } from "../../Core";
export declare class Physic extends GameComponent {
    private _solveNeighbours;
    private _NeighboursCount;
    private _onNeighboursChange;
    private _onCollision;
    private _Neighbours;
    update: (deltaTime: number) => void;
    onCollision: (action: (objectA: GameObject, objectB: GameObject) => void) => void;
    onNeighboursChange: (count: number, action: (gameObject: GameObject, neighbours: GameObject[]) => void) => void;
    check(objectA: GameObject, objectB: GameObject): boolean;
    private _project;
    private _overlaps;
    private _getAxes;
}
