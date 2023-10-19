import { Component } from "../GameObject";

export class Dictionary extends Component {
    protected List: Map<string, string | number> = new Map();

    public set = (key: string, value: string | number): void => {
        this.List.set(key, value);
    }

    public get = (key: string): string | number => {
        return this.List.get(key);
    }

    public delete = (key: string): void => {
        this.List.delete(key);
    }
}