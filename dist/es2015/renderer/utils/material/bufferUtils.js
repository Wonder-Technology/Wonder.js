import { DataBufferConfig } from "../../../config/DataBufferConfig";
import { getAlphaTestDataSize, getColorDataSize, getOpacityDataSize, getShaderIndexDataSize } from "./materialUtils";
import { getLightModelDataSize, getShininessDataSize } from "./lightMaterialUtils";
export var getMaterialBufferSize = function () {
    return Float32Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
};
export var getBasicMaterialBufferCount = function () {
    return DataBufferConfig.basicMaterialDataBufferCount;
};
export var getBasicMaterialBufferSize = function () {
    return getMaterialBufferSize();
};
export var getLightMaterialBufferCount = function () {
    return DataBufferConfig.lightMaterialDataBufferCount;
};
export var getLightMaterialBufferSize = function () {
    return getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getLightModelDataSize()) + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() * 2 + getShininessDataSize());
};
export var getBufferLength = function () {
    return getBasicMaterialBufferCount() * getBasicMaterialBufferSize() + getLightMaterialBufferCount() * getLightMaterialBufferSize();
};
export var getBufferTotalCount = function () {
    return getBasicMaterialBufferCount() + getLightMaterialBufferCount();
};
export var getBasicMaterialBufferStartIndex = function () { return 0; };
export var getLightMaterialBufferStartIndex = function () { return DataBufferConfig.basicMaterialDataBufferCount; };
//# sourceMappingURL=bufferUtils.js.map