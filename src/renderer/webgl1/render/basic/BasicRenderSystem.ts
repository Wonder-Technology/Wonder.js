import { DrawDataMap, InitShaderDataMap } from "../../../type/utilsType";
import curry from "wonder-lodash/curry";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { IMaterialConfig } from "../../../data/material_config";
import { IRenderConfig } from "../../../worker/both_file/data/render_config";
import { bindIndexBuffer, sendAttributeData, use } from "../../../shader/ShaderSystem";
// import { directlySendUniformData } from "../../../utils/shader/program/programUtils";
import {
    getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
    hasIndices
} from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../component/light/AmbientLightSystem";
// import {
//     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
//     getPosition as getDirectionLightPosition,
// } from "../../../component/light/DirectionLightSystem";
// import {
//     getPosition as getPointLightPosition,
//     getColorArr3 as getPointLightColorArr3, getConstant,
//     getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
// } from "../../../component/light/PointLightSystem";
import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../../shader/glslSender/GLSLSenderSystem";
import { getColorArr3, getOpacity, useShader } from "../../../../component/material/MaterialSystem";
import { buildDrawFuncDataMap } from "../../utils/draw/drawRenderCommandBufferUtils";
import {
    BasicRenderCommandBufferForDrawData, BasicRenderUniformData, UniformCacheMap,
    UniformLocationMap
} from "../../../type/dataType";
// import { draw as basicDraw } from "../utils/basic/draw/basicRenderDrawRenderCommandBufferUtils";
import { WebGL1BasicSendUniformDataDataMap } from "../../type/utilsType";
import { draw as basicDraw, sendUniformData } from "../../utils/render/basic/basicRenderUtils";
import { directlySendUniformData } from "../../../utils/render/renderUtils";

export var draw = curry((gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: DrawDataMap, initShaderDataMap: InitShaderDataMap, bufferData: BasicRenderCommandBufferForDrawData) => {
    basicDraw(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, _sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader), drawDataMap, buildSendUniformDataDataMap(
        sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
        // getAmbientLightColorArr3,
        // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
        // getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
        drawDataMap
    ), initShaderDataMap, bufferData);
})

export var buildSendUniformDataDataMap = (
    // getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    // getAmbientLightColorArr3,
    // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
    // getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
    drawDataMap: DrawDataMap) => {
    return {
        glslSenderData: {
            // getUniformData: getUniformData,
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,

            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        }
        // ambientLightData: {
        //     getColorArr3: getAmbientLightColorArr3,
        //
        //     AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        // },
        // directionLightData: {
        //     getPosition: (index: number) => {
        //         return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
        //     },
        //     getColorArr3: getDirectionLightColorArr3,
        //     getIntensity: getDirectionLightIntensity,
        //
        //     DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        // },
        // pointLightData: {
        //     getPosition: (index: number) => {
        //         return getPointLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.PointLightDataFromSystem).values;
        //     },
        //     getColorArr3: getPointLightColorArr3,
        //     getIntensity: getPointLightIntensity,
        //     getConstant: getConstant,
        //     getLinear: getLinear,
        //     getQuadratic: getQuadratic,
        //     getRange: getRange,
        //
        //     PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        // }
    }
}

var _sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: BasicRenderUniformData, sendDataMap:WebGL1BasicSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformData(gl, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, _buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), _buildBasicMaterialDataForGetUniformData(drawDataMap.BasicMaterialDataFromSystem));
};

var _buildMaterialDataForGetUniformData = (getColorArr3:Function, getOpacity:Function, MaterialDataFromSystem:any) => {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    }
}

var _buildBasicMaterialDataForGetUniformData = (BasicMaterialDataFromSystem:any) => {
    return {
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem
    }
}
