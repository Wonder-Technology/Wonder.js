"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DirectionLight_1 = require("./DirectionLight");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var DirectionLightData_1 = require("./DirectionLightData");
var directionLightUtils_1 = require("../../renderer/utils/light/directionLightUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var operateBufferDataUtils_1 = require("../utils/operateBufferDataUtils");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var bufferUtils_1 = require("../../renderer/utils/light/bufferUtils");
exports.create = contract_1.ensureFunc(function (light, DirectionLightData) {
    contract_1.it("count should <= max count", function () {
        wonder_expect_js_1.expect(DirectionLightData.count).lte(DataBufferConfig_1.DataBufferConfig.directionLightDataBufferCount);
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
};
exports.getIntensity = directionLightUtils_1.getIntensity;
exports.setIntensity = function (index, intensity, DirectionLightData) {
    var size = directionLightUtils_1.getIntensityDataSize(), i = index * size;
    typeArrayUtils_1.setTypeArrayValue(DirectionLightData.intensities, i, intensity);
};
exports.addComponent = function (component, gameObject) {
    SpecifyLightSystem_1.addComponent(component, gameObject, DirectionLightData_1.DirectionLightData);
};
exports.disposeComponent = function (component) {
    var intensityDataSize = directionLightUtils_1.getIntensityDataSize(), sourceIndex = component.index, lastComponentIndex = null;
    lastComponentIndex = SpecifyLightSystem_1.disposeComponent(sourceIndex, DirectionLightData_1.DirectionLightData);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, DirectionLightData_1.DirectionLightData.intensities, DirectionLightData_1.DirectionLightData.defaultIntensity);
};
exports.initData = function (DirectionLightData) {
    var count = bufferUtils_1.getDirectionLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (directionLightUtils_1.getColorDataSize() + directionLightUtils_1.getIntensityDataSize()), buffer = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size);
    SpecifyLightSystem_1.initData(buffer, DirectionLightData);
    directionLightUtils_1.createTypeArrays(buffer, count, DirectionLightData);
    DirectionLightData.defaultIntensity = 1;
    _setDefaultTypeArrData(count, DirectionLightData);
    DirectionLightData.lightGLSLDataStructureMemberNameArr = [
        {
            position: "u_directionLights[0].position",
            color: "u_directionLights[0].color",
            intensity: "u_directionLights[0].intensity"
        }, {
            position: "u_directionLights[1].position",
            color: "u_directionLights[1].color",
            intensity: "u_directionLights[1].intensity"
        }, {
            position: "u_directionLights[2].position",
            color: "u_directionLights[2].color",
            intensity: "u_directionLights[2].intensity"
        }, {
            position: "u_directionLights[3].position",
            color: "u_directionLights[3].color",
            intensity: "u_directionLights[3].intensity"
        }
    ];
};
var _setDefaultTypeArrData = function (count, DirectionLightData) {
    var color = SpecifyLightSystem_1.createDefaultColor(), intensity = DirectionLightData.defaultIntensity;
    for (var i = 0; i < count; i++) {
        exports.setColor(i, color, DirectionLightData);
        exports.setIntensity(i, intensity, DirectionLightData);
    }
};
//# sourceMappingURL=DirectionLightSystem.js.map