import curry from "wonder-lodash/curry";
import { buildSendUniformDataDataMap, render as renderFront } from "../../../utils/worker/render_file/render/light/front/frontRenderUtils";
import { use } from "../../../../shader/ShaderSystem";
import { getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount, hasIndices } from "../../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../../texture/MapManagerSystem";
import { cleanColorDirty as cleanAmbientLightColorDirty, getColorArr3 as getAmbientLightColorArr3, isColorDirty as isAmbientLightColorDirty } from "../../../../../component/light/AmbientLightSystem";
import { cleanColorDirty as cleanDirectionLightColorDirty, cleanIntensityDirty as cleanDirectionLightIntensityDirty, cleanPositionDirty as cleanDirectionLightPositionDirty, getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity, getPosition as getDirectionLightPosition, isColorDirty as isDirectionLightColorDirty, isIntensityDirty as isDirectionLightIntensityDirty, isPositionDirty as isDirectionLightPositionDirty } from "../../../../../component/light/DirectionLightSystem";
import { getPosition as getPointLightPosition, getColorArr3 as getPointLightColorArr3, getConstant, getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange, isPositionDirty as isPointLightPositionDirty, isColorDirty as isPointLightColorDirty, isIntensityDirty as isPointLightIntensityDirty, isAttenuationDirty as isPointLightAttenuationDirty, cleanPositionDirty as cleanPointLightPositionDirty, cleanColorDirty as cleanPointLightColorDirty, cleanIntensityDirty as cleanPointLightIntensityDirty, cleanAttenuationDirty as cleanPointLightAttenuationDirty } from "../../../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../shader/glslSender/GLSLSenderSystem";
import { useShader } from "../../../../../component/material/MaterialSystem";
import { buildDrawFuncDataMap } from "../../../utils/worker/render_file/draw/drawRenderCommandBufferUtils";
import { directlySendUniformData } from "../../../../utils/worker/render_file/render/renderUtils";
import { sendUniformData } from "../LightRenderSystem";
import { sendAttributeData } from "../../RenderSystem";
import { bindIndexBuffer } from "../../../shader/ShaderSystem";
export var render = curry(function (gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, initShaderDataMap, ThreeDTransformData, GameObjectData, bufferData, cameraData) {
    renderFront(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3, getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty, function (index, DirectionLightDataFromSystem) {
        return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, DirectionLightDataFromSystem).values;
    }, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty, function (index, PointLightDataFromSystem) {
        return getPointLightPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
    }, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, isPointLightPositionDirty, isPointLightColorDirty, isPointLightIntensityDirty, isPointLightAttenuationDirty, cleanPointLightPositionDirty, cleanPointLightColorDirty, cleanPointLightIntensityDirty, cleanPointLightAttenuationDirty, drawDataMap), initShaderDataMap, bufferData, cameraData);
});
//# sourceMappingURL=FrontRenderSystem.js.map