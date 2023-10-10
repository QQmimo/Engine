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

let moving: boolean = false;

world.Canvas.addEventListener('click', (e) => {
    if (moving === false) {
        moving = true;
        const dot: EngineElement = new EngineElement(EnumGeometry.Circle, e.offsetX, e.offsetY, 5);
        dot.setBackground(EnumColor.Red);
        world.addElement(dot);
        const startX: number = circle.X;
        const startY: number = circle.Y;
        circle.moveTo(dot.X, dot.Y).then(() => {
            world.removeElement(dot);
        }).then(() => {
            circle.moveTo(startX, startY).then(() => {
                moving = false;
            });
        });
    }
});

screen.run();

console.log(screen);