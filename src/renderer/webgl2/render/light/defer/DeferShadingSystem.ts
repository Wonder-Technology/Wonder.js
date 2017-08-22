import { InitShaderDataMap } from "../../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import {
    render as renderDefer, init as initUtils,
    buildSendUniformDataDataMap
} from "../../../utils/worker/render_file/render/light/defer/deferShadingUtils";
import { use } from "../../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../../texture/MapManagerSystem";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../component/light/AmbientLightSystem";
import {
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
    getPosition as getDirectionLightPosition, isPositionDirty as isDirectionLightPositionDirty,isColorDirty as isDirectionLightColorDirty,isIntensityDirty as isDirectionLightIntensityDirty, cleanPositionDirty as cleanDirectionLightPositionDirty,cleanColorDirty as cleanDirectionLightColorDirty,cleanIntensityDirty as cleanDirectionLightIntensityDirty,
} from "../../../../../component/light/DirectionLightSystem";
import {
    getPosition as getPointLightPosition,
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange, isColorDirty, isPositionDirty,
    isIntensityDirty, isAttenuationDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty,
    cleanPositionDirty
} from "../../../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../shader/glslSender/GLSLSenderSystem";
import { useShader } from "../../../../../component/material/MaterialSystem";
import { bindGBuffer, getNewTextureUnitIndex, unbindGBuffer } from "../../../utils/worker/render_file/render/light/defer/gbuffer/gBufferUtils";
import { computeRadius } from "../../../light/PointLightSystem";
import { LightRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";
import { sendUniformData } from "../LightRenderSystem";
import { directlySendUniformData } from "../../../../utils/worker/render_file/render/renderUtils";
import { sendAttributeData } from "../../RenderSystem";
import { buildDrawFuncDataMap } from "../../../utils/worker/render_file/draw/light/defer/deferDrawRenderCommandBufferUtils";
import { CameraRenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";
import { IWebGL2DrawDataMap } from "../../../utils/worker/render_file/interface/IUtils";
import { DeferDrawDataMap } from "../../../utils/worker/render_file/type/utilsType";

export var init = initUtils;

export var render = curry((ThreeDTransformData: any, GameObjectData: any, gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: IWebGL2DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: LightRenderCommandBufferForDrawData, cameraData:CameraRenderCommandBufferForDrawData) => {
    renderDefer(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        (index: number, DirectionDataFromSystem:any) => {
            return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, DirectionDataFromSystem).values;
        }, getDirectionLightColorArr3, getDirectionLightIntensity, isDirectionLightPositionDirty, isDirectionLightColorDirty, isDirectionLightIntensityDirty, cleanDirectionLightPositionDirty, cleanDirectionLightColorDirty, cleanDirectionLightIntensityDirty,
        (index: number, PointLightDataFromSystem:any) => {
            return getPointLightPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
        }, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius, isPositionDirty, isColorDirty, isIntensityDirty, isAttenuationDirty, cleanPositionDirty, cleanColorDirty, cleanIntensityDirty, cleanAttenuationDirty,
        drawDataMap
    ), initShaderDataMap, bufferData, cameraData);
})
