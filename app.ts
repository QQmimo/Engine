import { GameScreen, GameLayer, GameObject, Shape } from "./GameEngine";

const screen: GameScreen = new GameScreen(document.body);
const world: GameLayer = screen.addLayer('world');


const cubeBlue: GameObject = new GameObject('blue', Shape);
cubeBlue.Transform.Position = { X: 50, Y: 50 };
const cubeBlueShape: Shape = cubeBlue.getComponent(Shape);
cubeBlueShape?.setBackground('blue');
cubeBlueShape?.setStroke(1);
cubeBlueShape?.drawByDots({ X: -25, Y: -25 }, { X: 25, Y: -25 }, { X: 25, Y: 25 }, { X: -25, Y: 25 });
world.addObject(cubeBlue);

const cubeRed: GameObject = new GameObject('red', Shape);
cubeRed.Transform.Position = { X: 75, Y: 50 };
const cubeRedShape: Shape = cubeRed.getComponent(Shape);
cubeRedShape?.setBackground('red');
cubeRedShape?.setStroke(1);
cubeRedShape?.drawByDots({ X: -25, Y: -25 }, { X: 25, Y: -25 }, { X: 25, Y: 25 }, { X: -25, Y: 25 });
world.addObject(cubeRed);

const cubeGreen: GameObject = new GameObject('green', Shape);
cubeGreen.Transform.Position = { X: 75, Y: 100 };
const cubeGreenShape: Shape = cubeGreen.getComponent(Shape);
cubeGreenShape?.setBackground('green');
cubeGreenShape?.setStroke(1);
cubeGreenShape?.drawByDotsCount(8, 30);
world.addObject(cubeGreen);


setInterval(() => {
    cubeRed.Transform.Rotation.setAsDegree(-1);
    cubeBlue.Transform.Rotation.setAsDegree(20);
}, 100);

setTimeout(() => {
    cubeRedShape.setOpacity(0.25);
    cubeGreenShape.setOpacity(0.15);
}, 2000);

screen.runLoop();