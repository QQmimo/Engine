import { EngineElement, EngineScreen, EngineScreenLayer } from "./Components";
import { EnumColor, EnumGeometry } from "./Utilities";

const screen: EngineScreen = new EngineScreen(document.body, 800, 600);
const world: EngineScreenLayer = screen.addLayer('World');
world.Canvas.style.cssText = 'border: 1px solid #000;';

const cube: EngineElement = new EngineElement(EnumGeometry.Circle, 50, 25, 25);
cube.setBackground(EnumColor.Green, 0.25);
const circle: EngineElement = new EngineElement(EnumGeometry.Circle, 25, 25, 25);
circle.setBackground(EnumColor.Red, 0.25);
world.addElement(cube);
world.addElement(circle);

let pathCircle: { x: number, y: number, dot: EngineElement }[] = [];
let indexCircle: number = 0;
let pathCube: { x: number, y: number, dot: EngineElement }[] = [];
let indexCube: number = 0;

let startCircle = (target: { x: number, y: number, dot: EngineElement }, speed: number): void => {
    circle.moveTo(target.x, target.y, speed).then(() => {
        world.removeElement(target.dot);
        indexCircle++;

        if (pathCircle[indexCircle]) {
            startCircle(pathCircle[indexCircle], speed);
        }
        else {
            pathCircle = [];
            indexCircle = 0;
        }
    });
}

let startCube = (target: { x: number, y: number, dot: EngineElement }, speed: number): void => {
    cube.moveTo(target.x, target.y, speed).then(() => {
        world.removeElement(target.dot);
        indexCube++;

        if (pathCube[indexCube]) {
            startCube(pathCube[indexCube], speed);
        }
        else {
            pathCube = [];
            indexCube = 0;
        }
    });
}

world.Canvas.addEventListener('click', async (e) => {
    const dot: EngineElement = new EngineElement(EnumGeometry.Circle, e.offsetX, e.offsetY, 5);
    dot.setBackground(EnumColor.Red);
    pathCircle.push({ x: e.offsetX, y: e.offsetY, dot: dot });
    world.addElement(dot);
    const speed: number = 1;

    if (pathCircle.length === 1) {
        startCircle(pathCircle[0], speed);
    }
});

world.Canvas.addEventListener('contextmenu', async (e) => {
    e.preventDefault();
    const dot: EngineElement = new EngineElement(EnumGeometry.Circle, e.offsetX, e.offsetY, 5);
    dot.setBackground(EnumColor.Green);
    pathCube.push({ x: e.offsetX, y: e.offsetY, dot: dot });
    world.addElement(dot);
    const speed: number = 1;

    if (pathCube.length === 1) {
        startCube(pathCube[0], speed);
    }
});

screen.run();

console.log(screen);