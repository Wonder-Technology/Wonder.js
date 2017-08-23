"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeArrayUtils_1 = require("../../../../utils/typeArrayUtils");
exports.initData = function (BasicDrawRenderCommandBufferDataFromSystem) {
    var mat4Length = typeArrayUtils_1.getMatrix4DataSize();
    BasicDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    BasicDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    BasicDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
};
exports.buildRenderCommandUniformData = function (mMatrices, vMatrices, pMatrices) {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices
    };
};
//# sourceMappingURL=basicDrawRenderCommandBufferUtils.js.map