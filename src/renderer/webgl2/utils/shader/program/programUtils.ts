import { directlySendUniformData } from "../../../../utils/shader/program/programUtils";
import { DrawDataMap, SendUniformDataGLSLSenderDataMap } from "../../../../type/utilsType";
import { RenderCommandUniformData, UniformCacheMap, UniformLocationMap } from "../../../../type/dataType";
import { WebGL2SendUniformDataDataMap } from "../../../../webgl2/type/utilsType";

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: RenderCommandUniformData, sendDataMap:WebGL2SendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    _sendUniformData(gl, shaderIndex, program, sendDataMap.glslSenderData, drawDataMap, uniformLocationMap, uniformCacheMap, renderCommandUniformData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
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

var _sendUniformFuncData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap: WebGL2SendUniformDataDataMap, drawDataMap: DrawDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];

    for (let i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        let sendFunc = sendUniformFuncDataArr[i];

        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
}
