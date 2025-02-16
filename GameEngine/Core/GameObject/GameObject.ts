import { BaseObject } from "../BaseObject";
import { GameComponent } from "../GameComponent";
import { GameLayer } from "../GameLayer";
import { GameScene } from "../GameScene";
import { GameScreen } from "../GameScreen";
import { Transform } from "./Properties";

export class GameObject extends BaseObject {
    constructor(name: string, ...components: typeof GameComponent[]) {
        super(name);
        this.Components = new Map();
        this.Transform = new Transform(this);
        components.forEach(component => {
            this.addComponent(component);
        });
    }

    protected Components: Map<string, GameComponent>
    protected addComponent = <T extends GameComponent>(componentType: { new(gameObject: GameObject): T }): void => {
        const component: T = new componentType(this);
        this.Components.set(componentType.name, component);
    }
    protected override Parent: GameLayer;

    //#region public fields and methods
    public Transform: Transform;
    public get Layer(): GameLayer | undefined {
        return this.Parent;
    }
    public get Scene(): GameScene | undefined {
        return this.Parent?.Scene;
    }
    public get Screen(): GameScreen | undefined {
        return this.Parent?.Screen;
    }
    public setLayer = (layer: GameLayer): void => {
        this.Parent = layer;
    }
    public broadcast = async (methodName: string, ...args: unknown[]): Promise<void> => {
        try {
            const all: Promise<void>[] = [];
            Array.from(this.Components, ([key, value]) => value)
                .filter(component => component[methodName] && typeof component[methodName] === 'function')
                .forEach(component => {
                    if (component[methodName].length !== args.length) {
                        throw new Error(`ОШИБКА: Метод '${methodName}' в компоненте '${component.constructor.name}' количество переданных аргументов (${args.length}) не соответствует ожидаемому (${component[methodName].length})`);
                    }
                    all.push(component[methodName].apply(this, [...args]));
                });
            await Promise.all(all);
        }
        catch (e) {
            console.error(e);
        }
    }
    public getComponent = <T extends GameComponent>(componentType: { new(gameObject: GameObject): T }): T => {
        const found: T = this.Components.get(componentType.name) as T;
        if (found === undefined) {
            throw new Error(`ОШИБКА: Компонент '${componentType.name}' не найден.`);
        }
        return found;
    }
    public tryGetComponent = <T extends GameComponent>(componentType: { new(gameObject: GameObject): T }): T | undefined => {
        return this.Components.get(componentType.name) as T;
    }
    public detachComponent = <T extends GameComponent>(componentType: { new(gameObject: GameObject): T }): void => {
        this.Components.delete(componentType.name);
    }
    //#endregion

    //#region static fields and methods
    public static findById(id: string): GameObject | undefined {
        return super.findById(id) as GameObject;
    }
    public static findByName(name: string): GameObject {
        return super.findByName(name) as GameObject;
    }
    public static findByTag(tag: string): GameObject[] {
        return super.findByTag(tag) as GameObject[];
    }
    public static findByParent(parent: GameLayer): GameObject[] {
        return super.findByParent(parent) as GameObject[];
    }
    public static findByComponent(component: { new(gameObject: GameObject): GameComponent }): GameObject[] {
        return Array.from(super.Objects, ([key, value]) => value).filter(object => object instanceof GameObject && object.tryGetComponent(component)) as GameObject[];
    }
    //#endregion
}