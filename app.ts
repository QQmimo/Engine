import { GameScreen, GameLayer, GameObject, Shape, Movable } from "./GameEngine";
import { Random } from "./Utilities";

const screen: GameScreen = new GameScreen(document.body);
const world: GameLayer = screen.addLayer('world');

for (let i: number = 0; i < 500; i++) {
    const cube: GameObject = new GameObject(`cube_${i}`, Shape, Movable);
    cube.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const size: number = Random.Integer(10, 25);

    const shape: Shape = cube.getComponent(Shape);
    shape.setBackground(Random.Color());
    shape.drawByDots({ X: size, Y: 0 }, { X: -size, Y: size }, { X: -size, Y: -size });

    const movable: Movable = cube.getComponent(Movable);
    movable.Speed = Random.Integer(2, 10);
    movable.onStart((gameObject, target) => {
        gameObject.Transform.Rotation.rotateByPoint(target);
    });
    movable.onFinish((gameObject) => {
        gameObject.getComponent(Movable).Speed = Random.Integer(2, 10);
        gameObject.getComponent(Movable).moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    });
    movable.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });

    world.addObject(cube);
}

screen.runLoop();