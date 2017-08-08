import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
// import {
//     bindIndexBuffer, buildSendUniformDataDataMap, sendAttributeData, sendUniformData, use
// } from "../../../shader/ShaderSystem";
// import { getIndexType, getIndicesCount, hasIndices, getIndexTypeSize, getVerticesCount } from "../../../../component/geometry/GeometrySystem";
// import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
// import { EDrawMode } from "../../../enum/EDrawMode";
// import { useShader } from "../../../../component/material/MaterialSystem";
// import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../utils/typeArrayUtils";
// import { BufferUtilsForUnitTest } from "../../../../utils/BufferUtilsForUnitTest";
// import { createTypeArrays } from "../../../utils/draw/renderComandBufferUtils";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../data/material_config";
// import { sendData } from "../../../utils/texture/mapManagerUtils";
// import { directlySendUniformData } from "../../../utils/shader/program/programUtils";
// import { clear as clearGL } from "../../../utils/device/deviceManagerUtils";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { draw as frontDraw } from "../../utils/front/draw/frontRenderDrawRenderCommandBufferUtils";

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, bufferData);
};
