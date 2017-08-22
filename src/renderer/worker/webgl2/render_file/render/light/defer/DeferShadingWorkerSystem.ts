import curry from "wonder-lodash/curry";
import { InitShaderDataMap } from "../../../../../../type/utilsType";
import { LightRenderCommandBufferForDrawData} from "../../../../../../utils/worker/render_file/type/dataType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../../both_file/data/render_config";
import {
    render as renderDefer, init as initUtils,
    buildSendUniformDataDataMap
} from "../../../../../../webgl2/utils/worker/render_file/render/light/defer/deferShadingUtils";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../../../component/light/AmbientLightSystem";
import {
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
    isPositionDirty as isDirectionLightPositionDirty,isColorDirty as isDirectionLightColorDirty,isIntensityDirty as isDirectionLightIntensityDirty, cleanPositionDirty as cleanDirectionLightPositionDirty,cleanColorDirty as cleanDirectionLightColorDirty,cleanIntensityDirty as cleanDirectionLightIntensityDirty,
} from "../../../../../render_file/light/DirectionLightWorkerSystem";
import { bindGBuffer, getNewTextureUnitIndex, unbindGBuffer } from "../../../../../../webgl2/utils/worker/render_file/render/light/defer/gbuffer/gBufferUtils";
import {
    use
} from "../../../../../render_file/shader/ShaderWorkerSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../../../render_file/texture/MapManagerWorkerSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../../render_file/geometry/GeometryWorkerSystem";
import { useShader } from "../../../../../render_file/material/MaterialWorkerSystem";
import {
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange, isColorDirty, isPositionDirty,
    isIntensityDirty, isAttenuationDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty,
    cleanPositionDirty
} from "../../../../../render_file/light/PointLightWorkerSystem";
import { directlySendUniformData } from "../../../../../../utils/worker/render_file/render/renderUtils";
import { buildDrawFuncDataMap } from "../../../../../../webgl2/utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils";
import { sendAttributeData } from "../../RenderWorkerSystem";
import { sendUniformData } from "../LightRenderWorkerSystem";
import { getDirectionLightPosition, getPointLightPosition } from "../../../../../render_file/render/RenderWorkerSystem";
import {
    CameraRenderCommandBufferForDrawData
} from "../../../../../../utils/worker/render_file/type/dataType";
import { computeRadius } from "../../../light/PointLightWorkerSystem";
import { IWebGL2DrawDataMap } from "../../../../../../webgl2/utils/worker/render_file/interface/IUtils";
import { DeferDrawDataMap } from "../../../../../../webgl2/utils/worker/render_file/type/utilsType";

export var init = initUtils;

export var render = curry((gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: IWebGL2DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, cameraData:CameraRenderCommandBufferForDrawData) => {
    renderDefer(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        getDirectionLightPosition, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius, isPositionDirty, isColorDirty, isIntensityDirty, isAttenuationDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
})
