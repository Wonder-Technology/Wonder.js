import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { getColor3Data } from "../../../../../component/utils/operateBufferDataUtils";
import { cleanDirty, getDirtyDataSize, isDirty } from "./specifyLightUtils";
import { getColorDataSize as getSpecifyLightColorDataSize } from "./specifyLightUtils";
import { Color } from "../../../../../structure/Color";

export var getColor = (index: number, PointLightDataFromSystem: any) => {
    return getColor3Data(index, PointLightDataFromSystem.colors);
}

export var getColorArr3 = (index: number, PointLightDataFromSystem: any) => {
    return getColorArr3Utils(index, PointLightDataFromSystem);
}

export var getIntensity = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.intensities);
}

export var getConstant = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.constants);
}

export var getLinear = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.linears);
}

export var getQuadratic = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.quadratics);
}

export var getRange = (index: number, PointLightDataFromSystem: any) => {
    return getSingleSizeData(index, PointLightDataFromSystem.ranges);
}

export var getColorDataSize = getSpecifyLightColorDataSize;

export var getIntensityDataSize = () => 1;

export var getConstantDataSize = () => 1;

export var getLinearDataSize = () => 1;

export var getQuadraticDataSize = () => 1;

export var getRangeDataSize = () => 1;

export var createTypeArrays = (buffer: any, count: number, PointLightDataFromSystem: any) => {
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

export var isPositionDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isPositionDirtys));
}

export var isColorDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isColorDirtys));
}

export var isIntensityDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isIntensityDirtys));
}

export var isAttenuationDirty = (index: number, PointLightDataFromSystem: any) => {
    return isDirty(getSingleSizeData(index, PointLightDataFromSystem.isAttenuationDirtys));
}

export var cleanPositionDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isPositionDirtys);
}

export var cleanColorDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isColorDirtys);
}

export var cleanIntensityDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isIntensityDirtys);
}

export var cleanAttenuationDirty = (index: number, PointLightDataFromSystem: any) => {
    cleanDirty(index, PointLightDataFromSystem.isAttenuationDirtys);
}
