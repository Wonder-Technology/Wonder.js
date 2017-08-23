export declare type CameraRenderCommandBufferForDrawData = {
    vMatrix: Float32Array;
    pMatrix: Float32Array;
    cameraPosition: Float32Array;
    normalMatrix: Float32Array;
};
export declare type RenderCommandBufferForDrawData = {
    cameraData: CameraRenderCommandBufferForDrawData;
    basicData: BasicRenderCommandBufferForDrawData;
    lightData: LightRenderCommandBufferForDrawData;
};
export declare type BasicRenderCommandBufferForDrawData = {
    renderCommandBufferData: {
        mMatrices: Float32Array;
        materialIndices: Uint32Array;
        geometryIndices: Uint32Array;
    };
    count: number;
};
export declare type LightRenderCommandBufferForDrawData = {
    renderCommandBufferData: {
        mMatrices: Float32Array;
        materialIndices: Uint32Array;
        geometryIndices: Uint32Array;
    };
    count: number;
};
