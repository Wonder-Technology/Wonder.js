import { SendUniformDataGLSLSenderDataMap } from "../../type/utilsType";

export type WebGL2DrawFuncDataMap = {
    bindIndexBuffer: Function;
    sendAttributeData: Function;
    sendUniformData: Function;
    directlySendUniformData: Function;
    use: Function;
    hasIndices: Function;
    getIndicesCount: Function;
    getIndexType: Function;
    getIndexTypeSize: Function;
    getVerticesCount: Function;
    bindAndUpdate: Function;
    getMapCount: Function;
    useShader: Function;
    bindGBuffer: Function;
    unbindGBuffer: Function;
    getNewTextureUnitIndex: Function;
}

export type WebGL2SendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    // ambientLightData: SendUniformDataAmbientLightDataMap;
    // directionLightData: WebGL2SendUniformDataPointLightDataMap;
    pointLightData: WebGL2SendUniformDataPointLightDataMap;
}

// export type SendUniformDataAmbientLightDataMap = {
//     getColorArr3: Function;
//
//     AmbientLightDataFromSystem: any;
// }
//
// export type SendUniformDataDirectionLightDataMap = {
//     getColorArr3: Function;
//     getIntensity: Function;
//     getPosition: Function;
//
//     DirectionLightDataFromSystem: any;
// }

export type WebGL2SendUniformDataPointLightDataMap = {
    getColorArr3: Function;
    getIntensity: Function;
    getConstant: Function;
    getLinear: Function;
    getQuadratic: Function;
    getRange: Function;
    getPosition: Function;
    computeRadius: Function;

    PointLightDataFromSystem: any;
}

