import { SendUniformDataGLSLSenderDataMap } from "../../type/utilsType";

export type WebGL1SendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    ambientLightData: SendUniformDataAmbientLightDataMap;
    directionLightData: SendUniformDataDirectionLightDataMap;
    pointLightData: SendUniformDataPointLightDataMap;
}

export type SendUniformDataAmbientLightDataMap = {
    getColorArr3: Function;

    AmbientLightDataFromSystem: any;
}

export type SendUniformDataDirectionLightDataMap = {
    getColorArr3: Function;
    getIntensity: Function;
    getPosition: Function;

    DirectionLightDataFromSystem: any;
}

export type SendUniformDataPointLightDataMap = {
    getColorArr3: Function;
    getIntensity: Function;
    getConstant: Function;
    getLinear: Function;
    getQuadratic: Function;
    getRange: Function;
    getPosition: Function;

    PointLightDataFromSystem: any;
}

