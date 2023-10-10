export class Random {
    public static Integer = (from: number = 0, to: number = 1): number => {
        return Math.floor(Random.Float(from, to));
    }

    public static Float = (from: number = 0, to: number = 1): number => {
        return Math.random() * (to - from) + from;
    }
}