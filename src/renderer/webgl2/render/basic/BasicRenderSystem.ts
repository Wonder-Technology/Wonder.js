import { InitShaderDataMap } from "../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { use } from "../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../shader/glslSender/GLSLSenderSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../component/material/MaterialSystem";
import {
    BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../type/dataType";
import { directlySendUniformData } from "../../../utils/worker/render_file/render/renderUtils";
import { WebGL2BasicSendUniformDataDataMap, WebGL2DrawDataMap } from "../../type/utilsType";
import { buildDrawFuncDataMap } from "../../utils/worker/render_file/draw/basic/basicDrawRenderCommandBufferUtils";
import {
    buildBasicMaterialDataForGetUniformData,
    buildMaterialDataForGetUniformData, buildSendUniformDataDataMap, render as basicRender,
    sendUniformData
} from "../../utils/worker/render_file/render/basic/basicRenderUtils";
import { sendAttributeData } from "../RenderSystem";
import {
    BasicRenderCommandBufferForDrawData,
    CameraRenderCommandBufferForDrawData
} from "../../../utils/worker/render_file/type/dataType";

export var render = curry((gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: WebGL2DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData, cameraData:CameraRenderCommandBufferForDrawData) => {
    basicRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
})

var _sendUniformData = (gl: WebGLRenderingContext, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: WebGL2DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap:WebGL2BasicSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};
