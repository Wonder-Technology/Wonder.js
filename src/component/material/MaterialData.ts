import { Shader } from "../../renderer/shader/Shader";
import { Color } from "../../structure/Color";
import { ComponentGameObjectMap } from "../ComponentData";

export class MaterialData{
    public static index:number = null;
    public static count:number = null;

    public static shaderMap:ShaderMap = null;
    public static materialClassNameMap:MaterialClassNameMap = null;
    public static gameObjectMap:ComponentGameObjectMap = null;
    public static colorMap:MaterialColorMap = null;
    public static opacityMap:MaterialOpacityMap = null;
    public static alphaTestMap:MaterialAlphaTestMap = null;
}

export type MaterialClassNameMap = {
    [materialIndex:number]: string;
}

export type ShaderMap = {
    [materialIndex:number]: Shader;
}

export type MaterialColorMap = {
    [materialIndex:number]: Color;
}

export type MaterialOpacityMap = {
    [materialIndex:number]: number;
}

export type MaterialAlphaTestMap = {
    [materialIndex:number]: number;
}
