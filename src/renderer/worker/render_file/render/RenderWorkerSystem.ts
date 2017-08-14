import { DrawDataMap } from "../../../type/utilsType";

export var getDirectionLightPosition = (index: number, drawDataMap: DrawDataMap) => {
    return _getLightPosition(index, drawDataMap.DirectionLightDataFromSystem);
}

export var getPointLightPosition = (index: number, drawDataMap: DrawDataMap) => {
    return _getLightPosition(index, drawDataMap.PointLightDataFromSystem);
}

var _getLightPosition = (index: number, LightDataFromSystem: any) => {
    return LightDataFromSystem.positionArr[index];
}

