import { ShaderIndexMap, ShaderLibNameMap } from "../../../../../type/dataType";

export abstract class WebGL1ShaderDataCommon {
    public static index: number = null;
    public static count: number = null;

    public static shaderIndexMap: ShaderIndexMap = null;
    public static shaderLibNameMap: ShaderLibNameMap = null;
}
