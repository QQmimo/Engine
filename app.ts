import { GameScreen, GameLayer, GameObject, Shape, Movable, Dictionary, GameScene } from "./GameEngine";
import { Distance, Random } from "./Utilities";

const screen: GameScreen = new GameScreen(document.body);
const gameScene: GameScene = screen.addScene('game');
gameScene.IsActive = true;
const hud: GameLayer = gameScene.addLayer('hud');
const world: GameLayer = gameScene.addLayer('world');
const gameMenu: GameScene = screen.addScene('menu');
const layerMenu: GameLayer = gameMenu.addLayer('manu-layer');

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

for (let i: number = 0; i < 10; i++) {
    const obj: GameObject = new GameObject(`Qube_${i}`, Shape);
    obj.Transform.Position = { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };

    const shape: Shape = obj.getComponent(Shape);
    shape.drawCircle(Random.Integer(10, 30));
    shape.setBackground(Random.Color());
    layerMenu.addObject(obj);
}

screen.play();

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
        screen.play();
    }
    else {
        pause = true;
        screen.pause();
    }
    e.preventDefault();
});

document.addEventListener('keypress', (e) => {
    if ((e.key === 'Spacebar' || e.key === ' ') && gameScene.IsActive) {
        gameScene.IsActive = false;
        gameMenu.IsActive = true;
    }
    else {
        gameScene.IsActive = true;
        gameMenu.IsActive = false;
    }
})