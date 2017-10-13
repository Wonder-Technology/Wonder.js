export const getDirectionLightPosition = (index: number, DirectionLightDataFromSystem: any) => {
    return _getLightPosition(index, DirectionLightDataFromSystem);
}

export const getPointLightPosition = (index: number, PointLightDataFromSystem: any) => {
    return _getLightPosition(index, PointLightDataFromSystem);
}

const _getLightPosition =(index: number, LightDataFromSystem: any) => {
    return LightDataFromSystem.positionArr[index];
}

