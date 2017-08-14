// import { sendUniformData as sendUniformDataUtils } from "../../utils/render/light/lightRenderUtils";
import { sendUniformData as sendUniformDataUtils } from "../../../../../webgl1/utils/render/light/lightRenderUtils";
import {    getEmissionColorArr3, getLightModel, getShininess,
    getSpecularColorArr3} from "../../../../render_file/material/LightMaterialWorkerSystem";
import { getColorArr3, getOpacity } from "../../../../render_file/material/MaterialWorkerSystem";
import { WebGL1LightSendUniformDataDataMap } from "../../../../../webgl1/type/utilsType";
import { LightRenderUniformData, UniformCacheMap, UniformLocationMap } from "../../../../../type/dataType";
import { DrawDataMap } from "../../../../../type/utilsType";


export var buildSendUniformDataDataMap = (
    sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
    getAmbientLightColorArr3,
    getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
    getPointLightPosition, getPointLightColorArr3, getPointLightConstant, getPointLightIntensity, getPointLightLinear, getPointLightQuadratic, getPointLightRange,
    drawDataMap: DrawDataMap) => {
    //todo optimize: cache

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
                return getDirectionLightPosition(index, drawDataMap);
            },
            getColorArr3: getDirectionLightColorArr3,
            getIntensity: getDirectionLightIntensity,

            DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        },
        pointLightData: {
            getPosition: (index: number) => {
                return getPointLightPosition(index, drawDataMap);
            },
            getColorArr3: getPointLightColorArr3,
            getIntensity: getPointLightIntensity,
            getConstant: getPointLightConstant,
            getLinear: getPointLightLinear,
            getQuadratic: getPointLightQuadratic,
            getRange: getPointLightRange,

            PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        }
    }
}

//todo refactor
export var sendUniformData = (gl: any, materialIndex:number, shaderIndex: number, program: WebGLProgram, drawDataMap: DrawDataMap, renderCommandUniformData: LightRenderUniformData, sendDataMap:WebGL1LightSendUniformDataDataMap, uniformLocationMap:UniformLocationMap, uniformCacheMap:UniformCacheMap) => {
    sendUniformDataUtils(gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, _buildMaterialDataForGetUniformData(getColorArr3, getOpacity, drawDataMap.MaterialDataFromSystem), _buildLightMaterialDataForGetUniformData(getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, drawDataMap.LightMaterialDataFromSystem));
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
