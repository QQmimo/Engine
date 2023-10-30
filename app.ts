import { GameScreen, GameLayer, GameObject, Shape, GameScene, Movable, Collision, Position, Dictionary } from "./GameEngine";
import { Distance, Random } from "./Utilities";

const SCREEN: GameScreen = new GameScreen(document.body);
const SCENE: GameScene = SCREEN.addScene('game');
const INTERFACE: GameLayer = SCENE.addLayer('interface');
const WORLD: GameLayer = SCENE.addLayer('world');

for (let i: number = 0; i < 50; i++) {
    const target: Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const obj: GameObject = new GameObject(`obj_${i}`, Shape, Movable, Collision, Dictionary);
    obj.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const dot: GameObject = new GameObject(`dot_${obj.Name}`, Shape);
    const line: GameObject = new GameObject(`line_${obj.Name}`, Shape);
    line.getComponent(Shape).drawLineTo(target);
    line.getComponent(Shape).setStroke(1);
    line.getComponent(Shape).setStrokeDash([5, 3]);
    line.getComponent(Shape).setOpacity(0.35);
    INTERFACE.addObject(dot);
    INTERFACE.addObject(line);

    const shape: Shape = obj.getComponent(Shape);
    shape.drawByDotsCount(Random.Integer(3, 10), Random.Integer(10, 25));
    shape.setBackground('green');
    shape.setStroke(1);

    const movable: Movable = obj.getComponent(Movable);
    movable.Speed = 1;
    movable.moveTo(target);
    movable.onStart((component, object, target) => {
        object.Transform.Rotation.rotateByPoint(target);
        setTimeout(() => {
            object.getComponent(Shape).setStroke(1);
            object.getComponent(Shape).setBackground('green');
        }, 100);

        const dot: GameObject = GameObject.find(`dot_${object.Name}`);
        if (dot) {
            dot.getComponent(Shape).drawCircle(5);
            dot.getComponent(Shape).setBackground('black');
            dot.Transform.Position = target;
        }

        const line: GameObject = GameObject.find(`line_${object.Name}`);
        if (line) {
            line.getComponent(Shape).drawLineTo(target);
        }
    });
    movable.onMove((component, object, target) => {
        const line: GameObject = GameObject.find(`line_${object.Name}`);
        if (line) {
            line.Transform.Position = object.Transform.Position;
        }
    });
    movable.onFinish((component, object) => {
        // const dict = object.getComponent(Dictionary);
        // if (dict.get('touched')) {
        //     object.getComponent(Shape).setStroke(1);
        //     object.getComponent(Shape).setBackground('green');
        //     dict.delete('touched');
        // }
        const target: Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };
        component.moveTo(target);
        GameObject.find(`dot_${object.Name}`).Transform.Position = target;
    });

    const collision: Collision = obj.getComponent(Collision);
    collision.onCollision((target, object) => {
        target.getComponent(Movable).stop(false);
        // target.getComponent(Dictionary).set('touched', 1);
        target.getComponent(Shape).setBackground('red');

        const angle: number = Math.atan2(object.Transform.Position.Y - target.Transform.Position.Y, object.Transform.Position.X - target.Transform.Position.X);
        const distance: number = Distance.solve(target.Transform.Position, object.Transform.Position);
        const point: Position = {
            X: target.Transform.Position.X - Math.cos(angle) * distance,
            Y: target.Transform.Position.Y - Math.sin(angle) * distance
        };

        target.getComponent(Movable).moveTo(point);
    });

    WORLD.addObject(obj);
}

SCREEN.play();

document.body.addEventListener('keypress', (e) => {
    if ((e.key === 'Spacebar' || e.key === ' ') && INTERFACE.IsHidden) {
        INTERFACE.IsHidden = false;
    }
    else if ((e.key === 'Spacebar' || e.key === ' ') && !INTERFACE.IsHidden) {
        INTERFACE.IsHidden = true;
    }
})