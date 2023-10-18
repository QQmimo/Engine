import { GameScreen, GameLayer, GameObject, Shape } from "./GameEngine";

const screen: GameScreen = new GameScreen(document.body, 800, 600);
const world: GameLayer = screen.addLayer('world');


const cubeBlue: GameObject = new GameObject('blue', Shape);
cubeBlue.Transform.Position = { X: 425, Y: 300 };
const cubeBlueRenderer: Shape = cubeBlue.getComponent(Shape);
cubeBlueRenderer?.setBackground('blue');
cubeBlueRenderer?.setStroke(1, 'black');
cubeBlueRenderer?.draw({ X: -25, Y: -25 }, { X: 25, Y: -25 }, { X: 25, Y: 25 }, { X: -25, Y: 25 });
world.addObject(cubeBlue);


const cubeRed: GameObject = new GameObject('red', Shape);
cubeRed.Transform.Position = { X: 400, Y: 300 };
const cubeRedRenderer: Shape = cubeRed.getComponent(Shape);
cubeRedRenderer?.setBackground('red');
cubeRedRenderer?.setStroke(1, 'black');
cubeRedRenderer?.draw({ X: -25, Y: -25 }, { X: 25, Y: -25 }, { X: 25, Y: 25 }, { X: -25, Y: 25 });
world.addObject(cubeRed);

const cubeTest: GameObject = new GameObject('test', Shape);
world.addObject(cubeTest);


setInterval(() => {
    cubeRed.Transform.Rotation.setAsDegree(-1);
    cubeBlue.Transform.Rotation.setAsDegree(1);
}, 100);

setTimeout(() => {
    cubeRedRenderer.setOpacity(0.25);
}, 2000);

let bodyW: number = 0;
let bodyH: number = 0;
function resize() {
    bodyW = screen.Canvas.width = innerWidth;
    bodyH = screen.Canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

screen.runLoop();


console.log(GameObject.findAllWith(Shape));