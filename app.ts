import { GameScreen, GameLayer, GameObject, Shape, Movable, Dictionary } from "./GameEngine";
import { Distance, Random } from "./Utilities";

const screen: GameScreen = new GameScreen(document.body);
const world: GameLayer = screen.addLayer('world');

for (let i: number = 0; i < 5; i++) {
    const triangle: GameObject = new GameObject(`cube_${i}`, Shape, Movable, Dictionary);
    triangle.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const size: number = Random.Integer(10, 25);

    const shape: Shape = triangle.getComponent(Shape);
    shape.setBackground(Random.Color());
    shape.drawByDotsCount(5, 25);

    const movable: Movable = triangle.getComponent(Movable);
    movable.Speed = Random.Integer(2, 10);
    movable.onStart((component, gameObject, target) => {
        gameObject.Transform.Rotation.rotateByPoint(target);
        const dot: GameObject = new GameObject(`dot_${gameObject.Name}`, Shape);
        dot.addTags('point', gameObject.Name);
        dot.Transform.Position = target;

        const shapeDot: Shape = dot.getComponent(Shape);
        shapeDot.drawCircle(2);
        shapeDot.setBackground(gameObject.getComponent(Shape).getBackground());
        shapeDot.setStroke(1);
        world.addObject(dot);

        const dictionary: Dictionary = gameObject.getComponent(Dictionary);
        dictionary.set('distance', Distance.solve(gameObject.Transform.Position, target));
    });
    movable.onFinish((component, gameObject) => {
        GameObject.findByTag('point').find(obj => obj.compareTag(gameObject.Name))?.destroy();
        component.Speed = Random.Integer(2, 10);
        component.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    });
    movable.onMove((component, gameObject, target) => {
        console.log(gameObject);
        const dictionary: Dictionary = gameObject.getComponent(Dictionary);
        const totalDistance: number = dictionary.get('distance') as number;
        const edgeCount: number = 10 - Math.floor(Distance.solve(gameObject.Transform.Position, target) * 10 / totalDistance) + 2;
        gameObject.getComponent(Shape).drawByDotsCount(edgeCount, 25);
        world.Context.beginPath();
        world.Context.globalAlpha = 0.35;
        world.Context.moveTo(gameObject.Transform.Position.X, gameObject.Transform.Position.Y);
        world.Context.lineTo(target.X, target.Y);
        world.Context.strokeStyle = gameObject.getComponent(Shape).getBackground();
        world.Context.lineWidth = 1;
        world.Context.setLineDash([5, 3]);
        world.Context.stroke();
        world.Context.closePath();
    });
    movable.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    world.addObject(triangle);
}

screen.runLoop();