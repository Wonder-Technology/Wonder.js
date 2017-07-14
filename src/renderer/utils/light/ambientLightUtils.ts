import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../structure/Color";
import { getColorArr3 as getColorArr3Utils } from "../common/operateBufferDataUtils";

export var getColor = (index: number, AmbientLightDataFromSystem: any) => {
    return getColor3Data(index, AmbientLightDataFromSystem.colors);
}

export var getColorArr3 = (index: number, AmbientLightDataFromSystem: any) => {
    return getColorArr3Utils(index, AmbientLightDataFromSystem);
}

export var getColorDataSize = () => 3;

export var createTypeArrays = (buffer: any, count: number, AmbientLightDataFromSystem: any) => {
    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * getColorDataSize());
}
