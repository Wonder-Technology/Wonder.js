"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeArrayUtils_1 = require("../../../utils/typeArrayUtils");
exports.createTypeArrays = function (buffer, DataBufferConfig, BasicRenderCommandBufferDataFromSystem) {
    var mat4Length = typeArrayUtils_1.getMatrix4DataSize(), count = DataBufferConfig.renderCommandBufferCount, offset = 0;
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
//# sourceMappingURL=basicRenderComandBufferUtils.js.map