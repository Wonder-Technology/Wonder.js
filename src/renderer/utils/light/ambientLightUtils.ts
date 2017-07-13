import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../structure/Color";

export var getColor = (index: number, AmbientLightDataFromSystem: any) => {
    return getColor3Data(index, AmbientLightDataFromSystem.colors);
}

export var getColorDataSize = () => 3;

export var createTypeArrays = (buffer: any, count: number, AmbientLightDataFromSystem: any) => {
    AmbientLightDataFromSystem.colors = new Float32Array(buffer, 0, count * getColorDataSize());
}
