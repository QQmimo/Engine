import { GameScreen, GameLayer, GameObject, Shape, Movable } from "./GameEngine";
import { Random } from "./Utilities";

const screen: GameScreen = new GameScreen(document.body);
const world: GameLayer = screen.addLayer('world');
world.Order = 2;

const firstPlan: GameLayer = screen.addLayer('first plan');
firstPlan.Order = 1;
const cube: GameObject = new GameObject('cube', Shape);
cube.Transform.Position = { X: innerWidth / 2, Y: innerHeight / 2 };
const shape: Shape = cube.getComponent(Shape);
shape.setBackground('red');
shape.drawByDots({ X: -100, Y: -100 }, { X: 100, Y: -100 }, { X: 100, Y: 100 }, { X: -100, Y: 100 });
firstPlan.addObject(cube);

for (let i: number = 0; i < 50; i++) {
    const cube: GameObject = new GameObject(`cube_${i}`, Shape, Movable);
    cube.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const size: number = Random.Integer(10, 25);

    const shape: Shape = cube.getComponent(Shape);
    shape.setBackground(Random.Color());
    shape.drawByDots({ X: -size, Y: -size }, { X: size, Y: -size }, { X: size, Y: size }, { X: -size, Y: size });

    const movable: Movable = cube.getComponent(Movable);
    movable.Speed = Random.Integer(2, 10);
    movable.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    movable.onFinish((gameObject) => {
        gameObject.getComponent(Movable).Speed = Random.Integer(2, 10);
        gameObject.getComponent(Movable).moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    });

    world.addObject(cube);
}
screen.sortLayers();
screen.runLoop();