import { DrawDataMap } from "../../../type/utilsType";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../type/dataType";
import { WebGL1LightSendUniformDataDataMap } from "../../type/utilsType";
import { sendUniformData as sendUniformDataUtils } from "../../utils/render/light/lightRenderUtils";
import { getColorArr3, getOpacity } from "../../../../component/material/MaterialSystem";
import {
    getEmissionColorArr3, getLightModel, getShininess,
    getSpecularColorArr3
} from "../../../../component/material/LightMaterialSystem";

export var buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    getAmbientLightColorArr3,
    getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
    getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange,
    drawDataMap: DrawDataMap, ThreeDTransformData: any, GameObjectData: any) => {
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
        },
        ambientLightData: {
            getColorArr3: getAmbientLightColorArr3,

            AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        },
        directionLightData: {
            getPosition: (index: number) => {
                return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
            },
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: (index: number) => {
                return getPointLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.PointLightDataFromSystem).values;
            },
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getConstant,
            getLinear: getLinear,
            getQuadratic: getQuadratic,
            getRange: getRange,

            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}

export var sendUniformData = (gl: any, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap:WebGL1LightSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformDataUtils(gl, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, _buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), _buildLightMaterialDataForGetUniformData(getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, drawDataMap.LightMaterialDataFromSystem));
};

var _buildMaterialDataForGetUniformData = (getColorArr3:Function, getOpacity:Function, MaterialDataFromSystem:any) => {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    }
}

var _buildLightMaterialDataForGetUniformData = (getEmissionColorArr3:Function, getSpecularColorArr3:Function, getLightModel:Function, getShininess:Function, LightMaterialDataFromSystem:any) => {
    return {
        getEmissionColorArr3: getEmissionColorArr3,
        getSpecularColorArr3: getSpecularColorArr3,
        getLightModel: getLightModel,
        getShininess: getShininess,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem
    }
}
