import { getPosition as getThreeDTransformPosition } from "../../../component/transform/ThreeDTransformSystem";
import { getTransform } from "../../../core/entityObject/gameObject/GameObjectSystem";
import { getComponentGameObject } from "../../../component/ComponentSystem";
import { GameObject } from "../../../core/entityObject/gameObject/GameObject";

export var getPosition = (index: number, ThreeDTransformDataFromSystem:any, GameObjectDataFromSystem:any, SpecifyLightDataFromSystem: any) => {
    return getThreeDTransformPosition(getTransform(getGameObject(index, SpecifyLightDataFromSystem), GameObjectDataFromSystem), ThreeDTransformDataFromSystem);
}

export var getGameObject = (index: number, SpecifyLightDataFromSystem: any) => {
    return getComponentGameObject(SpecifyLightDataFromSystem.gameObjectMap, index);
}

export var getRenderData = (index: number, SpecifyLightDataFromSystem: any) => {
    return SpecifyLightDataFromSystem.renderDataMap[index];
}
