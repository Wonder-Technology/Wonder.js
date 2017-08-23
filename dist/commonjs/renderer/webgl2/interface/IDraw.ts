export interface IWebGL2DrawFuncDataMap {
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
}

export interface IWebGL2DeferDrawFuncDataMap extends IWebGL2DrawFuncDataMap {
    bindGBuffer: Function;
    unbindGBuffer: Function;
    getNewTextureUnitIndex: Function;
}

export interface IWebGL2BasicDrawFuncDataMap extends IWebGL2DrawFuncDataMap {
}

