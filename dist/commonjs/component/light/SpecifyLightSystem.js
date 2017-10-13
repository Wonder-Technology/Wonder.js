"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color_1 = require("../../structure/Color");
var arrayUtils_1 = require("../../utils/arrayUtils");
var GameObjectSystem_1 = require("../../core/entityObject/gameObject/GameObjectSystem");
var ThreeDTransformSystem_1 = require("../transform/ThreeDTransformSystem");
var ComponentSystem_1 = require("../ComponentSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var contractUtils_1 = require("../utils/contractUtils");
var operateBufferDataUtils_1 = require("../utils/operateBufferDataUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var specifyLightUtils_1 = require("../../renderer/utils/worker/render_file/light/specifyLightUtils");
var EventManagerSystem_1 = require("../../event/EventManagerSystem");
exports.create = contract_1.requireCheckFunc(function (light, SpecifyLightData) {
    contractUtils_1.checkIndexShouldEqualCount(SpecifyLightData);
}, function (light, SpecifyLightData) {
    var index = ComponentSystem_1.generateComponentIndex(SpecifyLightData);
    light.index = index;
    SpecifyLightData.count += 1;
    SpecifyLightData.lightMap[index] = light;
    return light;
});
exports.addComponent = function (component, gameObject, SpecifyLightData) {
    ComponentSystem_1.addComponentToGameObjectMap(SpecifyLightData.gameObjectMap, component.index, gameObject);
};
exports.setColor = function (index, color, colors) {
    operateBufferDataUtils_1.setColor3Data(index, color, colors);
};
exports.disposeComponent = contract_1.ensureFunc(function (lastComponentIndex, sourceIndex, SpecifyLightData) {
    contractUtils_1.checkIndexShouldEqualCount(SpecifyLightData);
}, function (sourceIndex, SpecifyLightData) {
    var colorDataSize = specifyLightUtils_1.getColorDataSize(), lastComponentIndex = null;
    SpecifyLightData.count -= 1;
    SpecifyLightData.index -= 1;
    lastComponentIndex = SpecifyLightData.count;
    arrayUtils_1.deleteBySwap(sourceIndex, lastComponentIndex, SpecifyLightData.gameObjectMap);
    ComponentSystem_1.deleteComponentBySwapArray(sourceIndex, lastComponentIndex, SpecifyLightData.lightMap);
    typeArrayUtils_1.deleteBySwapAndReset(sourceIndex * colorDataSize, lastComponentIndex * colorDataSize, SpecifyLightData.colors, colorDataSize, SpecifyLightData.defaultColorArr);
    return lastComponentIndex;
});
exports.initData = function (buffer, SpecifyLightData) {
    SpecifyLightData.index = 0;
    SpecifyLightData.count = 0;
    SpecifyLightData.lightMap = [];
    SpecifyLightData.gameObjectMap = [];
    SpecifyLightData.defaultColorArr = exports.createDefaultColor().toArray3();
    SpecifyLightData.defaultDirty = 0;
    SpecifyLightData.buffer = buffer;
};
exports.createDefaultColor = function () {
    return Color_1.Color.create().setColorByNum("#ffffff");
};
exports.getPosition = function (index, ThreeDTransformData, GameObjectData, SpecifyLightData) {
    return ThreeDTransformSystem_1.getPosition(GameObjectSystem_1.getTransform(exports.getGameObject(index, SpecifyLightData).uid, GameObjectData), ThreeDTransformData);
};
exports.getGameObject = function (index, SpecifyLightData) {
    return ComponentSystem_1.getComponentGameObject(SpecifyLightData.gameObjectMap, index);
};
exports.markDirty = function (index, isDirtys) {
    isDirtys[index] = 0;
};
exports.bindChangePositionEvent = function (SpecifyLightData, state) {
    var eventName = "changePosition";
    var _loop_1 = function (i, count) {
        var _markPositionDirty = function () {
            exports.markDirty(i, SpecifyLightData.isPositionDirtys);
        };
        EventManagerSystem_1.registerEvent(eventName, _markPositionDirty);
    };
    for (var i = 0, count = SpecifyLightData.count; i < count; i++) {
        _loop_1(i, count);
    }
    return state;
};
//# sourceMappingURL=SpecifyLightSystem.js.map