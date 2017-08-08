import { directlySendUniformData } from "../../../../utils/shader/program/programUtils";
import { DrawDataMap, SendUniformDataGLSLSenderDataMap } from "../../../../type/utilsType";
import { RenderCommandUniformData, UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { WebGL1SendUniformDataDataMap } from "../../../type/utilsType";

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData, sendDataMap:WebGL1SendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, drawDataMap, uniformLocationMap, uniformCacheMap, renderCommandUniformData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);

    //todo refactor in front render
    //todo move out(and move mapCount out)
    // sendData(gl, mapCount, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, drawDataMap.TextureDataFromSystem, drawDataMap.MapManagerDataFromSystem);
}

var _sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, glslSenderData: SendUniformDataGLSLSenderDataMap, {
                            MaterialDataFromSystem,
    BasicMaterialDataFromSystem,
    LightMaterialDataFromSystem,
                        }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap, renderCommandUniformData: RenderCommandUniformData) => {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformDataArr.length; i < len; i++) {
        let sendData = sendUniformDataArr[i],
            name = sendData.name,
            field = sendData.field,
            type = sendData.type as any,
            from = sendData.from || "cmd",
            data = glslSenderData.getUniformData(field, from, renderCommandUniformData, MaterialDataFromSystem, BasicMaterialDataFromSystem, LightMaterialDataFromSystem);

        directlySendUniformData(gl, name, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
}

// export var directlySendUniformData = (gl: WebGLRenderingContext, name: string, shaderIndex: number, program: WebGLProgram, type: EVariableType, data: any, {
//     // getUniformData,
//     sendMatrix3,
//     sendMatrix4,
//     sendVector3,
//     sendInt,
//     sendFloat1,
//     sendFloat3,
//     // GLSLSenderDataFromSystem,
// }, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
//     switch (type) {
//         case EVariableType.MAT3:
//             sendMatrix3(gl, program, name, data, uniformLocationMap);
//             break;
//         case EVariableType.MAT4:
//             sendMatrix4(gl, program, name, data, uniformLocationMap);
//             break;
//         case EVariableType.VEC3:
//             sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
//             break;
//         case EVariableType.INT:
//         case EVariableType.SAMPLER_2D:
//             sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
//             break;
//         case EVariableType.FLOAT:
//             sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
//             break;
//         case EVariableType.FLOAT3:
//             sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
//             break;
//         default:
//             Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
//             break;
//     }
// }

var _sendUniformFuncData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap: WebGL1SendUniformDataDataMap, drawDataMap: DrawDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        let sendFunc = sendUniformFuncDataArr[i];

        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
}
