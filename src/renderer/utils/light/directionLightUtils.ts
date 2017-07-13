import { getSingleSizeData } from "../common/operateBufferDataUtils";
import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../structure/Color";

export var getColor = (index: number, DirectionLightDataFromSystem: any) => {
    return getColor3Data(index, DirectionLightDataFromSystem.colors);
}

export var getIntensity = (index: number, DirectionLightDataFromSystem: any) => {
    return getSingleSizeData(index, DirectionLightDataFromSystem.intensities);
}

export var getColorDataSize = () => 3;

export var getIntensityDataSize = () => 1;

export var createTypeArrays = (buffer: any, count: number, DirectionLightDataFromSystem: any) => {
    var offset = 0;

    DirectionLightDataFromSystem.colors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    DirectionLightDataFromSystem.intensities = new Float32Array(buffer, offset, count * getIntensityDataSize());
}
