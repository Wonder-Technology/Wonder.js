import { InitShaderDataMap } from "../../../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../both_file/data/render_config";
import {
    buildSendUniformDataDataMap,
    render as frontRender
} from "../../../../../../webgl1/utils/worker/render_file/render/light/front/frontRenderUtils";
import { useShader } from "../../../../../render_file/material/MaterialWorkerSystem";
import { hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount } from "../../../../../render_file/geometry/GeometryWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../../../render_file/texture/MapManagerWorkerSystem";
import {
    cleanColorDirty as cleanAmbientLightColorDirty,
    getColorArr3 as getAmbientLightColorArr3,
    isColorDirty as isAmbientLightColorDirty
} from "../../../../../render_file/light/AmbientLightWorkerSystem";
import {
    cleanColorDirty as cleanDirectionLightColorDirty, cleanIntensityDirty as cleanDirectionLightIntensityDirty,
    cleanPositionDirty as cleanDirectionLightPositionDirty,
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
    isColorDirty as isDirectionLightColorDirty, isIntensityDirty as isDirectionLightIntensityDirty, isPositionDirty as isDirectionLightPositionDirty
} from "../../../../../render_file/light/DirectionLightWorkerSystem";
import {
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange, isPositionDirty as isPointLightPositionDirty, isColorDirty as isPointLightColorDirty,
    isIntensityDirty as isPointLightIntensityDirty, isAttenuationDirty as isPointLightAttenuationDirty, cleanPositionDirty as cleanPointLightPositionDirty, cleanColorDirty as cleanPointLightColorDirty, cleanIntensityDirty as cleanPointLightIntensityDirty,
    cleanAttenuationDirty as cleanPointLightAttenuationDirty
} from "../../../../../render_file/light/PointLightWorkerSystem";
import { buildDrawFuncDataMap } from "../../../../../../webgl1/utils/worker/render_file/draw/drawRenderCommandBufferUtils";
import { sendUniformData } from "../LightRenderWorkerSystem";
import { use } from "../../../../../render_file/shader/ShaderWorkerSystem";
import { getDirectionLightPosition, getPointLightPosition } from "../../../../../render_file/render/RenderWorkerSystem";
import { sendAttributeData } from "../../RenderWorkerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { directlySendUniformData } from "../../../../../../utils/worker/render_file/render/renderUtils";
import { LightRenderCommandBufferForDrawData } from "../../../../../../utils/worker/render_file/type/dataType";
import { CameraRenderCommandBufferForDrawData } from "../../../../../../utils/worker/render_file/type/dataType";
import { bindIndexBuffer } from "../../../shader/ShaderWorkerSystem";
import { IWebGL1DrawDataMap } from "../../../../../../webgl1/utils/worker/render_file/interface/IUtils";

export const render = (gl: any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: IWebGL1DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, cameraData: CameraRenderCommandBufferForDrawData) => {
    frontRender(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        getAmbientLightColorArr3, isAmbientLightColorDirty, cleanAmbientLightColorDirty,

        getDirectionLightPosition, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty,

        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, isPointLightPositionDirty, isPointLightColorDirty, isPointLightIntensityDirty, isPointLightAttenuationDirty, cleanPointLightPositionDirty, cleanPointLightColorDirty, cleanPointLightIntensityDirty, cleanPointLightAttenuationDirty,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
}
