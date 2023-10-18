import { GameScreen, GameLayer, GameObject, Shape, Movable } from "./GameEngine";
import { Random } from "./Utilities";

const screen: GameScreen = new GameScreen(document.body);
const world: GameLayer = screen.addLayer('world');

for (let i: number = 0; i < 10000; i++) {
    const cube: GameObject = new GameObject(`cube_${i}`, Shape, Movable);
    cube.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const size: number = Random.Integer(10, 25);

    const shape: Shape = cube.getComponent(Shape);
    shape?.setBackground(`rgb(${Random.Integer(0, 255)}, ${Random.Integer(0, 255)}, ${Random.Integer(0, 255)})`);
    shape?.drawByDots({ X: -size, Y: -size }, { X: size, Y: -size }, { X: size, Y: size }, { X: -size, Y: size });

    const movable: Movable = cube.getComponent(Movable);
    movable.Speed = Random.Integer(2, 10);
    movable.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    movable.onFinish((gameObject) => {
        gameObject.getComponent(Movable).Speed = Random.Integer(2, 10);
        gameObject.getComponent(Movable).moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    });

    world.addObject(cube);
}

screen.runLoop();