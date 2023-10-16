import { Random } from "../Random/Random";

export class Guid {
    public static New = (): string => {
        const mask: string = 'xxxx-xxxx-xxxx-xxxx';
        const chars: string = '0123456789ABCDEF';

        return mask.replace(/x/g, c => { return chars.charAt(Random.Integer(0, chars.length)) });
    }
}