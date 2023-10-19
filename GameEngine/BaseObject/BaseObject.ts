import { RecycleBin } from "../../Utilities";
import { Component, GameObject } from "../GameObject";

export class BaseObject {
    constructor(name: string) {
        this.Name = name;
        this.Tags = [];
        BaseObject.add(this);
    }

    protected Tags: string[];
    private _Name: string;
    private _onDestroy: () => void;

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

    protected onDestroy = (action: () => void): void => {
        this._onDestroy = action;
    }


    protected static BaseObjects: BaseObject[] = [];

    protected static add(gameObject: BaseObject): void {
        if (BaseObject.find(gameObject.Name)) {
            throw new Error(`ОШИБКА: ${this.name} с именем '${gameObject.Name}' уже существует.`);
        }
        gameObject.onDestroy(() => {
            this.BaseObjects = this.BaseObjects.filter(obj => obj.Name !== undefined);
            console.log(this.BaseObjects);
        });
        this.BaseObjects.push(gameObject);
    }

    public static find(name: string): BaseObject | undefined {
        return this.BaseObjects.find(obj => obj.Name === name);
    }

    public static findByTag(tag: string): BaseObject[] {
        return this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name && gameObject.compareTag(tag));
    }

    public static findAll(): BaseObject[] {
        return this.BaseObjects.filter(gameObject => this.name === gameObject.constructor.name);
    }

    public static destroy(name: string): void {
        RecycleBin.destroy(this.BaseObjects.find(obj => obj.Name === name));
        this.clearGarbage();
    }

    public static clearGarbage = (): void => {
        this.BaseObjects = this.BaseObjects.filter(obj => obj.Name !== undefined);
    }
}