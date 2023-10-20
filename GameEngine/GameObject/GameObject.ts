import { BaseObject } from "../BaseObject";
import { GameLayer } from "../GameLayer";
import { Component, Transform } from "./Properties";

export class GameObject extends BaseObject {
    constructor(name: string, ...components: typeof Component[]) {
        super(name);
        this.Components = new Map();
        this.Tags = [];
        this.IsHidden = false;
        this.Transform = new Transform();
        components.forEach(component => {
            this.addComponent(component);
        });
    }

    protected Components: Map<string, Component>;
    public IsHidden: boolean;
    public Transform: Transform;
    public Layer: GameLayer;

    protected addComponent = <T extends Component>(type: { new(gameObject: GameObject): T }): T => {
        const component: T = new type(this);
        this.Components.set(type.name, component);
        return component;
    }

    public getComponent = <T extends Component>(type: { new(gameObject: GameObject): T }): T => {
        const found: T = this.Components.get(type.name) as T;
        if (found === undefined) {
            throw new Error(`ОШИБКА: Компонент '${type.name}' не найден.`);
        }
        return found;
    }

    public detachComponent = <T extends Component>(type: { new(gameObject: GameObject): T }): void => {
        this.Components.delete(type.name);
    }

    public broadcastRun = (methodName: string, ...args: unknown[]): void => {
        Array.from(this.Components, ([key, value]) => value)
            .filter(component => component[methodName] && typeof component[methodName] === 'function')
            .forEach(component => {
                if (component[methodName].length !== args.length) {
                    throw new Error(`ОШИБКА: Метод '${methodName}' в компоненте '${component.constructor.name}' количество переданных аргументов (${args.length}) не соответствует ожидаемому (${component[methodName].length})`);
                }

                try {
                    component[methodName].apply(this, ...args);
                }
                catch (error) {
                    throw new Error(`ОШИБКА: Компонент '${component.constructor.name}' не смог запустить метод '${methodName}' со следующими аргументами: ${args.map(a => typeof a === 'number' ? a : `'${a}'`).join(', ')}.\n${error.message}`);
                }
            });
    }

    public setLayer = (layer: GameLayer): void => {
        this.Layer = layer;
        this.Parent = layer;
    }
}