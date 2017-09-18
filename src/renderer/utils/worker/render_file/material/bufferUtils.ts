import { DataBufferConfig } from "../../../../../config/DataBufferConfig";
import {
    getColorDataSize,
    getShaderIndexDataSize
} from "./materialUtils";
import { getLightModelDataSize, getMapSize, getShininessDataSize } from "./lightMaterialUtils";
import { getMaterialBufferSize } from "../../../material/bufferUtils";

export const getBasicMaterialBufferCount = () => {
    return DataBufferConfig.basicMaterialDataBufferCount;
}

export const getBasicMaterialBufferSize = () => {
    return getMaterialBufferSize();
}

export const getLightMaterialBufferCount = () => {
    return DataBufferConfig.lightMaterialDataBufferCount;
}

export const getBufferLength = () => {
    return getBasicMaterialBufferCount() * getBasicMaterialBufferSize() + getLightMaterialBufferCount() * getLightMaterialBufferSize();
}

export const getLightMaterialBufferSize = () => {
    return getMaterialBufferSize() + Uint8Array.BYTES_PER_ELEMENT * (getShaderIndexDataSize() + getLightModelDataSize() + getMapSize() * 2) + Float32Array.BYTES_PER_ELEMENT * (getColorDataSize() * 2 + getShininessDataSize());
}

export const getBufferTotalCount = () => {
    return getBasicMaterialBufferCount() + getLightMaterialBufferCount();
}

