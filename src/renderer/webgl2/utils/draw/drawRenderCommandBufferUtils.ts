export var buildDrawFuncDataMap = (bindIndexBuffer: Function, sendAttributeData: Function, sendUniformData: Function, directlySendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function, bindAndUpdate: Function, getMapCount: Function, useShader:Function, bindGBuffer:Function, unbindGBuffer:Function, getNewTextureUnitIndex:Function) => {
    return {
        bindIndexBuffer: bindIndexBuffer,
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

