import { GameScreen, GameLayer, GameObject, Shape, GameScene } from "./GameEngine";
import { Random } from "./Utilities";

const SCREEN: GameScreen = new GameScreen(document.body, 800, 800);
SCREEN.Canvas.style.border = '1px solid #000';
const SCENE: GameScene = SCREEN.addScene('game');
const WORLD: GameLayer = SCENE.addLayer('world');

const count: number = 40;
const size: number = SCREEN.Canvas.width / count;

const generateMaze = (count: number): boolean[][] => {
    //Sidewinder
    const maze: boolean[][] = [];
    for (let row: number = 0; row < count; row++) {
        maze[row] = [];
        for (let col: number = 0; col < count; col++) {
            maze[row].push(true);
        }
    }

    maze.forEach((row, rowIndex, maze) => {
        if (rowIndex === 0) {
            row.forEach((col, colIndex) => {
                maze[rowIndex][colIndex] = false;
            });
        }
        else {
            let step: number = 0;
            do {
                maze[rowIndex][step] = Random.Boolean();
                if (maze[rowIndex][step]) {
                    maze[rowIndex][Random.Integer(0, step)] = false;
                    step = maze.length;
                }
                step++;
            } while (step < maze.length);
        }
    });

    return maze;
}

generateMaze(count).forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
        if (col) {
            const cube: GameObject = new GameObject(`cube_${rowIndex}_${colIndex}`, Shape);
            cube.Transform.Rotation.rotateByDegree(45);
            cube.Transform.Position = { X: colIndex * size + size / 2, Y: rowIndex * size + size / 2 };

            const shape: Shape = cube.getComponent(Shape);
            shape.drawByDotsCount(4, Math.sqrt(Math.pow(size / 2, 2) + Math.pow(size / 2, 2)));
            shape.setBackground('red');

            WORLD.addObject(cube);
        }
    });
});


SCREEN.play();