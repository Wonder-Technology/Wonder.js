import { IUIdEntity } from "../../core/entityObject/gameObject/IUIdEntity";
import { Component } from "../Component";
export declare class SpecifyLightData {
    static index: number;
    static count: number;
    static buffer: any;
    static colors: Float32Array;
    static isColorDirtys: Uint8Array;
    static gameObjectMap: Array<IUIdEntity>;
    static lightMap: Array<Component>;
    static defaultColorArr: Array<number>;
    static defaultDirty: number;
}
