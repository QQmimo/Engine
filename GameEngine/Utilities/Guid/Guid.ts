import { Random } from "../Random";

export class Guid {
    public static new = (): string => {
        const mask: string = 'xxxx-xxxx-xxxx-xxxx';
        const chars: string = '0123456789ABCDEF';

        return mask.replace(/x/g, c => { return chars.charAt(Random.Integer(chars.length)) });
    }
}