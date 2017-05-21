import { Shader } from "../../../renderer/shader/Shader";

export class MaterialData{
    public static index:number = null;
    public static count:number = null;

    public static shaderMap:ShaderMap = null;
    public static materialClassNameMap = null;
}

export type ShaderMap = {
    [materialIndex:number]: Shader;
}
