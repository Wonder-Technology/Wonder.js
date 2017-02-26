/// <reference types="wonder-commonlib" />
import { Collection } from "wonder-commonlib/dist/es2015/Collection";
export declare abstract class Entity {
    private static _count;
    constructor();
    uid: number;
    data: any;
    private _tagList;
    addTag(tag: string): void;
    removeTag(tag: string): void;
    getTagList(): Collection<string>;
    hasTag(tag: string): boolean;
    containTag(tag: string): boolean;
}
