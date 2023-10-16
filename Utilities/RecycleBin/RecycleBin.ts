export class RecycleBin {
    public static destroy = (obj: Object): void => {
        Object.keys(obj).forEach(key => {
            delete obj[key];
        });
    }
}