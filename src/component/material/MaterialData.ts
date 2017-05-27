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

export type MaterialClassNameMap = Map<number, string>;

export type ShaderMap = Map<number, Shader>;

export type MaterialColorMap = Map<number, Color>;

export type MaterialOpacityMap = Map<number, number>;

export type MaterialAlphaTestMap = Map<number, number>;

