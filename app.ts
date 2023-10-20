import { GameScreen, GameLayer, GameObject, Shape, Movable, Dictionary } from "./GameEngine";
import { Distance, Random } from "./Utilities";

const screen: GameScreen = new GameScreen(document.body);
const hud: GameLayer = screen.addLayer('hud');
const world: GameLayer = screen.addLayer('world');

for (let i: number = 0; i < 500; i++) {
    const obj: GameObject = new GameObject(`cube_${i}`, Shape, Movable, Dictionary);
    obj.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const movable: Movable = obj.getComponent(Movable);
    movable.Speed = Random.Integer(1, 5);

    movable.onStart((component, gameObject, target) => {
        gameObject.Transform.Rotation.rotateByPoint(target);

        const shape: Shape = gameObject.getComponent(Shape);
        shape.drawByDotsCount(Random.Integer(3, 10), Random.Integer(10, 30));
        shape.setBackground(Random.Color());
        shape.setStroke(1);

        const dot: GameObject = new GameObject(`dot_${gameObject.Name}`, Shape);
        dot.Transform.Position = target;

        const shapeDot: Shape = dot.getComponent(Shape);
        shapeDot.drawCircle(2);
        shapeDot.setBackground('red');
        hud.addObject(dot);

        const dictionary: Dictionary = gameObject.getComponent(Dictionary);
        dictionary.set('distance', Distance.solve(gameObject.Transform.Position, target));

        const line: GameObject = new GameObject(`line_${gameObject.Name}`, Shape);
        line.Transform.Position = gameObject.Transform.Position;
        const shapeLine: Shape = line.getComponent(Shape);
        shapeLine.setStrokeDash([5, 3]);
        shapeLine.setOpacity(0.35);
        shapeLine.setStroke(1);
        shapeLine.drawLineTo(target);
        hud.addObject(line);
    });
    movable.onFinish((component, gameObject) => {
        GameObject.find(`dot_${gameObject.Name}`)?.destroy();
        GameObject.find(`line_${gameObject.Name}`)?.destroy();
        component.Speed = Random.Integer(1, 5);
        component.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
    });
    movable.onMove((component, gameObject, target) => {
        const dictionary: Dictionary = gameObject.getComponent(Dictionary);
        const totalDistance: number = dictionary.get('distance') as number;
        const color: number = Math.floor(Distance.solve(gameObject.Transform.Position, target) * 255 / totalDistance);
        const shape: Shape = gameObject.getComponent(Shape);
        shape.setBackground(`rgb(${color}, ${255 - color}, 0)`);
        const line: GameObject = GameObject.find(`line_${gameObject.Name}`);
        line.Transform.Position = gameObject.Transform.Position;
    });
    movable.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });

    world.addObject(obj);
}

screen.runLoop();


screen.Canvas.addEventListener('click', () => {
    if (hud.Order > world.Order) {
        hud.Order = 1;
        world.Order = 2;
    }
    else {
        hud.Order = 2;
        world.Order = 1;
    }
});

let pause: boolean = false;
screen.Canvas.addEventListener('contextmenu', (e) => {
    if (pause) {
        pause = false
        screen.runLoop();
    }
    else {
        pause = true;
        screen.stopLoop();
    }
    e.preventDefault();
});