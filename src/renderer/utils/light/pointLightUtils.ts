import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../common/operateBufferDataUtils";
import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../structure/Color";
import { getColorDataSize as getSpecifyLightColorDataSize } from "./specifyLightUtils";

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

    PointLightDataFromSystem.ranges = new Uint16Array(buffer, offset, count * getRangeDataSize());
    offset += count * Uint16Array.BYTES_PER_ELEMENT * getRangeDataSize();
}
