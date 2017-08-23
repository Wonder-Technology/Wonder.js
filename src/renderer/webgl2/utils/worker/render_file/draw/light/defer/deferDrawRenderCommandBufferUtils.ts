export var buildDrawDataMap = (GBufferDataFromSystem: any, DeferAmbientLightPassDataFromSystem: any, DeferDirectionLightPassDataFromSystem: any, DeferPointLightPassDataFromSystem: any) => {
    return {
        GBufferDataFromSystem: GBufferDataFromSystem,
        DeferAmbientLightPassDataFromSystem: DeferAmbientLightPassDataFromSystem,
        DeferDirectionLightPassDataFromSystem: DeferDirectionLightPassDataFromSystem,
        DeferPointLightPassDataFromSystem: DeferPointLightPassDataFromSystem,
    }
}

export var buildDrawFuncDataMap = (sendAttributeData: Function, sendUniformData: Function, directlySendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function, bindAndUpdate: Function, getMapCount: Function, useShader: Function, bindGBuffer: Function, unbindGBuffer: Function, getNewTextureUnitIndex: Function) => {
    return {
        sendAttributeData: sendAttributeData,
        sendUniformData: sendUniformData,
        directlySendUniformData: directlySendUniformData,
        use: use,
        hasIndices: hasIndices,
        getIndicesCount: getIndicesCount,
        getIndexType: getIndexType,
        getIndexTypeSize: getIndexTypeSize,
        getVerticesCount: getVerticesCount,
        bindAndUpdate: bindAndUpdate,
        getMapCount: getMapCount,
        useShader: useShader,
        bindGBuffer: bindGBuffer,
        unbindGBuffer: unbindGBuffer,
        getNewTextureUnitIndex: getNewTextureUnitIndex
    }
}
