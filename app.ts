import { EngineElement, EngineScreen, EngineScreenLayer } from "./Components";
import { EnumColor, EnumGeometry } from "./Utilities";

const screen: EngineScreen = new EngineScreen(document.body, 800, 600);
const world: EngineScreenLayer = screen.addLayer('World');
world.Canvas.style.cssText = 'border: 1px solid #000;';

const cube: EngineElement = new EngineElement(EnumGeometry.Square, 25, 0, 50);
cube.setBackground(EnumColor.Green, 0.25);
const circle: EngineElement = new EngineElement(EnumGeometry.Circle, 25, 25, 25);
circle.setBackground(EnumColor.Red, 0.25);
world.addElement(cube);
world.addElement(circle);

let path: { x: number, y: number, dot: EngineElement }[] = [];
let index: number = 0;

let start = (target: { x: number, y: number, dot: EngineElement }, speed: number): void => {
    circle.moveTo(target.x, target.y, speed).then(() => {
        world.removeElement(target.dot);
        index++;

        if (path[index]) {
            start(path[index], speed);
        }
        else {
            path = [];
            index = 0;
        }
        console.log(path);
    });
}

world.Canvas.addEventListener('click', async (e) => {
    const dot: EngineElement = new EngineElement(EnumGeometry.Circle, e.offsetX, e.offsetY, 5);
    dot.setBackground(EnumColor.Red);
    path.push({ x: e.offsetX, y: e.offsetY, dot: dot });
    world.addElement(dot);
    const speed: number = 1;

    if (path.length === 1) {
        start(path[0], speed);
    }
});

screen.run();

console.log(screen);