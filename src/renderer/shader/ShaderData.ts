import {
    ShaderIndexByMaterialIndexAndShaderNameMap,
    ShaderLibWholeNameMap
} from "../type/dataType";

export class ShaderData {
    public static index: number = null;
    public static count: number = null;

    public static shaderLibWholeNameMap: ShaderLibWholeNameMap = null;
    public static shaderIndexByMaterialIndexAndShaderNameMap: ShaderIndexByMaterialIndexAndShaderNameMap  = null;
}
