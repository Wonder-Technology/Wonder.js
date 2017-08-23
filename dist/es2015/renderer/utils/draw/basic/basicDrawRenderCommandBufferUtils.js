import { getMatrix4DataSize } from "../../../../utils/typeArrayUtils";
export var initData = function (BasicDrawRenderCommandBufferDataFromSystem) {
    var mat4Length = getMatrix4DataSize();
    BasicDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    BasicDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    BasicDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
};
export var buildRenderCommandUniformData = function (mMatrices, vMatrices, pMatrices) {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices
    };
};
//# sourceMappingURL=basicDrawRenderCommandBufferUtils.js.map