export declare var buildDrawDataMap: (GBufferDataFromSystem: any, DeferAmbientLightPassDataFromSystem: any, DeferDirectionLightPassDataFromSystem: any, DeferPointLightPassDataFromSystem: any) => {
    GBufferDataFromSystem: any;
    DeferAmbientLightPassDataFromSystem: any;
    DeferDirectionLightPassDataFromSystem: any;
    DeferPointLightPassDataFromSystem: any;
};
export declare var buildDrawFuncDataMap: (sendAttributeData: Function, sendUniformData: Function, directlySendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function, bindAndUpdate: Function, getMapCount: Function, useShader: Function, bindGBuffer: Function, unbindGBuffer: Function, getNewTextureUnitIndex: Function) => {
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
};
