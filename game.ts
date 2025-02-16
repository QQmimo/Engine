import { Dictionary, Move, Physic, Shape } from "./GameEngine/Components";
import { GameObject, GameLayer, GameScene, GameScreen } from "./GameEngine/Core";
import { Random, Vector2D } from "./GameEngine/Utilities";

const gameScreen: GameScreen = new GameScreen(document.body);
const gameScene: GameScene = gameScreen.addScene('game');
const uix: GameLayer = gameScene.addLayer('uix');
const gameLayer: GameLayer = gameScene.addLayer('world');

const generateShaper = (object: GameObject, size: number = 10): void => {
    object.Transform.Rotation = Random.Angle();
    object.getComponent(Shape).drawByDotsCount(Random.Integer(3, 10), Random.Integer(5, 10) * size);
    object.getComponent(Move).Speed = Random.Integer(5, 50);
    object.getComponent(Move).moveTo(new Vector2D(Random.Integer(innerWidth), Random.Integer(innerHeight)));
}

const drawObjects = (count: number, size: number = 10): void => {

    for (let i: number = 0; i < count; i++) {
        const cube: GameObject = new GameObject('cube', Move, Shape, Physic, Dictionary);
        cube.Transform.Position = new Vector2D(Random.Integer(innerWidth), Random.Integer(innerHeight));
        generateShaper(cube, size);
        cube.getComponent(Move).onStart((object, component) => {
            object.Transform.Rotation = Random.Angle();
            object.getComponent(Shape).drawByDotsCount(Random.Integer(3, 10), Random.Integer(5, 10) * size);
            object.getComponent(Shape).FillStyle = { Color: 'green' };
        });
        cube.getComponent(Physic).onCollision((object1, object2) => {
            object1.getComponent(Move).stop();
            object2.getComponent(Move).stop();
        });
        cube.getComponent(Move).onStop((object, component) => {
            object.getComponent(Shape).FillStyle = { Color: 'red' };
            if (!object.getComponent(Dictionary).get('wait')) {
                object.getComponent(Dictionary).set('wait', true);
                setTimeout(() => {
                    let new_size: number  = object.getComponent(Dictionary).get('size') as number ?? size;
                    object.getComponent(Dictionary).set('size', new_size - 0.5  < 1 ? 1 : new_size - 0.5);
                    generateShaper(object, object.getComponent(Dictionary).get('size') as number);
                    object.getComponent(Dictionary).set('wait', false);
                }, 2000);
            }
        });
        cube.getComponent(Move).onFinish((object, component) => {
            object.getComponent(Shape).FillStyle = { Color: 'gray' };
            setTimeout(() => {
                generateShaper(object, size);
            }, 2000);
        });
        cube.getComponent(Move).onMove((object, component) => {
            (object.getComponent(Dictionary).get('line') as GameObject)?.destroy();
            const line: GameObject = new GameObject('line', Shape);
            line.getComponent(Shape).drawLine(object.Transform.Position, component.Target);
            line.getComponent(Shape).LineStyle = { Width: 2, Color: 'lightgray', Template: [5, 3] };
            uix.addGameObject(line);
            object.getComponent(Dictionary).set('line', line);
        });

        gameLayer.addGameObject(cube);
    }
}

drawObjects(15, 5);

gameScreen.fps(true);
gameScreen.play();