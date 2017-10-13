import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { getColor3Data } from "../../../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../../../structure/Color";
import { getColorDataSize, getIntensityDataSize } from "../../../light/directionLightUtils";
import { cleanDirty, getDirtyDataSize, isDirty } from "./specifyLightUtils";
// import { getColorDataSize as getSpecifyLightColorDataSize } from "../../../light/specifyLightUtils";

export const getColor = (index: number, DirectionLightDataFromSystem: any) => {
    return getColor3Data(index, DirectionLightDataFromSystem.colors);
}

export const getColorArr3 = (index: number, DirectionLightDataFromSystem: any) => {
    return getColorArr3Utils(index, DirectionLightDataFromSystem);
}

export const getIntensity = (index: number, DirectionLightDataFromSystem: any) => {
    return getSingleSizeData(index, DirectionLightDataFromSystem.intensities);
}

export const createTypeArrays = (buffer: any, count: number, DirectionLightDataFromSystem: any) => {
    var offset = 0;

    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getIntensityDataSize();

    DirectionLightDataFromSystem.isPositionDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();

    DirectionLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();

    DirectionLightDataFromSystem.isIntensityDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();
}

export const isPositionDirty = (index: number, DirectionLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, DirectionLightDataFromSystem.isPositionDirtys));
}

export const isColorDirty = (index: number, DirectionLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, DirectionLightDataFromSystem.isColorDirtys));
}

export const isIntensityDirty = (index: number, DirectionLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, DirectionLightDataFromSystem.isIntensityDirtys));
}

export const cleanPositionDirty = (index: number, DirectionLightDataFromSystem: any) => {
    cleanDirty(index, DirectionLightDataFromSystem.isPositionDirtys);
}

export const cleanColorDirty = (index: number, DirectionLightDataFromSystem: any) => {
    cleanDirty(index, DirectionLightDataFromSystem.isColorDirtys);
}

export const cleanIntensityDirty = (index: number, DirectionLightDataFromSystem: any) => {
    cleanDirty(index, DirectionLightDataFromSystem.isIntensityDirtys);
}
