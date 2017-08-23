"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionLight_1 = require("./DirectionLight");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var directionLightUtils_1 = require("../../renderer/utils/worker/render_file/light/directionLightUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var operateBufferDataUtils_1 = require("../utils/operateBufferDataUtils");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var bufferUtils_1 = require("../../renderer/utils/light/bufferUtils");
var directionLightUtils_2 = require("../../renderer/utils/light/directionLightUtils");
var specifyLightUtils_1 = require("../../renderer/utils/worker/render_file/light/specifyLightUtils");
var DirectorSystem_1 = require("../../core/DirectorSystem");
var DirectorData_1 = require("../../core/DirectorData");
var wonder_expect_js_1 = require("wonder-expect.js");
exports.create = contract_1.ensureFunc(function (light, DirectionLightData) {
    contract_1.it("shouldn't create after Director->init", function () {
        wonder_expect_js_1.expect(DirectorSystem_1.isInit(DirectorData_1.DirectorData)).false;
    });
}, function (DirectionLightData) {
    var light = new DirectionLight_1.DirectionLight();
    light = SpecifyLightSystem_1.create(light, DirectionLightData);
    return light;
});
exports.getPosition = function (index, ThreeDTransformData, GameObjectData, DirectionLightData) {
    return SpecifyLightSystem_1.getPosition(index, ThreeDTransformData, GameObjectData, DirectionLightData);
};
exports.getAllPositionData = function (ThreeDTransformData, GameObjectData, DirectionLightData) {
    var positionArr = [];
    for (var i = 0, count = DirectionLightData.count; i < count; i++) {
        positionArr.push(exports.getPosition(i, ThreeDTransformData, GameObjectData, DirectionLightData).values);
    }
    return positionArr;
};
exports.getColor = function (index, DirectionLightData) {
    return operateBufferDataUtils_1.getColor3Data(index, DirectionLightData.colors);
};
exports.getColorArr3 = directionLightUtils_1.getColorArr3;
exports.setColor = function (index, color, DirectionLightData) {
    SpecifyLightSystem_1.setColor(index, color, DirectionLightData.colors);
    SpecifyLightSystem_1.markDirty(index, DirectionLightData.isColorDirtys);
};
exports.getIntensity = directionLightUtils_1.getIntensity;
exports.setIntensity = function (index, intensity, DirectionLightData) {
    var size = directionLightUtils_2.getIntensityDataSize(), i = index * size;
    typeArrayUtils_1.setTypeArrayValue(DirectionLightData.intensities, i, intensity);
    SpecifyLightSystem_1.markDirty(index, DirectionLightData.isIntensityDirtys);
};
exports.disposeComponent = function (component, DirectionLightData) {
    var intensityDataSize = directionLightUtils_2.getIntensityDataSize(), dirtyDataSize = specifyLightUtils_1.getDirtyDataSize(), sourceIndex = component.index, lastComponentIndex = null;
    lastComponentIndex = SpecifyLightSystem_1.disposeComponent(sourceIndex, DirectionLightData);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, DirectionLightData.intensities, DirectionLightData.defaultIntensity);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isPositionDirtys, DirectionLightData.defaultDirty);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isColorDirtys, DirectionLightData.defaultDirty);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, DirectionLightData.isIntensityDirtys, DirectionLightData.defaultDirty);
};
exports.initDataHelper = function (DirectionLightData) {
    var count = bufferUtils_1.getDirectionLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (directionLightUtils_2.getColorDataSize() + directionLightUtils_2.getIntensityDataSize()) + Uint8Array.BYTES_PER_ELEMENT + (specifyLightUtils_1.getDirtyDataSize() * 3), buffer = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size);
    SpecifyLightSystem_1.initData(buffer, DirectionLightData);
    directionLightUtils_1.createTypeArrays(buffer, count, DirectionLightData);
    DirectionLightData.defaultIntensity = 1;
    _setDefaultTypeArrData(count, DirectionLightData);
};
var _setDefaultTypeArrData = function (count, DirectionLightData) {
    var color = SpecifyLightSystem_1.createDefaultColor(), intensity = DirectionLightData.defaultIntensity;
    for (var i = 0; i < count; i++) {
        exports.setColor(i, color, DirectionLightData);
        exports.setIntensity(i, intensity, DirectionLightData);
    }
};
exports.init = function (DirectionLightData, state) {
    return SpecifyLightSystem_1.bindChangePositionEvent(DirectionLightData, state);
};
exports.isPositionDirty = directionLightUtils_1.isPositionDirty;
exports.isColorDirty = directionLightUtils_1.isColorDirty;
exports.isIntensityDirty = directionLightUtils_1.isIntensityDirty;
exports.cleanPositionDirty = directionLightUtils_1.cleanPositionDirty;
exports.cleanColorDirty = directionLightUtils_1.cleanColorDirty;
exports.cleanIntensityDirty = directionLightUtils_1.cleanIntensityDirty;
//# sourceMappingURL=DirectionLightSystem.js.map