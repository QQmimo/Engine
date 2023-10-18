import { RecycleBin } from "../../Utilities";

export class BaseObject {
    constructor(name: string) {
        this.Name = name;
        this.Tags = [];
        BaseObject.add(this);
    }

    protected Tags: string[];
    private _Name: string;

    public set Name(value: string) {
        if (BaseObject.find(value)) {
            throw new Error(`ОШИБКА: ${this.constructor.name} с именем '${value}' уже существует.`);
        }
        this._Name = value;
    };
    public get Name(): string {
        return this._Name;
    }

    public addTags = (...tags: string[]): void => {
        tags.forEach(tag => {
            if (!this.compareTag(tag)) {
                this.Tags.push(tag);
            }
        });
    }

    public compareTag = (tag: string): boolean => {
        return this.Tags.find(t => t === tag) !== undefined;
    }

    public destroy = (): void => {
        BaseObject.destroy(this.Name);
        RecycleBin.destroy(this);
    }


    protected static BaseObjects: BaseObject[] = [];

    protected static add(gameObject: BaseObject): void {
        if (BaseObject.find(gameObject.Name)) {
            throw new Error(`ОШИБКА: ${this.name} с именем '${gameObject.Name}' уже существует.`);
        }
        this.BaseObjects.push(gameObject);
    }

    public static find(name: string): BaseObject | undefined {
        return this.BaseObjects.find(gameObject => gameObject.Name === name);
    }

    public static findByTag(tag: string): BaseObject[] {
        return this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name && gameObject.compareTag(tag));
    }

    public static destroy(name: string): void {
        const index: number = this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name).map(gameObject => gameObject.Name).indexOf(name);
        if (index !== -1) {
            RecycleBin.destroy(this.BaseObjects[index]);
            delete this.BaseObjects[index];
            this.BaseObjects = this.BaseObjects.filter(gameObject => gameObject !== undefined);
        }
    }
}