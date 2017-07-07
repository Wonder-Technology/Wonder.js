import { getMatrix4DataSize, getVector3DataSize } from "../../../utils/typeArrayUtils";

export var createTypeArrays = (buffer: any, DataBufferConfig: any, RenderCommandBufferDataFromSystem: any) => {
    var mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize(),
        size = Float32Array.BYTES_PER_ELEMENT * mat4Length + Uint32Array.BYTES_PER_ELEMENT * 3,
        count = DataBufferConfig.renderCommandBufferCount;

    RenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, 0, count * mat4Length);
    RenderCommandBufferDataFromSystem.vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, mat4Length);
    RenderCommandBufferDataFromSystem.pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, mat4Length);

    RenderCommandBufferDataFromSystem.cameraPositions = new Float32Array(buffer, Float32Array.BYTES_PER_ELEMENT * ((count + 2) * mat4Length), cameraPositionLength);
    RenderCommandBufferDataFromSystem.normalMatrices = new Float32Array(buffer, Float32Array.BYTES_PER_ELEMENT * ((count + 3) * mat4Length + cameraPositionLength), mat4Length);

    RenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, Float32Array.BYTES_PER_ELEMENT * ((count + 3) * mat4Length + cameraPositionLength), count);
    RenderCommandBufferDataFromSystem.shaderIndices = new Uint32Array(buffer, Float32Array.BYTES_PER_ELEMENT * ((count + 3) * mat4Length + cameraPositionLength) + count * Uint32Array.BYTES_PER_ELEMENT, count);
    RenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, Float32Array.BYTES_PER_ELEMENT * ((count + 3) * mat4Length + cameraPositionLength) + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);
}

