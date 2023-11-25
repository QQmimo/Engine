import { GameComponent } from "../../Core";

export class Dictionary extends GameComponent {
    private Dictionary: Map<string, unknown> = new Map();

    public set(key: string, value: unknown): void {
        this.Dictionary.set(key, value);
    }
    public get(key: string): unknown {
        return this.Dictionary.get(key);
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