import { getPosition as getSpecifyLightPositionUtils, getRenderData as getSpecifyLightRenderData } from "./specifyLightUtils";

export var getPosition = (index: number, ThreeDTransformDataFromSystem: any, GameObjectDataFromSystem: any, DirectionLightDataFromSystem: any) => {
    return getSpecifyLightPositionUtils(index, ThreeDTransformDataFromSystem, GameObjectDataFromSystem, DirectionLightDataFromSystem);
}

export var getRenderData = (index: number, DirectionLightDataFromSystem: any) => {
    return getSpecifyLightRenderData(index, DirectionLightDataFromSystem);
}
