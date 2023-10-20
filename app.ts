import { GameScreen, GameLayer, GameObject, Shape, Movable, Dictionary } from "./GameEngine";
import { Distance, Random } from "./Utilities";

const screen: GameScreen = new GameScreen(document.body);
const world: GameLayer = screen.addLayer('world');

for (let i: number = 0; i < 5; i++) {
    const obj: GameObject = new GameObject(`cube_${i}`, Shape, Movable, Dictionary);
    obj.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const movable: Movable = obj.getComponent(Movable);
    movable.Speed = Random.Integer(1, 10);

    movable.onStart((component, gameObject, target) => {
        gameObject.Transform.Rotation.rotateByPoint(target);

        const shape: Shape = gameObject.getComponent(Shape);
        shape.drawByDotsCount(Random.Integer(3, 10), Random.Integer(10, 30));
        shape.setBackground(Random.Color());
        shape.setStroke(1);

        const dot: GameObject = new GameObject(`dot_${gameObject.Name}`, Shape);
        dot.addTags('point', gameObject.Name);
        dot.Transform.Position = target;

        const shapeDot: Shape = dot.getComponent(Shape);
        shapeDot.drawCircle(2);
        shapeDot.setBackground('red');
        world.addObject(dot);

        const dictionary: Dictionary = gameObject.getComponent(Dictionary);
        dictionary.set('distance', Distance.solve(gameObject.Transform.Position, target));
    });
    movable.onFinish((component, gameObject) => {
        GameObject.findByTag('point').find(obj => obj.compareTag(gameObject.Name))?.destroy();
        component.Speed = Random.Integer(1, 10);
        component.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    });
    movable.onMove((component, gameObject, target) => {
        const dictionary: Dictionary = gameObject.getComponent(Dictionary);
        const totalDistance: number = dictionary.get('distance') as number;
        const color: number = Math.floor(Distance.solve(gameObject.Transform.Position, target) * 255 / totalDistance);
        const shape: Shape = gameObject.getComponent(Shape);
        shape.setBackground(`rgb(${color}, ${255 - color}, 0)`);

        world.Context.beginPath();
        world.Context.globalAlpha = 0.35;
        world.Context.moveTo(gameObject.Transform.Position.X, gameObject.Transform.Position.Y);
        world.Context.lineTo(target.X, target.Y);
        world.Context.strokeStyle = 'red';
        world.Context.lineWidth = 1;
        world.Context.setLineDash([5, 3]);
        world.Context.stroke();
        world.Context.closePath();
    });
    movable.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });

    world.addObject(obj);
}

screen.runLoop();