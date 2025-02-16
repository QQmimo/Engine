import { Dictionary, Move, Physic, Shape } from "./GameEngine/Components";
import { GameObject, GameLayer, GameScene, GameScreen } from "./GameEngine/Core";
import { Angle, Distance, Point, Random } from "./GameEngine/Utilities";

const gameScreen: GameScreen = new GameScreen(document.body);
const gameScene: GameScene = gameScreen.addScene('game');
const gameLayer: GameLayer = gameScene.addLayer('world');
const interfaceLayer: GameLayer = gameScene.addLayer('interface');

const drawArrows = (count: number, point?: Point, size?: number): void => {
    for (let i: number = 0; i < count; i++) {
        const cube: GameObject = new GameObject('cube', Move, Shape, Physic);
        cube.Transform.Position = point ? { ...point } : { X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) };
        cube.getComponent(Move).moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
        cube.getComponent(Move).onStart((object, component) => {
            object.Transform.rotateToPoint(component.Target);
            object.getComponent(Shape).drawByDotsCount(Random.Integer(3, 10), size ?? Random.Integer(5, 10));
            object.getComponent(Shape).FillStyle = { Color: 'green' };
            object.getComponent(Move).Speed = 1;
            object.setLayer(gameLayer);
        });
        cube.getComponent(Physic).onCollision((object1, object2) => {
            object1.getComponent(Move).stop();
            object1.getComponent(Shape).FillStyle = { Color: 'red' };
            object2.getComponent(Move).stop();
            object2.getComponent(Shape).FillStyle = { Color: 'red' };
        });
        cube.getComponent(Move).onFinish((object) => {
            console.log(`${object.Id} is stop!`);
            setTimeout(() => {
                object.getComponent(Shape).drawByDotsCount(Random.Integer(3, 10), size ?? Random.Integer(5, 10));
                object.getComponent(Move).moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
            }, 2000);
        });

        gameLayer.addGameObject(cube);
    }
}

drawArrows(100);


gameScreen.showFps(true);
gameScreen.play();

document.body.addEventListener('keypress', (e) => {
    if (e.key === 'Spacebar' || e.key === ' ') {
        console.log('click');
        const temp: number = gameLayer.Order;
        gameLayer.Order = interfaceLayer.Order;
        interfaceLayer.Order = temp;
    }
});