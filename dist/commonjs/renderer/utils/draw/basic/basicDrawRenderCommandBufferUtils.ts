import { getMatrix4DataSize } from "../../../../utils/typeArrayUtils";

export var initData = (BasicDrawRenderCommandBufferDataFromSystem: any) => {
    var mat4Length = getMatrix4DataSize();

    BasicDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    BasicDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    BasicDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
}

export var buildRenderCommandUniformData = (mMatrices: Float32Array, vMatrices: Float32Array, pMatrices: Float32Array) => {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices
    }
}
