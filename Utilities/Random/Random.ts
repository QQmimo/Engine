export class Random {
    public static Integer = (min: number = 0, max: number = 1): number => {
        return Math.floor(Random.Float(min, max));
    }

    public static Float = (min: number = 0, max: number = 1): number => {
        return Math.random() * (max - min + 1) + min;
    }

    public static Color = (): string => {
        return `rgb(${Random.Integer(0, 255)}, ${Random.Integer(0, 255)}, ${Random.Integer(0, 255)})`;
    }

    public static Boolean = (): boolean => {
        return Random.Integer(0, 1) === 1;
    }
}