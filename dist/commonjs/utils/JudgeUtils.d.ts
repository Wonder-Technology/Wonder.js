/// <reference types="wonder-commonlib" />
import { JudgeUtils as JudgeUtils$ } from "wonder-commonlib/dist/commonjs/utils/JudgeUtils";
import { Entity } from "../core/Entity";
import { Component } from "../core/Component";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export declare class JudgeUtils extends JudgeUtils$ {
    static isView(obj: any): boolean;
    static isEqual(target1: any, target2: any): boolean;
    static isPowerOfTwo(value: number): boolean;
    static isFloatArray(data: any): boolean;
    static isInterface(target: any, memberOfInterface: string): boolean;
    static isSelf(self: Entity, entityObject: Entity): boolean;
    static isComponenet(component: Component): boolean;
    static isDom(obj: any): boolean;
    static isCollection(list: Collection<any>): boolean;
    static isClass(objInstance: any, className: string): boolean;
}
