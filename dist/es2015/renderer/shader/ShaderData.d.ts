import { Shader } from "./Shader";
export declare class ShaderData {
    static index: number;
    static count: number;
    static shaderMap: ShaderShaderMap;
}
export declare type ShaderShaderMap = {
    [materialClassName: string]: Shader;
};
