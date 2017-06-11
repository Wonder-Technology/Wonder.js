export type DrawDataMap = {
    DeviceManagerDataFromSystem: any;
    MaterialDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    DrawRenderCommandDataFromSystem: any;
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
    getUniformData:Function;
    sendMatrix4:Function;
    sendVector3:Function;
    sendFloat1:Function;
}
