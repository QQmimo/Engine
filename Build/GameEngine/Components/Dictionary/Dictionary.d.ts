import { GameComponent } from "../../Core";
export declare class Dictionary extends GameComponent {
    private Dictionary;
    set<T>(key: string, value: T): void;
    get<T>(key: string): T;
    delete(key: string): void;
    get allKeys(): string[];
    clear(): void;
}
