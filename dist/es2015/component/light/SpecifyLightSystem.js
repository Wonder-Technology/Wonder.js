import { Color } from "../../structure/Color";
import { deleteBySwap } from "../../utils/arrayUtils";
import { getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { getPosition as getThreeDTransformPosition } from "../transform/ThreeDTransformSystem";
import { addComponentToGameObjectMap, deleteComponentBySwapArray, generateComponentIndex, getComponentGameObject } from "../ComponentSystem";
import { ensureFunc, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { checkIndexShouldEqualCount } from "../utils/contractUtils";
import { setColor3Data } from "../utils/operateBufferDataUtils";
import { deleteBySwapAndReset } from "../../utils/typeArrayUtils";
import { getColorDataSize } from "../../renderer/utils/worker/render_file/light/specifyLightUtils";
import { registerEvent } from "../../event/EventManagerSystem";
export var create = requireCheckFunc(function (light, SpecifyLightData) {
    checkIndexShouldEqualCount(SpecifyLightData);
}, function (light, SpecifyLightData) {
    var index = generateComponentIndex(SpecifyLightData);
    light.index = index;
    SpecifyLightData.count += 1;
    SpecifyLightData.lightMap[index] = light;
    return light;
});
export var addComponent = function (component, gameObject, SpecifyLightData) {
    addComponentToGameObjectMap(SpecifyLightData.gameObjectMap, component.index, gameObject);
};
export var setColor = function (index, color, colors) {
    setColor3Data(index, color, colors);
};
export var disposeComponent = ensureFunc(function (lastComponentIndex, sourceIndex, SpecifyLightData) {
    checkIndexShouldEqualCount(SpecifyLightData);
}, function (sourceIndex, SpecifyLightData) {
    var colorDataSize = getColorDataSize(), lastComponentIndex = null;
    SpecifyLightData.count -= 1;
    SpecifyLightData.index -= 1;
    lastComponentIndex = SpecifyLightData.count;
    deleteBySwap(sourceIndex, lastComponentIndex, SpecifyLightData.gameObjectMap);
    deleteComponentBySwapArray(sourceIndex, lastComponentIndex, SpecifyLightData.lightMap);
    deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, SpecifyLightData.colors, colorDataSize, SpecifyLightData.defaultColorArr);
    return lastComponentIndex;
});
export var initData = function (buffer, SpecifyLightData) {
    SpecifyLightData.index = 0;
    SpecifyLightData.count = 0;
    SpecifyLightData.lightMap = [];
    SpecifyLightData.gameObjectMap = [];
    SpecifyLightData.defaultColorArr = createDefaultColor().toArray3();
    SpecifyLightData.defaultDirty = 0;
    SpecifyLightData.buffer = buffer;
};
export var createDefaultColor = function () {
    return Color.create().setColorByNum("#ffffff");
};
export var getPosition = function (index, ThreeDTransformData, GameObjectData, SpecifyLightData) {
    return getThreeDTransformPosition(getTransform(getGameObject(index, SpecifyLightData), GameObjectData), ThreeDTransformData);
};
export var getGameObject = function (index, SpecifyLightData) {
    return getComponentGameObject(SpecifyLightData.gameObjectMap, index);
};
export var markDirty = function (index, isDirtys) {
    isDirtys[index] = 0;
};
export var bindChangePositionEvent = function (SpecifyLightData, state) {
    var eventName = "changePosition";
    var _loop_1 = function (i, count) {
        _markPositionDirty = function () {
            markDirty(i, SpecifyLightData.isPositionDirtys);
        };
        registerEvent(eventName, _markPositionDirty);
    };
    var _markPositionDirty;
    for (var i = 0, count = SpecifyLightData.count; i < count; i++) {
        _loop_1(i, count);
    }
    return state;
};
//# sourceMappingURL=SpecifyLightSystem.js.map