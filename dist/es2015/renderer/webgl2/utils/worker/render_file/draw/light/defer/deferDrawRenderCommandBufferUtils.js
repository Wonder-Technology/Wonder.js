export var buildDrawDataMap = function (GBufferDataFromSystem, DeferAmbientLightPassDataFromSystem, DeferDirectionLightPassDataFromSystem, DeferPointLightPassDataFromSystem) {
    return {
        GBufferDataFromSystem: GBufferDataFromSystem,
        DeferAmbientLightPassDataFromSystem: DeferAmbientLightPassDataFromSystem,
        DeferDirectionLightPassDataFromSystem: DeferDirectionLightPassDataFromSystem,
        DeferPointLightPassDataFromSystem: DeferPointLightPassDataFromSystem,
    };
};
export var buildDrawFuncDataMap = function (sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex) {
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
    };
};
//# sourceMappingURL=deferDrawRenderCommandBufferUtils.js.map