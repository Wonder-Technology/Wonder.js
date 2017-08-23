import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import { getColorDataSize, getShaderIndexDataSize } from "./materialUtils";
import { getLightModelDataSize, getMapSize, getShininessDataSize } from "./lightMaterialUtils";
import { getMaterialBufferSize } from "../../../material/bufferUtils";
export var getBasicMaterialBufferCount = function () {
    return DataBufferConfig.basicMaterialDataBufferCount;
};
export var getBasicMaterialBufferSize = function () {
    return getMaterialBufferSize();
};
export var getLightMaterialBufferCount = function () {
    return DataBufferConfig.lightMaterialDataBufferCount;
};
export var getBufferLength = function () {
    return getBasicMaterialBufferCount() * getBasicMaterialBufferSize() + getLightMaterialBufferCount() * getLightMaterialBufferSize();
};
export var getLightMaterialBufferSize = function () {
    return getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getLightModelDataSize() + getMapSize() * 2) + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() * 2 + getShininessDataSize());
};
export var getBufferTotalCount = function () {
    return getBasicMaterialBufferCount() + getLightMaterialBufferCount();
};
//# sourceMappingURL=bufferUtils.js.map