export type DrawDataMap = {
    DeviceManagerDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    DrawRenderCommandBufferDataFromSystem: any;
}

export type DrawFuncDataMap = {
    bindIndexBuffer: Function;
    sendAttributeData: Function;
    sendUniformData: Function;
    use: Function;
    hasIndices: Function;
    getIndicesCount: Function;
    getIndexType: Function;
    getIndexTypeSize: Function;
    getVerticesCount: Function;
}

export type SendUniformDataFuncDataMap = {
    getUniformData: Function;
    sendMatrix4: Function;
    sendVector3: Function;
    sendFloat1: Function;
}

export type BasicMaterialForGetUniformDataDataMap = {
    getColorArr3:Function;
    getOpacity:Function;
    BasicMaterialDataFromSystem: any;
}

export type LightMaterialForGetUniformDataDataMap = {
    getColorArr3:Function;
    getOpacity:Function;
    getSpecularColorArr3:Function;
    getEmissionColorArr3:Function;
    getShininess:Function;
    getLightModel:Function;
    LightMaterialDataFromSystem: any;
}
