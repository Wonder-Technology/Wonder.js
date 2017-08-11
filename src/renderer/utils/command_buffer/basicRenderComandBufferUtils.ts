import { getMatrix4DataSize, getVector3DataSize } from "../../../utils/typeArrayUtils";

export var createTypeArrays = (buffer: any, DataBufferConfig: any, BasicRenderCommandBufferDataFromSystem: any) => {
    // var mat3Length = getMatrix3DataSize(),
    var mat4Length = getMatrix4DataSize(),
        // cameraPositionLength = getVector3DataSize(),
        count = DataBufferConfig.renderCommandBufferCount,
        offset: number = 0;

    BasicRenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, offset, count * mat4Length);
    offset += count * Float32Array.BYTES_PER_ELEMENT * mat4Length;

    BasicRenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, offset, count);
    offset += count * Uint32Array.BYTES_PER_ELEMENT;

    BasicRenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, offset, count);
    offset += count * Uint32Array.BYTES_PER_ELEMENT;


    BasicRenderCommandBufferDataFromSystem.vMatrices = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;

    BasicRenderCommandBufferDataFromSystem.pMatrices = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;

    // BasicRenderCommandBufferDataFromSystem.cameraPositions = new Float32Array(buffer, offset, cameraPositionLength);
    // offset += Float32Array.BYTES_PER_ELEMENT * cameraPositionLength;

    // BasicRenderCommandBufferDataFromSystem.normalMatrices = new Float32Array(buffer, offset, mat3Length);
    // offset += Float32Array.BYTES_PER_ELEMENT * mat3Length;
}

