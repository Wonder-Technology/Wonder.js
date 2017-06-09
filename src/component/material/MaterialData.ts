import { Color } from "../../structure/Color";
import { ComponentGameObjectMap } from "../ComponentData";
import { ComponentMap } from "../ComponentSystem";
import { MaterialClassNameTable, ShaderIndexTable } from "../../definition/type/materialType";

export class MaterialData {
    public static index: number = null;
    public static count: number = null;

    public static buffer: SharedArrayBuffer = null;

    public static shaderIndices: Uint32Array = null;

    public static workerInitList:Array<number> = null;

    public static materialClassNameTable: MaterialClassNameTable = null;
    public static shaderIndexTable: ShaderIndexTable = null;

    public static gameObjectMap: ComponentGameObjectMap = null;
    public static colorMap: MaterialColorMap = null;
    public static opacityMap: MaterialOpacityMap = null;
    public static alphaTestMap: MaterialAlphaTestMap = null;

    public static materialMap: ComponentMap = null;
}

export type MaterialColorMap = {
    [index: number]: Color
}

export type MaterialOpacityMap = {
    [index: number]: number
}

export type MaterialAlphaTestMap = {
    [index: number]: number
}

