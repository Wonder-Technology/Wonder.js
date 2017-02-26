/// <reference types="wonder-commonlib" />
import { EntityObject } from "../EntityObject";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export declare class EntityObjectManager {
    static create(entityObject: EntityObject): EntityObjectManager;
    constructor(entityObject: EntityObject);
    private _entityObject;
    private _children;
    init(): void;
    dispose(): void;
    hasChild(child: EntityObject): boolean;
    addChild(child: EntityObject): this;
    addChildren(children: EntityObject): any;
    addChildren(children: Array<EntityObject>): any;
    addChildren(children: Collection<EntityObject>): any;
    forEach(func: (entityObject: EntityObject, index: number) => void): this;
    filter(func: (entityObject: EntityObject) => boolean): Collection<any>;
    sort(func: (a: EntityObject, b: EntityObject) => any, isSortSelf?: boolean): Collection<any>;
    getChildren(): Collection<any>;
    getAllChildren(): Collection<EntityObject>;
    getChild(index: number): any;
    findChildByUid(uid: number): any;
    findChildByTag(tag: string): any;
    findChildByName(name: string): any;
    findChildrenByName(name: string): Collection<EntityObject>;
    removeChild(child: EntityObject): this;
    removeAllChildren(): void;
}
