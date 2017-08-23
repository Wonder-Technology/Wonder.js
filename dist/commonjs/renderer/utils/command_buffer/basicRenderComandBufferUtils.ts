import { getMatrix4DataSize } from "../../../utils/typeArrayUtils";

export var createTypeArrays = (buffer: any, DataBufferConfig: any, BasicRenderCommandBufferDataFromSystem: any) => {
    var mat4Length = getMatrix4DataSize(),
        count = DataBufferConfig.renderCommandBufferCount,
        offset: number = 0;

    BasicRenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, offset, count * mat4Length);
    offset += count * Float32Array.BYTES_PER_ELEMENT * mat4Length;

    BasicRenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, offset, count);
    offset += count * Uint32Array.BYTES_PER_ELEMENT;

    BasicRenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, offset, count);
    offset += count * Uint32Array.BYTES_PER_ELEMENT;


    BasicRenderCommandBufferDataFromSystem.vMatrix = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;

    BasicRenderCommandBufferDataFromSystem.pMatrix = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;
}

export var buildRenderCommandBufferForDrawData = (count:number, materialIndices:Float32Array, geometryIndices:Float32Array, mMatrices:Float32Array) => {
    return {
        renderCommandBufferData:{
            materialIndices:materialIndices,
            geometryIndices:geometryIndices,
            mMatrices: mMatrices
        },
        count: count
    }
}
