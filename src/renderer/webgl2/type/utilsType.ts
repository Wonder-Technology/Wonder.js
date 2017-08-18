import { SendUniformDataGLSLSenderDataMap } from "../../type/utilsType";

export type WebGL2LightSendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    // ambientLightData: SendUniformDataAmbientLightDataMap;
    // directionLightData: WebGL2SendUniformDataPointLightDataMap;
    pointLightData: WebGL2SendUniformDataPointLightDataMap;
}

export type WebGL2BasicSendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
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
    getPosition: Function;
    computeRadius: Function;
    isPositionDirty: Function;
    isColorDirty: Function;
    isIntensityDirty: Function;
    isAttenuationDirty: Function;
    cleanPositionDirty: Function;
    cleanColorDirty: Function;
    cleanIntensityDirty: Function;
    cleanAttenuationDirty: Function;

    PointLightDataFromSystem: any;
}

export type WebGL2InitShaderFuncDataMap = {
    buildGLSLSource: Function;
    getGL: Function;
    getMapCount: Function;
    hasSpecularMap: Function;
    getVertices:Function;
    getNormals:Function;
    getTexCoords:Function;
    getIndices:Function;
}

export type WebGL2DrawDataMap = {
    DeviceManagerDataFromSystem: any;
    TextureDataFromSystem: any;
    TextureCacheDataFromSystem: any;
    MapManagerDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    BasicDrawRenderCommandBufferDataFromSystem: any;
    LightDrawRenderCommandBufferDataFromSystem: any;
}
