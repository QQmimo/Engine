import { GameComponent } from "../../Core";
export declare class Dictionary extends GameComponent {
    private Dictionary;
    set(key: string, value: unknown): void;
    get(key: string): unknown;
    delete(key: string): void;
    get allKeys(): string[];
    clear(): void;
}
