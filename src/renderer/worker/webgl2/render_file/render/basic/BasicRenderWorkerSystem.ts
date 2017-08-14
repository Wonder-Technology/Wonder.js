import { Map } from "immutable";
import { sendAttributeData } from "../RenderWorkerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { directlySendUniformData } from "../../../../../utils/render/renderUtils";
import {
    BasicRenderCommandBufferForDrawData, BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../../../type/dataType";
import { DrawDataMap, InitShaderDataMap } from "../../../../../type/utilsType";
import { IRenderConfig } from "../../../../both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../../data/material_config";
import { bindIndexBuffer, use } from "../../../../render_file/shader/ShaderWorkerSystem";
import {    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices} from "../../../../render_file/geometry/GeometryWorkerSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../render_file/material/MaterialWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../../render_file/texture/MapManagerWorkerSystem";
import { WebGL2BasicSendUniformDataDataMap } from "../../../../../webgl2/type/utilsType";
import { render as basicRender, sendUniformData } from "../../../../../webgl2/utils/render/basic/basicRenderUtils";
import { buildDrawFuncDataMap } from "../../../../../webgl2/utils/draw/basic/basicDrawRenderCommandBufferUtils";

export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        drawDataMap
    ), initShaderDataMap, bufferData);
}

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

var _sendUniformData = (gl: WebGLRenderingContext, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap:WebGL2BasicSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, _buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), _buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};

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
