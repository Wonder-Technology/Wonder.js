import { SendUniformDataGLSLSenderDataMap } from "../../../../type/utilsType";
export interface IBasicSendUniformDataDataMap {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
}
export interface ILightSendUniformDataDataMap {
    glslSenderData: SendUniformDataGLSLSenderDataMap;
    ambientLightData?: any;
    directionLightData: any;
    pointLightData: any;
}
export interface IDrawDataMap {
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
    BasicDrawRenderCommandBufferDataFromSystem: any;
    LightDrawRenderCommandBufferDataFromSystem: any;
}
