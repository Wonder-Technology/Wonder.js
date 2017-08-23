import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import {
    getColorDataSize,
    getShaderIndexDataSize
} from "./materialUtils";
import { getLightModelDataSize, getMapSize, getShininessDataSize } from "./lightMaterialUtils";
import { getMaterialBufferSize } from "../../../material/bufferUtils";

export var getBasicMaterialBufferCount = () => {
    return DataBufferConfig.basicMaterialDataBufferCount;
}

export var getBasicMaterialBufferSize = () => {
    return getMaterialBufferSize();
}

export var getLightMaterialBufferCount = () => {
    return DataBufferConfig.lightMaterialDataBufferCount;
}

export var getBufferLength = () => {
    return getBasicMaterialBufferCount() * getBasicMaterialBufferSize() + getLightMaterialBufferCount() * getLightMaterialBufferSize();
}

export var getLightMaterialBufferSize = () => {
    return getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getLightModelDataSize() + getMapSize() * 2) + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() * 2 + getShininessDataSize());
}

export var getBufferTotalCount = () => {
    return getBasicMaterialBufferCount() + getLightMaterialBufferCount();
}

