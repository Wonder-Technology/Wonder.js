import {
    getAlphaTestDataSize,
    getColorDataSize, getOpacityDataSize,
    getShaderIndexDataSize
} from "../worker/render_file/material/materialUtils";
import { DataBufferConfig } from "../../../config/DataBufferConfig";

export const getMaterialBufferSize = () => {
    return Float32Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
}

export const getBasicMaterialBufferStartIndex = () => 0;

export const getLightMaterialBufferStartIndex = () => DataBufferConfig.basicMaterialDataBufferCount;

