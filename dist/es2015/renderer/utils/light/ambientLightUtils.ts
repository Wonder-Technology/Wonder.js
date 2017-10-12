import { getColor3Data } from "../../../component/utils/operateBufferDataUtils";
import { Color } from "../../../structure/Color";

export const getColor = (index: number, AmbientLightDataFromSystem: any) => {
    return getColor3Data(index, AmbientLightDataFromSystem.colors);
}
