import { GameScreen, GameLayer, GameObject, Shape } from "./GameEngine";

const screen: GameScreen = new GameScreen(document.body, 800, 600);
const world: GameLayer = screen.addLayer('world');

const circleRed: GameObject = new GameObject('red', Shape);
circleRed.Transform.Position = { X: 150, Y: 150 };
const circleRedRenderer: Shape = circleRed.getComponent(Shape);
circleRedRenderer?.setBackground('red');
circleRedRenderer?.setStroke(1, 'black');
circleRedRenderer?.draw({ X: -25, Y: -25 }, { X: 25, Y: -25 }, { X: 25, Y: 25 }, { X: -25, Y: 25 });
world.addObject(circleRed);

setInterval(() => {
    let degree: number = circleRed.Transform.Rotation.getAsDegree();
    circleRed.Transform.Rotation.setAsDegree((degree >= 360 ? 0 : degree) + 1);
}, 100);

let bodyW: number = 0;
let bodyH: number = 0;
function resize() {
    bodyW = screen.Canvas.width = innerWidth;
    bodyH = screen.Canvas.height = innerHeight;
}
resize();
window.addEventListener("resize", resize);

screen.runLoop();