import { DataBufferConfig } from "../../config/DataBufferConfig";
import { getBufferSize as getMaterialBufferSize } from "./MaterialSystem";
import { getColorDataSize, getShaderIndexDataSize } from "../../renderer/utils/material/materialUtils";
import { getLightModelDataSize, getShininessDataSize } from "./LightMaterialSystem";
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

