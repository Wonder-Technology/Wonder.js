import curry from "wonder-lodash/curry";
import { use } from "../../../shader/ShaderSystem";
import { getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount, hasIndices } from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../shader/glslSender/GLSLSenderSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../component/material/MaterialSystem";
import { buildDrawFuncDataMap } from "../../utils/worker/render_file/draw/drawRenderCommandBufferUtils";
import { render as renderBasic } from "../../utils/worker/render_file/render/basic/basicRenderUtils";
import { directlySendUniformData } from "../../../utils/worker/render_file/render/renderUtils";
import { sendAttributeData } from "../RenderSystem";
import { bindIndexBuffer } from "../../shader/ShaderSystem";
import { buildBasicMaterialDataForGetUniformData, buildMaterialDataForGetUniformData, buildSendUniformDataDataMap, sendUniformData } from "../../../utils/worker/render_file/render/basic/basicRenderUtils";
export var render = curry(function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, bufferData, cameraData) {
    renderBasic(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3, drawDataMap), initShaderDataMap, bufferData, cameraData);
});
var _sendUniformData = function (gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap) {
    sendUniformData(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};
//# sourceMappingURL=BasicRenderSystem.js.map