import { GLSLChunk } from "../shader/chunk/ShaderChunk";
export interface IShaderLibGenerator {
    shaderLibs: any;
}
export interface IShaderLibContentGenerator {
    [shaderLibName: string]: any;
}
export interface IGLSLConfig {
    source?: GLSLChunk;
    top?: string;
    varDeclare?: string;
    funcDeclare?: string;
    funcDefine?: string;
    body?: string;
    define?: string;
    defineList?: Array<IGLSLDefineListItem>;
}
export interface IGLSLDefineListItem {
    name: string;
    valueFunc?: Function;
}
export interface IDefineUniformConfig {
    name: string;
    type: string;
}
export interface ISendUniformConfig {
    name: string;
    field: string;
    type: string;
    fieldType?: string;
    from?: string;
}
