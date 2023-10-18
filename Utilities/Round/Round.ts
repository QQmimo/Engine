export class Round {
    public static valueTo = (value: number, round: number = 0): number => {
        return Math.round((value + Number.EPSILON) * Math.pow(10, round)) / Math.pow(10, round);
    }
}