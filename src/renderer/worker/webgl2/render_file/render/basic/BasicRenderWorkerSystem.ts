import { Map } from "immutable";
import { sendAttributeData } from "../RenderWorkerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { directlySendUniformData } from "../../../../../utils/worker/render_file/render/renderUtils";
import {
    BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../../../type/dataType";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { IRenderConfig } from "../../../../both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { use } from "../../../../render_file/shader/ShaderWorkerSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../render_file/geometry/GeometryWorkerSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../render_file/material/MaterialWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../../render_file/texture/MapManagerWorkerSystem";
import {
    render as renderBasic
} from "../../../../../webgl2/utils/worker/render_file/render/basic/basicRenderUtils";
import { buildDrawFuncDataMap } from "../../../../../webgl2/utils/worker/render_file/draw/basic/basicDrawRenderCommandBufferUtils";
import {
    BasicRenderCommandBufferForDrawData,
    CameraRenderCommandBufferForDrawData
} from "../../../../../utils/worker/render_file/type/dataType";
import {
    IWebGL2BasicSendUniformDataDataMap,
    IWebGL2DrawDataMap
} from "../../../../../webgl2/utils/worker/render_file/interface/IUtils";
import {
    buildBasicMaterialDataForGetUniformData,
    buildMaterialDataForGetUniformData,
    buildSendUniformDataDataMap,
    sendUniformData
} from "../../../../../utils/worker/render_file/render/basic/basicRenderUtils";

export const render = (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: IWebGL2DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, cameraData: CameraRenderCommandBufferForDrawData) => {
    renderBasic(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
}

const _sendUniformData =(gl: WebGLRenderingContext, materialIndex: number, shaderIndex: number, program: WebGLProgram, drawDataMap: IWebGL2DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap: IWebGL2BasicSendUniformDataDataMap, uniformLocationMap: UniformLocationMap, uniformCacheMap: UniformCacheMap) => {
    sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};
