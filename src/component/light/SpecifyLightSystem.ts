import { Color } from "../../structure/Color";
import { deleteBySwap } from "../../utils/arrayUtils";
import { getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { getPosition as getThreeDTransformPosition } from "../transform/ThreeDTransformSystem";
import {
    addComponentToGameObjectMap, deleteComponentBySwapArray, generateComponentIndex, getComponentGameObject
} from "../ComponentSystem";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { Light } from "./Light";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { GameObject } from "../../core/entityObject/gameObject/GameObject";
import { setColor3Data } from "../utils/operateBufferDataUtils";
import { IUIDEntity } from "../../core/entityObject/gameObject/IUIDEntity";
import { deleteBySwapAndReset } from "../../utils/typeArrayUtils";
import { getColorDataSize } from "../../renderer/utils/light/specifyLightUtils";

export var create = requireCheckFunc((light: Light, SpecifyLightData: any) => {
    checkIndexShouldEqualCount(SpecifyLightData);
}, (light: Light, SpecifyLightData: any) => {
    var index = generateComponentIndex(SpecifyLightData);

    light.index = index;

    SpecifyLightData.count += 1;

    SpecifyLightData.lightMap[index] = light;

    return light;
})

export var addComponent = (component: Light, gameObject: GameObject, SpecifyLightData: any) => {
    addComponentToGameObjectMap(SpecifyLightData.gameObjectMap, component.index, gameObject);
}

// export var getColorArr3 = (index: number, SpecifyLightData: any) => {
//     return SpecifyLightData.renderDataMap[index].colorArr;
// }

export var setColor = (index: number, color: Color, colors: Float32Array) => {
    setColor3Data(index, color, colors);
}

export var disposeComponent = ensureFunc((returnVal, sourceIndex: number, SpecifyLightData: any) => {
    checkIndexShouldEqualCount(SpecifyLightData);
}, (sourceIndex: number, SpecifyLightData: any) => {
    var colorDataSize = getColorDataSize(),
        lastComponentIndex: number = null;

    SpecifyLightData.count -= 1;
    SpecifyLightData.index -= 1;

    lastComponentIndex = SpecifyLightData.count;

    deleteBySwap(sourceIndex, lastComponentIndex, SpecifyLightData.gameObjectMap);

    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, SpecifyLightData.lightMap);

    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, SpecifyLightData.colors, colorDataSize, SpecifyLightData.defaultColorArr);

    return lastComponentIndex;
})

export var initData = (buffer, SpecifyLightData: any) => {
    SpecifyLightData.index = 0;
    SpecifyLightData.count = 0;

    SpecifyLightData.lightMap = [];
    SpecifyLightData.gameObjectMap = [];

    SpecifyLightData.defaultColorArr = createDefaultColor().toArray3();

    SpecifyLightData.buffer = buffer;
}

export var createDefaultColor = () => {
    return Color.create().setColorByNum("#ffffff");
}

export var getPosition = (index: number, ThreeDTransformData: any, GameObjectData: any, SpecifyLightData: any) => {
    return getThreeDTransformPosition(getTransform(getGameObject(index, SpecifyLightData), GameObjectData), ThreeDTransformData);
}

export var getGameObject = (index: number, SpecifyLightData: any) => {
    return getComponentGameObject(SpecifyLightData.gameObjectMap, index);
}

