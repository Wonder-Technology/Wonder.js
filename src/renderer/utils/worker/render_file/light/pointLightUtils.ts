import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { getColor3Data } from "../../../../../component/utils/operateBufferDataUtils";
import { cleanDirty, getDirtyDataSize, isDirty } from "./specifyLightUtils";
import { getColorDataSize as getSpecifyLightColorDataSize } from "./specifyLightUtils";
import { Color } from "../../../../../structure/Color";

export const getColor = (index: number, PointLightDataFromSystem: any) => {
    return getColor3Data(index, PointLightDataFromSystem.colors);
}

export const getColorArr3 = (index: number, PointLightDataFromSystem: any) => {
    return getColorArr3Utils(index, PointLightDataFromSystem);
}

export const getIntensity = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.intensities);
}

export const getConstant = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.constants);
}

export const getLinear = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.linears);
}

export const getQuadratic = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.quadratics);
}

export const getRange = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.ranges);
}

export const getColorDataSize = getSpecifyLightColorDataSize;

export const getIntensityDataSize = () => 1;

export const getConstantDataSize = () => 1;

export const getLinearDataSize = () => 1;

export const getQuadraticDataSize = () => 1;

export const getRangeDataSize = () => 1;

export const createTypeArrays = (buffer: any, count: number, PointLightDataFromSystem: any) => {
    var offset = 0;

    PointLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    PointLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getIntensityDataSize();

    PointLightDataFromSystem.constants = new Float32Array(buffer, offset, count * getConstantDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getConstantDataSize();

    PointLightDataFromSystem.linears = new Float32Array(buffer, offset, count * getLinearDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getLinearDataSize();

    PointLightDataFromSystem.quadratics = new Float32Array(buffer, offset, count * getQuadraticDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getQuadraticDataSize();

    PointLightDataFromSystem.ranges = new Float32Array(buffer, offset, count * getRangeDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getRangeDataSize();

    PointLightDataFromSystem.isPositionDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();

    PointLightDataFromSystem.isColorDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();

    PointLightDataFromSystem.isIntensityDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();

    PointLightDataFromSystem.isAttenuationDirtys = new Uint8Array(buffer, offset, count * getDirtyDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getDirtyDataSize();
}

export const isPositionDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isPositionDirtys));
}

export const isColorDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isColorDirtys));
}

export const isIntensityDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isIntensityDirtys));
}

export const isAttenuationDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isAttenuationDirtys));
}

export const cleanPositionDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isPositionDirtys);
}

export const cleanColorDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isColorDirtys);
}

export const cleanIntensityDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isIntensityDirtys);
}

export const cleanAttenuationDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isAttenuationDirtys);
}
