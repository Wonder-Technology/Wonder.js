import { DataBufferConfig } from "../../../config/DataBufferConfig";
import {
    getAlphaTestDataSize,
    getColorDataSize, getOpacityDataSize,
    getShaderIndexDataSize
} from "./materialUtils";
import { getLightModelDataSize, getShininessDataSize } from "./lightMaterialUtils";

export var getMaterialBufferSize = () => {
    return Float32Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getColorDataSize() + getOpacityDataSize() + getAlphaTestDataSize());
}

export var getBasicMaterialBufferCount = () => {
    return DataBufferConfig.basicMaterialDataBufferCount;
}

export var getBasicMaterialBufferSize = () => {
    return getMaterialBufferSize();
}

export var getLightMaterialBufferCount = () => {
    return DataBufferConfig.lightMaterialDataBufferCount;
}

export var getLightMaterialBufferSize = () => {
    return getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getLightModelDataSize()) + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() * 2 + getShininessDataSize());
}

export var getBufferLength = () => {
    return getBasicMaterialBufferCount() * getBasicMaterialBufferSize() + getLightMaterialBufferCount() * getLightMaterialBufferSize();
}

export var getBufferTotalCount = () => {
    return getBasicMaterialBufferCount() + getLightMaterialBufferCount();
}

export var getBasicMaterialBufferStartIndex = () => 0;

export var getLightMaterialBufferStartIndex = () => DataBufferConfig.basicMaterialDataBufferCount;

