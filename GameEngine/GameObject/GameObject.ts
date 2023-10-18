import { BaseObject } from "../BaseObject";
import { GameLayer } from "../GameLayer";
import { Component, Transform } from "./Properties";

export class GameObject extends BaseObject {
    constructor(name: string, ...components: typeof Component[]) {
        super(name);
        this.Components = [];
        this.Tags = [];
        this.IsHidden = false;
        this.Transform = new Transform(this);
        components.forEach(component => {
            this.addComponent(component);
        });
    }

    public IsHidden: boolean;
    public Transform: Transform;
    public Layer: GameLayer;
    protected Components: Component[];

    public addComponent = <T extends Component>(type: { new(gameObject: GameObject): T }): T => {
        const component: T = new type(this);
        this.Components.push(component);
        return component;
    }

    public getComponent = <T extends Component>(type: { new(gameObject: GameObject): T }): T => {
        const target: T = new type(undefined);
        return this.Components.find(component => component.constructor.name === target.constructor.name) as T;
    }

    public detachComponent = <T extends Component>(type: { new(gameObject: GameObject): T }): void => {
        const target: T = new type(undefined);
        this.Components = this.Components.filter(component => component.constructor.name !== target.constructor.name);
    }

    public broadcastRun = (methodName: string, ...args: unknown[]): void => {
        this.Components
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
    }
}