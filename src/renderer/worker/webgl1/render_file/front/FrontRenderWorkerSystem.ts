import { DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../../data/material_config";
import { IRenderConfig } from "../../../both_file/data/render_config";
import { draw as frontDraw } from "../../../../webgl1/utils/render/light/front/frontRenderUtils";
import { RenderCommandBufferForDrawData } from "../../../../type/dataType";
import {
    bindIndexBuffer, getDirectionLightPosition, getPointLightPosition, sendAttributeData,
    use
} from "../../../render_file/shader/ShaderWorkerSystem";
import { useShader } from "../../../render_file/material/MaterialWorkerSystem";
import { directlySendUniformData } from "../../../../utils/shader/program/programUtils";
import { hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount } from "../../../render_file/geometry/GeometryWorkerSystem";
import { bindAndUpdate, getMapCount } from "../../../render_file/texture/MapManagerWorkerSystem";
import { getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../render_file/shader/glslSender/GLSLSenderWorkerSystem";
import { getColorArr3 as getAmbientLightColorArr3 } from "../../../render_file/light/AmbientLightWorkerSystem";
import {
    getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity
} from "../../../render_file/light/DirectionLightWorkerSystem";
import {
    getColorArr3 as getPointLightColorArr3, getConstant,
    getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
} from "../../../render_file/light/PointLightWorkerSystem";
import { buildSendUniformDataDataMap, sendUniformData } from "../shader/ShaderWorkerSystem";
import { buildDrawFuncDataMap } from "../../../../webgl1/utils/draw/drawRenderCommandBufferUtils";

export var draw = (gl:any, state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    frontDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        getAmbientLightColorArr3,
        getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
        drawDataMap
    ), initShaderDataMap, bufferData);
}
