import { getColorArr3 as getColorArr3Utils, getSingleSizeData } from "../common/operateBufferDataUtils";
import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../structure/Color";
import { getColorDataSize as getSpecifyLightColorDataSize } from "./specifyLightUtils";

export var getColor = (index: number, DirectionLightDataFromSystem: any) => {
    return getColor3Data(index, DirectionLightDataFromSystem.colors);
}

export var getColorArr3 = (index: number, DirectionLightDataFromSystem: any) => {
    return getColorArr3Utils(index, DirectionLightDataFromSystem);
}

export var getIntensity = (index: number, DirectionLightDataFromSystem: any) => {
    return getSingleSizeData(index, DirectionLightDataFromSystem.intensities);
}

export var getColorDataSize = getSpecifyLightColorDataSize;

export var getIntensityDataSize = () => 1;

export var createTypeArrays = (buffer: any, count: number, DirectionLightDataFromSystem: any) => {
    var offset = 0;

    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
}
