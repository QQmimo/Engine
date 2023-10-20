import { RecycleBin } from "../../Utilities";

export class BaseObject {
    constructor(name: string) {
        this.Name = name;
        this.Tags = [];
        BaseObject.add(this);
    }

    protected Parent: BaseObject;
    protected get Childs(): BaseObject[] {
        return Array.from(BaseObject.BaseObjects, ([key, value]) => value).filter(obj => obj.Parent === this);
    }
    protected Tags: string[];
    private _Name: string;
    private _onDestroy: () => void;


    protected onDestroy = (action: () => void): void => {
        this._onDestroy = action;
    }
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
        if (this._onDestroy) {
            this._onDestroy();
        }
    }



    protected static BaseObjects: Map<string, BaseObject> = new Map();

    protected static add(gameObject: BaseObject): void {
        if (BaseObject.find(gameObject.Name)) {
            throw new Error(`ОШИБКА: ${this.name} с именем '${gameObject.Name}' уже существует.`);
        }
        this.BaseObjects.set(gameObject.Name, gameObject);
    }

    public static find(name: string): BaseObject | undefined {
        return this.BaseObjects.get(name);
    }

    public static findByTag(tag: string): BaseObject[] {
        return Array.from(this.BaseObjects, ([key, value]) => value).filter(gameObject => this.name === gameObject.constructor.name && gameObject.compareTag(tag));
    }

    public static findAll(): BaseObject[] {
        return Array.from(this.BaseObjects, ([key, value]) => value).filter(gameObject => this.name === gameObject.constructor.name);
    }

    public static destroy(name: string): void {
        this.BaseObjects.delete(name);
    }
}