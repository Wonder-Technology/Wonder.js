import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../utils/typeArrayUtils";

export var initData = (LightDrawRenderCommandBufferDataFromSystem: any) => {
    var mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize();

    LightDrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend = new Float32Array(mat4Length);
    LightDrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend = new Float32Array(mat4Length);
    LightDrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend = new Float32Array(mat4Length);
    LightDrawRenderCommandBufferDataFromSystem.cameraPositionForSend = new Float32Array(cameraPositionLength);
    LightDrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend = new Float32Array(mat3Length);
}

export var buildRenderCommandUniformData = (mMatrices: Float32Array, vMatrix: Float32Array, pMatrix: Float32Array, cameraPosition: Float32Array, normalMatrix: Float32Array) => {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrix,
        pMatrix: pMatrix,
        cameraPosition: cameraPosition,
        normalMatrix: normalMatrix
    }
}
