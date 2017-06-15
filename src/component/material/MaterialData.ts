import { MaterialClassNameTable, ShaderIndexTable } from "../../definition/type/materialType";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { Material } from "./Material";

export class MaterialData {
    public static index: number = null;
    public static count: number = null;

    public static buffer: SharedArrayBuffer = null;

    public static shaderIndices: Uint32Array = null;
    public static colors: Float32Array = null;
    public static opacities: Float32Array = null;
    public static alphaTests: Float32Array = null;

    public static defaultColorArr: Array<number> = null;
    public static defaultOpacity: number = null;
    public static defaultAlphaTest: number = null;

    public static workerInitList: Array<number> = null;

    public static materialClassNameTable: MaterialClassNameTable = null;
    public static shaderIndexTable: ShaderIndexTable = null;

    public static gameObjectMap: Array<GameObject> = null;

    public static materialMap: Array<Material> = null;
}
