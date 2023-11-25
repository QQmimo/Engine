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
            object.getComponent(Shape).drawByDotsCount(5, size ?? Random.Integer(10, 25));
            object.getComponent(Shape).FillStyle = { Color: 'green' };
            object.getComponent(Move).Speed = 1;
            object.setLayer(gameLayer);
        });
        cube.getComponent(Move).onFinish((object, component) => {
            object.getComponent(Shape).FillStyle = { Color: 'red' };
            object.setLayer(interfaceLayer);
            setTimeout(() => {
                component.moveTo({ X: Random.Integer(innerWidth), Y: Random.Integer(innerHeight) });
            }, 2000);
        });
        // cube.getComponent(Physic).onCollision((objectA, objectB) => {
        //     const distance: number = Distance.solve(objectA, objectB);
        //     const angleTargetA: number = Angle.byPoints(objectA, objectB).toRadian();
        //     const angleTargetB: number = Angle.byPoints(objectB, objectA).toRadian();
        //     const pointTargetA: Point = {
        //         X: objectA.Transform.Position.X - Math.cos(angleTargetA) * distance,
        //         Y: objectA.Transform.Position.Y - Math.sin(angleTargetA) * distance
        //     };
        //     const pointTargetB: Point = {
        //         X: objectB.Transform.Position.X - Math.cos(angleTargetB) * distance,
        //         Y: objectB.Transform.Position.Y - Math.sin(angleTargetB) * distance
        //     };

        //     objectA.tryGetComponent(Move)?.moveTo(pointTargetA);
        //     objectB.tryGetComponent(Move)?.moveTo(pointTargetB);
        // });

        gameLayer.addGameObject(cube);
    }
}

drawArrows(1000);


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