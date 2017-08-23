import { EVariableType } from "../../../../enum/EVariableType";
import { UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
export declare var directlySendUniformData: (gl: WebGLRenderingContext, name: string, shaderIndex: number, program: WebGLProgram, type: EVariableType, data: any, {sendMatrix3, sendMatrix4, sendVector3, sendInt, sendFloat1, sendFloat3}: {
    sendMatrix3: any;
    sendMatrix4: any;
    sendVector3: any;
    sendInt: any;
    sendFloat1: any;
    sendFloat3: any;
}, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => void;
