import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";
import { Component } from "../Component";
import { MaterialWorkerInitDataList } from "../../renderer/type/dataType";
export declare class MaterialData {
    static buffer: SharedArrayBuffer;
    static shaderIndices: Uint32Array;
    static colors: Float32Array;
    static opacities: Float32Array;
    static alphaTests: Float32Array;
    static defaultShaderIndex: number;
    static defaultColorArr: Array<number>;
    static defaultOpacity: number;
    static defaultAlphaTest: number;
    static gameObjectMap: Array<IUIDEntity>;
    static materialMap: Array<Component>;
    static workerInitList: MaterialWorkerInitDataList;
}
