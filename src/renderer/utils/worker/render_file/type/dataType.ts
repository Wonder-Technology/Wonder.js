export type CameraRenderCommandBufferForDrawData = {
    vMatrix: Float32Array;
    pMatrix: Float32Array;
    cameraPosition: Float32Array;
    normalMatrix: Float32Array;
}

export type RenderCommandBufferForDrawData = {
    cameraData: CameraRenderCommandBufferForDrawData;
    basicData: BasicRenderCommandBufferForDrawData;
    lightData: LightRenderCommandBufferForDrawData;
}

export type BasicRenderCommandBufferForDrawData = {
    renderCommandBufferData: {
        mMatrices: Float32Array;
        materialIndices: Uint32Array;
        geometryIndices: Uint32Array;
    };

    count: number;
}

export type LightRenderCommandBufferForDrawData = {
    renderCommandBufferData: {
        mMatrices: Float32Array;
        materialIndices: Uint32Array;
        geometryIndices: Uint32Array;
    };

    count: number;
}