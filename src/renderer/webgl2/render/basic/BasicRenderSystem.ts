import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { bindIndexBuffer, use } from "../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../shader/glslSender/GLSLSenderSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../component/material/MaterialSystem";
import {
    BasicRenderCommandBufferForDrawData, BasicRenderUniformData, CameraRenderCommandBufferForDrawData, UniformCacheMap,
    UniformLocationMap
} from "../../../type/dataType";
import { directlySendUniformData } from "../../../utils/worker/render_file/render/renderUtils";
import { WebGL2BasicSendUniformDataDataMap } from "../../type/utilsType";
import { buildDrawFuncDataMap } from "../../utils/worker/render_file/draw/basic/basicDrawRenderCommandBufferUtils";
import {
    buildBasicMaterialDataForGetUniformData,
    buildMaterialDataForGetUniformData, buildSendUniformDataDataMap, render as basicRender,
    sendUniformData
} from "../../utils/worker/render_file/render/basic/basicRenderUtils";
import { sendAttributeData } from "../RenderSystem";

export var render = curry((gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, cameraData:CameraRenderCommandBufferForDrawData) => {
    basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
})

var _sendUniformData = (gl: WebGLRenderingContext, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap:WebGL2BasicSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};
