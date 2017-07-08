import { Color } from "../../structure/Color";
import { deleteBySwap } from "../../utils/arrayUtils";
import { getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { getPosition as getThreeDTransformPosition } from "../transform/ThreeDTransformSystem";
import {
    addComponentToGameObjectMap, deleteComponentBySwapArray, generateComponentIndex,
    getComponentGameObject
} from "../ComponentSystem";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Light } from "./Light";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";

export var create = requireCheckFunc((light: Light, SpecifyLightData: any) => {
    checkIndexShouldEqualCount(SpecifyLightData);
}, (light: Light, SpecifyLightData: any) => {
    var index = generateComponentIndex(SpecifyLightData);

    light.index = index;

    SpecifyLightData.count += 1;

    SpecifyLightData.lightMap[index] = light;

    return light;
})

export var addComponent = (component: Light, gameObject: GameObject, SpecifyLightData:any) => {
    addComponentToGameObjectMap(SpecifyLightData.gameObjectMap, component.index, gameObject);
}

export var setColor = (index: number, color: Color, SpecifyLightData: any) => {
    SpecifyLightData.renderDataMap[index].colorArr = [color.r, color.g, color.b];
}

export var getRenderData = (index: number, SpecifyLightData: any) => {
    return SpecifyLightData.renderDataMap[index];
}

//todo move to utils
export var getPosition = (index: number, ThreeDTransformData:any, GameObjectData:any, SpecifyLightData: any) => {
    return getThreeDTransformPosition(getTransform(getGameObject(index, SpecifyLightData), GameObjectData), ThreeDTransformData);
}

export var getGameObject = (index: number, SpecifyLightData: any) => {
    return getComponentGameObject(SpecifyLightData.gameObjectMap, index);
}

export var disposeComponent = ensureFunc((returnVal, sourceIndex:number, lastComponentIndex:number, SpecifyLightData:any) => {
    checkIndexShouldEqualCount(SpecifyLightData);
}, (sourceIndex:number, lastComponentIndex:number, SpecifyLightData:any) => {
    SpecifyLightData.count -= 1;
    SpecifyLightData.index -= 1;

    deleteBySwap(sourceIndex, lastComponentIndex, SpecifyLightData.gameObjectMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, SpecifyLightData.lightMap);

    deleteBySwap(sourceIndex, lastComponentIndex, SpecifyLightData.renderDataMap);
})

export var initData = (SpecifyLightData: any) => {
    SpecifyLightData.index = 0;
    SpecifyLightData.count = 0;

    SpecifyLightData.lightMap = [];
    SpecifyLightData.gameObjectMap = [];

    SpecifyLightData.renderDataMap = [];

    SpecifyLightData.defaultColorArr = _createDefaultColorArr();
}

var _createDefaultColorArr = () => {
    var color = Color.create().setColorByNum("#ffffff");

    return [color.r, color.g, color.b];
}
