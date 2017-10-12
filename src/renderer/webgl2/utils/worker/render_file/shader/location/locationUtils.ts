import { createMap } from "../../../../../../../utils/objectUtils";

export const setEmptyLocationMap = (shaderIndex: number, LocationDataFromSystem: any) => {
    LocationDataFromSystem.uniformLocationMap[shaderIndex] = createMap();
}

export const initData = (LocationDataFromSystem: any) => {
    LocationDataFromSystem.uniformLocationMap = createMap();
}
