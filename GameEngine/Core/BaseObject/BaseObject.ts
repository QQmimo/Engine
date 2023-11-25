import { Guid } from "../../Utilities";

export class BaseObject {
    constructor(name?: string) {
        this.Id = Guid.new();
        this.Tags = [];
        this.Name = name;
        BaseObject.add(this);
    }

    private _Name: string;
    private _onDestroy: () => void;

    protected Parent: BaseObject;
    protected get Childs(): BaseObject[] {
        return BaseObject.findByParent(this);
    };
    protected Tags: string[];

    //#region public fields and methods
    public readonly Id: string;
    public set Name(value: string) {
        this._Name = value;
    }
    public get Name(): string {
        return this._Name;
    }
    public addTag = (tag: string): void => {
        this.Tags.push(tag);
    }
    public compareTag = (tag: string): boolean => {
        return this.Tags.some(t => t === tag);
    }
    public destroy = (): void => {
        BaseObject.delete(this.Id);
        if (this._onDestroy) {
            this._onDestroy();
        }
    }
    public onDestroy = (action: () => void): void => {
        this._onDestroy = action;
    }
    //#endregion

    //#region static fields and methods
    protected static Objects: Map<string, BaseObject> = new Map();
    protected static add(object: BaseObject): void {
        if (BaseObject.findById(object.Id)) {
            throw new Error(`ОШИБКА: ${this.name} с идентификатором '${object.Id}' уже существует.`);
        }
        this.Objects.set(object.Id, object);
    }
    public static findById(id: string): BaseObject | undefined {
        return this.Objects.get(id);
    }
    public static findByName(name: string): BaseObject {
        return Array.from(this.Objects, ([key, value]) => value).find(object => this.name === object.constructor.name && object.Name === name);
    }
    public static findByTag(tag: string): BaseObject[] {
        return Array.from(this.Objects, ([key, value]) => value).filter(object => this.name === object.constructor.name && object.compareTag(tag));
    }
    public static findByParent(parent: BaseObject): BaseObject[] {
        return Array.from(this.Objects, ([key, value]) => value).filter(object => object.Parent?.Id === parent.Id);
    }
    public static delete(id: string): void {
        this.Objects.delete(id);
    }
    //#endregion
}