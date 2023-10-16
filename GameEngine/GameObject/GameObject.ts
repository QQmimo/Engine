import { Component, Transform } from "./Components";

export class GameObject {
    constructor(name: string, ...components: typeof Component[]) {
        this.Name = name;
        GameObject.add(this);
        this.Components = [];
        this.Tags = [];
        this.IsHidden = false;
        this.Transform = new Transform(this);
        components.forEach(component => {
            this.addComponent(component);
        });
    }

    public Name: string;
    public IsHidden: boolean;
    public Transform: Transform;
    protected Components: Component[];
    protected Tags: string[];

    public addComponent = <T extends Component>(type: { new(): T }): T => {
        const component: T = new type();
        this.Components.push(component);
        return component;
    }

    public getComponent = <T extends Component>(type: { new(): T }): T => {
        const target: T = new type();
        return this.Components.find(component => component.constructor.name === target.constructor.name) as T;
    }

    public detachComponent = <T extends Component>(type: { new(): T }): void => {
        const target: T = new type();
        this.Components = this.Components.filter(component => component.constructor.name !== target.constructor.name);
    }

    public broadcastMessage = (methodName: string, ...args: unknown[]): void => {
        this.Components
            .filter(component => component[methodName] && typeof component[methodName] === 'function')
            .forEach(component => {
                if (component[methodName].length !== args.length) {
                    throw new Error(`ОШИБКА: Метод '${methodName}' в компоненте '${component.constructor.name}' количество переданных аргументов (${args.length}) не соответствует ожидаемому (${component[methodName].length})`);
                }

                try {
                    component[methodName](...args);
                }
                catch (error) {
                    throw new Error(`ОШИБКА: Компонент '${component.constructor.name}' не смог запустить метод '${methodName}' со следующими аргументами: ${args.map(a => typeof a === 'number' ? a : `'${a}'`).join(', ')}.`);
                }
            });
    }

    public addTag = (tag: string): void => {
        if (!this.compareTag(tag)) {
            this.Tags.push(tag);
        }
    }

    public compareTag = (tag: string): boolean => {
        return this.Tags.find(t => t === tag) !== undefined;
    }

    public destroy = (): void => {
        Object.keys(this).forEach(key => {
            delete this[key];
        })
    }


    protected static GameObjects: GameObject[] = [];
    public static add = (gameObject: GameObject): void => {
        if (GameObject.find(gameObject.Name)) {
            throw new Error(`ОШИБКА: GameObject с именем '${gameObject.Name}' уже существует.`);
        }
        this.GameObjects.push(gameObject);
    }
    public static find = (name: string): GameObject => {
        return this.GameObjects.find(gameObject => gameObject.Name === name);
    }
    public static destroy = (name: string): void => {
        const index: number = this.GameObjects.map(gameObject => gameObject.Name).indexOf(name);
        this.GameObjects[index].destroy();
        delete this.GameObjects[index];
        this.GameObjects = this.GameObjects.filter(gameObject => gameObject !== undefined);
    }
}