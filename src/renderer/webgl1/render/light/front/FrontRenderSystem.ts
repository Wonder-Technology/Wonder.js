import { DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../data/material_config";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { draw as frontDraw } from "../../../utils/render/light/front/frontRenderUtils";
import { bindIndexBuffer, use } from "../../../../shader/ShaderSystem";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../../texture/MapManagerSystem";
import { getColorArr3 as getAmbientLightColorArr3 } from "../../../../../component/light/AmbientLightSystem";
import {
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
    getPosition as getDirectionLightPosition,
} from "../../../../../component/light/DirectionLightSystem";
import {
    getPosition as getPointLightPosition,
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
} from "../../../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../../shader/glslSender/GLSLSenderSystem";
import { useShader } from "../../../../../component/material/MaterialSystem";
import { buildDrawFuncDataMap } from "../../../utils/draw/drawRenderCommandBufferUtils";
import { LightRenderCommandBufferForDrawData } from "../../../../type/dataType";
import { directlySendUniformData } from "../../../../utils/render/renderUtils";
import { buildSendUniformDataDataMap, sendUniformData } from "../LightRenderSystem";
import { sendAttributeData } from "../../RenderSystem";

export var draw = curry((gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, bufferData: LightRenderCommandBufferForDrawData) => {
    frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        getAmbientLightColorArr3,
        getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
        drawDataMap, ThreeDTransformData, GameObjectData
    ), initShaderDataMap, bufferData);
})
