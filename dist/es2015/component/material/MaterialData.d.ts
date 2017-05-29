import { Shader } from "../../renderer/shader/Shader";
import { Color } from "../../structure/Color";
import { ComponentGameObjectMap } from "../ComponentData";
import { ComponentMap } from "../ComponentSystem";
export declare class MaterialData {
    static index: number;
    static count: number;
    static shaderMap: ShaderMap;
    static materialClassNameMap: MaterialClassNameMap;
    static gameObjectMap: ComponentGameObjectMap;
    static colorMap: MaterialColorMap;
    static opacityMap: MaterialOpacityMap;
    static alphaTestMap: MaterialAlphaTestMap;
    static materialMap: ComponentMap;
}
export declare type MaterialClassNameMap = {
    [index: number]: string;
};
export declare type ShaderMap = {
    [index: number]: Shader;
};
export declare type MaterialColorMap = {
    [index: number]: Color;
};
export declare type MaterialOpacityMap = {
    [index: number]: number;
};
export declare type MaterialAlphaTestMap = {
    [index: number]: number;
};
