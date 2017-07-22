import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";
import { Component } from "../Component";
export declare class SpecifyLightData {
    static index: number;
    static count: number;
    static buffer: any;
    static colors: Float32Array;
    static gameObjectMap: Array<IUIDEntity>;
    static lightMap: Array<Component>;
    static defaultColorArr: Array<number>;
}
