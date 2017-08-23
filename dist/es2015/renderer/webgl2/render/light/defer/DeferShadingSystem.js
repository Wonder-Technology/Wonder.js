import curry from "wonder-lodash/curry";
import { render as renderDefer, init as initUtils, buildSendUniformDataDataMap } from "../../../utils/worker/render_file/render/light/defer/deferShadingUtils";
import { use } from "../../../../shader/ShaderSystem";
import { getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount, hasIndices } from "../../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../../texture/MapManagerSystem";
import { getColorArr3 as getAmbientLightColorArr3, isColorDirty as isAmbientLightColorDirty, cleanColorDirty as cleanAmbientLightColorDirty } from "../../../../../component/light/AmbientLightSystem";
import { getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity, getPosition as getDirectionLightPosition, isPositionDirty as isDirectionLightPositionDirty, isColorDirty as isDirectionLightColorDirty, isIntensityDirty as isDirectionLightIntensityDirty, cleanPositionDirty as cleanDirectionLightPositionDirty, cleanColorDirty as cleanDirectionLightColorDirty, cleanIntensityDirty as cleanDirectionLightIntensityDirty, } from "../../../../../component/light/DirectionLightSystem";
import { getPosition as getPointLightPosition, getColorArr3 as getPointLightColorArr3, getConstant, getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange, isColorDirty, isPositionDirty, isIntensityDirty, isAttenuationDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty, cleanPositionDirty } from "../../../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../shader/glslSender/GLSLSenderSystem";
import { useShader } from "../../../../../component/material/MaterialSystem";
import { bindGBuffer, getNewTextureUnitIndex, unbindGBuffer } from "../../../utils/worker/render_file/render/light/defer/gbuffer/gBufferUtils";
import { computeRadius } from "../../../light/PointLightSystem";
import { sendUniformData } from "../LightRenderSystem";
import { directlySendUniformData } from "../../../../utils/worker/render_file/render/renderUtils";
import { sendAttributeData } from "../../RenderSystem";
import { buildDrawFuncDataMap } from "../../../utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils";
export var init = initUtils;
export var render = curry(function (ThreeDTransformData, GameObjectData, gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, bufferData, cameraData) {
    renderDefer(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, buildSendUniformDataDataMap(sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3, getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty, function (index, DirectionDataFromSystem) {
        return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, DirectionDataFromSystem).values;
    }, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty, function (index, PointLightDataFromSystem) {
        return getPointLightPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
    }, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius, isPositionDirty, isColorDirty, isIntensityDirty, isAttenuationDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty, drawDataMap), initShaderDataMap, bufferData, cameraData);
});
//# sourceMappingURL=DeferShadingSystem.js.map