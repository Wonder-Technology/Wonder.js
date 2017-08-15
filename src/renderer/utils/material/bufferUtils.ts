import {
    getAlphaTestDataSize,
    getColorDataSize, getOpacityDataSize,
    getShaderIndexDataSize
} from "../worker/render_file/material/materialUtils";
import { DataBufferConfig } from "../../../config/DataBufferConfig";

export var getMaterialBufferSize = () => {
    return Float32Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
}

export var getBasicMaterialBufferStartIndex = () => 0;

export var getLightMaterialBufferStartIndex = () => DataBufferConfig.basicMaterialDataBufferCount;

