import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../data/material_config";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { bindIndexBuffer, sendAttributeData, use } from "../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../shader/glslSender/GLSLSenderSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../component/material/MaterialSystem";
import {
    BasicRenderCommandBufferForDrawData, BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../type/dataType";
import { directlySendUniformData } from "../../../utils/render/renderUtils";
import { WebGL2BasicSendUniformDataDataMap } from "../../type/utilsType";
import { buildDrawFuncDataMap } from "../../utils/draw/basicDrawRenderCommandBufferUtils1";
import { draw as basicDraw, sendUniformData } from "../../utils/render/basic/basicRenderUtils";

export var draw = curry((gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    basicDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        drawDataMap
    ), initShaderDataMap, bufferData);
})

export var buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    drawDataMap: DrawDataMap) => {
    return {
        glslSenderData: {
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,

            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        }
    }
}

var _sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap:WebGL2BasicSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformData(gl, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, _buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), _buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};

//todo refactor repeat code
var _buildMaterialDataForGetUniformData = (getColorArr3:Function, getOpacity:Function, MaterialDataFromSystem:any) => {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    }
}

var _buildBasicMaterialDataForGetUniformData = (BasicMaterialDataFromSystem:any) => {
    return {
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem
    }
}
