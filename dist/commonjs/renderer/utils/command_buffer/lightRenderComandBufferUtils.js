"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeArrayUtils_1 = require("../../../utils/typeArrayUtils");
exports.createTypeArrays = function (buffer, DataBufferConfig, RenderCommandBufferDataFromSystem) {
    var mat3Length = typeArrayUtils_1.getMatrix3DataSize(), mat4Length = typeArrayUtils_1.getMatrix4DataSize(), cameraPositionLength = typeArrayUtils_1.getVector3DataSize(), count = DataBufferConfig.renderCommandBufferCount, offset = 0;
    RenderCommandBufferDataFromSystem.mMatrices = new Float32Array(buffer, offset, count * mat4Length);
    offset += count * Float32Array.BYTES_PER_ELEMENT * mat4Length;
    RenderCommandBufferDataFromSystem.materialIndices = new Uint32Array(buffer, offset, count);
    offset += count * Uint32Array.BYTES_PER_ELEMENT;
    RenderCommandBufferDataFromSystem.geometryIndices = new Uint32Array(buffer, offset, count);
    offset += count * Uint32Array.BYTES_PER_ELEMENT;
    RenderCommandBufferDataFromSystem.vMatrices = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;
    RenderCommandBufferDataFromSystem.pMatrices = new Float32Array(buffer, offset, mat4Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat4Length;
    RenderCommandBufferDataFromSystem.cameraPositions = new Float32Array(buffer, offset, cameraPositionLength);
    offset += Float32Array.BYTES_PER_ELEMENT * cameraPositionLength;
    RenderCommandBufferDataFromSystem.normalMatrices = new Float32Array(buffer, offset, mat3Length);
    offset += Float32Array.BYTES_PER_ELEMENT * mat3Length;
};
exports.buildRenderCommandBufferForDrawData = function (count, materialIndices, geometryIndices, mMatrices) {
    return {
        renderCommandBufferData: {
            materialIndices: materialIndices,
            geometryIndices: geometryIndices,
            mMatrices: mMatrices
        },
        count: count
    };
};
//# sourceMappingURL=lightRenderComandBufferUtils.js.map