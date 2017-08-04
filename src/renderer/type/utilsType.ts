export type DrawDataMap = {
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
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    DrawRenderCommandBufferDataFromSystem: any;
}

export type DeferDrawDataMap = {
    GBufferDataFromSystem: any;
    DeferLightPassDataFromSystem: any;
}

export type SendUniformDataDataMap = {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    // ambientLightData: SendUniformDataAmbientLightDataMap;
    // directionLightData: SendUniformDataDirectionLightDataMap;
    // pointLightData: SendUniformDataPointLightDataMap;
}

export type DrawFuncDataMap = {
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
}

export type SendUniformDataGLSLSenderDataMap = {
    getUniformData: Function;
    sendMatrix3: Function;
    sendMatrix4: Function;
    sendVector3: Function;
    sendInt: Function;
    sendFloat1: Function;
    sendFloat3: Function;

    GLSLSenderDataFromSystem: any;
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

export type MaterialForGetUniformDataDataMap = {
    getColorArr3: Function;
    getOpacity: Function;
    MaterialDataFromSystem: any;
}

export type BasicMaterialForGetUniformDataDataMap = {
    BasicMaterialDataFromSystem: any;
}

export type LightMaterialForGetUniformDataDataMap = {
    getSpecularColorArr3: Function;
    getEmissionColorArr3: Function;
    getShininess: Function;
    getLightModel: Function;
    LightMaterialDataFromSystem: any;
}

export type InitShaderDataMap = {
    DeviceManagerDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    ShaderDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    MapManagerDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
}

export type InitShaderFuncDataMap = {
    buildGLSLSource: Function;
    getGL: Function;
    getMapCount: Function;
    hasSpecularMap: Function;
}
