import { createDefaultColorArr, getGameObject } from "./LightSystem";
import { Color } from "../../structure/Color";
import { deleteBySwap } from "../../utils/arrayUtils";
import { getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { getPosition as getThreeDTransformPosition } from "../transform/ThreeDTransformSystem";

export var setColor = (index: number, color: Color, SpecifyLightData: any) => {
    SpecifyLightData[index].colorArr = [color.r, color.g, color.b];
}

export var getRenderData = (index: number, SpecifyLightData: any) => {
    return SpecifyLightData.renderDataMap[index];
}

//todo move to utils
export var getPosition = (index: number, ThreeDTransformData:any, GameObjectData:any, SpecifyLightData: any) => {
    return getThreeDTransformPosition(getTransform(getGameObject(index, SpecifyLightData), GameObjectData), ThreeDTransformData);
}

export var disposeComponent = (sourceIndex:number, lastComponentIndex:number, renderDataMap:Array<any>) => {
    deleteBySwap(sourceIndex, lastComponentIndex, renderDataMap);
}

export var initData = (SpecifyLightData: any) => {
    SpecifyLightData.renderDataMap = [];

    SpecifyLightData.defaultColorArr = createDefaultColorArr();
}

