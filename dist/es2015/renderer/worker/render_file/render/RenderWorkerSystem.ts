export var getDirectionLightPosition = (index: number, DirectionLightDataFromSystem: any) => {
    return _getLightPosition(index, DirectionLightDataFromSystem);
}

export var getPointLightPosition = (index: number, PointLightDataFromSystem: any) => {
    return _getLightPosition(index, PointLightDataFromSystem);
}

var _getLightPosition = (index: number, LightDataFromSystem: any) => {
    return LightDataFromSystem.positionArr[index];
}

