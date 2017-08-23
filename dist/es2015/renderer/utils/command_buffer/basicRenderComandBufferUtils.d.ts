export declare var createTypeArrays: (buffer: any, DataBufferConfig: any, BasicRenderCommandBufferDataFromSystem: any) => void;
export declare var buildRenderCommandBufferForDrawData: (count: number, materialIndices: Float32Array, geometryIndices: Float32Array, mMatrices: Float32Array) => {
    renderCommandBufferData: {
        materialIndices: Float32Array;
        geometryIndices: Float32Array;
        mMatrices: Float32Array;
    };
    count: number;
};
