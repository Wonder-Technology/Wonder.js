import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../../../common/operateBufferDataUtils";
import { getColor3Data } from "../../../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../../../structure/Color";
import {
    getColorDataSize, getConstantDataSize, getDirtyDataSize, getIntensityDataSize,
    getLinearDataSize, getQuadraticDataSize, getRangeDataSize
} from "../../../light/pointLightUtils";
// import { getIsTranslate } from "../../../../../component/transform/isTransformSystem";

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
    return _isDirty(getSingleSizeData(index, PointLightDataFromSystem.isPositionDirtys));
}

export var isColorDirty = (index: number, PointLightDataFromSystem: any) => {
    return _isDirty(getSingleSizeData(index, PointLightDataFromSystem.isColorDirtys));
}

export var isIntensityDirty = (index: number, PointLightDataFromSystem: any) => {
    return _isDirty(getSingleSizeData(index, PointLightDataFromSystem.isIntensityDirtys));
}

export var isAttenuationDirty = (index: number, PointLightDataFromSystem: any) => {
    return _isDirty(getSingleSizeData(index, PointLightDataFromSystem.isAttenuationDirtys));
}

export var cleanPositionDirty = (index: number, PointLightDataFromSystem: any) => {
    _cleanDirty(index, PointLightDataFromSystem.isPositionDirtys);
}

export var cleanColorDirty = (index: number, PointLightDataFromSystem: any) => {
    _cleanDirty(index, PointLightDataFromSystem.isColorDirtys);
}

export var cleanIntensityDirty = (index: number, PointLightDataFromSystem: any) => {
    _cleanDirty(index, PointLightDataFromSystem.isIntensityDirtys);
}

export var cleanAttenuationDirty = (index: number, PointLightDataFromSystem: any) => {
    _cleanDirty(index, PointLightDataFromSystem.isAttenuationDirtys);
}

var _cleanDirty = (index: number, isDirtys:Uint8Array) => {
    isDirtys[index] = 1;
}

var _isDirty = (value) => value === 0;
