import { MaterialClassNameTable, ShaderIndexTable } from "../../definition/type/materialType";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Material } from "./Material";
export declare class MaterialData {
    static index: number;
    static count: number;
    static buffer: SharedArrayBuffer;
    static shaderIndices: Uint32Array;
    static colors: Float32Array;
    static opacities: Float32Array;
    static alphaTests: Float32Array;
    static defaultColorArr: Array<number>;
    static defaultOpacity: number;
    static defaultAlphaTest: number;
    static workerInitList: Array<number>;
    static materialClassNameTable: MaterialClassNameTable;
    static shaderIndexTable: ShaderIndexTable;
    static gameObjectMap: Array<GameObject>;
    static materialMap: Array<Material>;
}
