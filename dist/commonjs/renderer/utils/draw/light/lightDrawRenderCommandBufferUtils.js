"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeArrayUtils_1 = require("../../../../utils/typeArrayUtils");
exports.initData = function (LightDrawRenderCommandBufferDataFromSystem) {
    var mat3Length = typeArrayUtils_1.getMatrix3DataSize(), mat4Length = typeArrayUtils_1.getMatrix4DataSize(), cameraPositionLength = typeArrayUtils_1.getVector3DataSize();
    LightDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    LightDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    LightDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
    LightDrawRenderCommandBufferDataFromSystem.cameraPositionForSend = new Float32Array(cameraPositionLength);
    LightDrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend = new Float32Array(mat3Length);
};
exports.buildRenderCommandUniformData = function (mMatrices, vMatrix, pMatrix, cameraPosition, normalMatrix) {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrix,
        pMatrix: pMatrix,
        cameraPosition: cameraPosition,
        normalMatrix: normalMatrix
    };
};
//# sourceMappingURL=lightDrawRenderCommandBufferUtils.js.map