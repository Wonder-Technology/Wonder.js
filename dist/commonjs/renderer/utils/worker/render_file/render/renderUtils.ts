import { EVariableType } from "../../../../enum/EVariableType";
import { UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { Log } from "../../../../../utils/Log";
import { getVao, isVaoExist } from "../shader/shaderUtils";

export const directlySendUniformData = (gl: WebGLRenderingContext, name: string, shaderIndex: number, program: WebGLProgram, type: EVariableType, data: any, {
    sendMatrix3,
    sendMatrix4,
    sendVector3,
    sendInt,
    sendFloat1,
    sendFloat3,
}, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    switch (type) {
        case EVariableType.MAT3:
            sendMatrix3(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.MAT4:
            sendMatrix4(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.VEC3:
            sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.INT:
        case EVariableType.SAMPLER_2D:
            sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT:
            sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT3:
            sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
            break;
    }
}
