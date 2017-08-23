export declare class LinkList<T> {
    static create(): LinkList<{}>;
    private _first;
    private _last;
    shift(): LinkNode<T>;
    push(node: LinkNode<T>): void;
    hasDuplicateNode(val: any): boolean;
}
export declare class LinkNode<T> {
    static create(val: any): LinkNode<any>;
    constructor(val: T);
    val: T;
    next: LinkNode<T>;
}
