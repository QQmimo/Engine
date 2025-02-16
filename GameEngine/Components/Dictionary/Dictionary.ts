import { GameComponent } from "../../Core";

export class Dictionary extends GameComponent {
    private Dictionary: Map<string, unknown> = new Map();

    public set<T>(key: string, value: T): void {
        this.Dictionary.set(key, value);
    }
    public get<T>(key: string): T {
        return this.Dictionary.get(key) as T;
    }
    public delete(key: string): void {
        this.Dictionary.delete(key);
    }
    public get allKeys(): string[] {
        return Array.from(this.Dictionary, ([key, value]) => key);
    }
    public clear(): void {
        this.Dictionary.clear();
    }
}