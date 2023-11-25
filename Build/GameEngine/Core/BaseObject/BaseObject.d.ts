export declare class BaseObject {
    constructor(name?: string);
    private _Name;
    private _onDestroy;
    protected Parent: BaseObject;
    protected get Childs(): BaseObject[];
    protected Tags: string[];
    readonly Id: string;
    set Name(value: string);
    get Name(): string;
    addTag: (tag: string) => void;
    compareTag: (tag: string) => boolean;
    destroy: () => void;
    onDestroy: (action: () => void) => void;
    protected static Objects: Map<string, BaseObject>;
    protected static add(object: BaseObject): void;
    static findById(id: string): BaseObject | undefined;
    static findByName(name: string): BaseObject;
    static findByTag(tag: string): BaseObject[];
    static findByParent(parent: BaseObject): BaseObject[];
    static delete(id: string): void;
}
