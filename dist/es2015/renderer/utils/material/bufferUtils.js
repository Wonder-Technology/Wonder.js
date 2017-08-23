import { getAlphaTestDataSize, getColorDataSize, getOpacityDataSize, getShaderIndexDataSize } from "../worker/render_file/material/materialUtils";
import { DataBufferConfig } from "../../../config/DataBufferConfig";
export var getMaterialBufferSize = function () {
    return Float32Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
};
export var getBasicMaterialBufferStartIndex = function () { return 0; };
export var getLightMaterialBufferStartIndex = function () { return DataBufferConfig.basicMaterialDataBufferCount; };
//# sourceMappingURL=bufferUtils.js.map