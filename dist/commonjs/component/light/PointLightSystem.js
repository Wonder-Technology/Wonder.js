"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointLight_1 = require("./PointLight");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var operateBufferDataUtils_1 = require("../utils/operateBufferDataUtils");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var pointLightUtils_1 = require("../../renderer/utils/worker/render_file/light/pointLightUtils");
var Log_1 = require("../../utils/Log");
var bufferUtils_1 = require("../../renderer/utils/light/bufferUtils");
var DirectorSystem_1 = require("../../core/DirectorSystem");
var DirectorData_1 = require("../../core/DirectorData");
var specifyLightUtils_1 = require("../../renderer/utils/worker/render_file/light/specifyLightUtils");
var pointLightUtils_2 = require("../../renderer/utils/worker/render_file/light/pointLightUtils");
exports.create = contract_1.ensureFunc(function (light, PointLightData) {
    contract_1.it("shouldn't create after Director->init", function () {
        wonder_expect_js_1.expect(DirectorSystem_1.isInit(DirectorData_1.DirectorData)).false;
    });
}, function (PointLightData) {
    var light = new PointLight_1.PointLight();
    light = SpecifyLightSystem_1.create(light, PointLightData);
    return light;
});
exports.getPosition = function (index, ThreeDTransformData, GameObjectData, PointLightData) {
    return SpecifyLightSystem_1.getPosition(index, ThreeDTransformData, GameObjectData, PointLightData);
};
exports.getAllPositionData = function (ThreeDTransformData, GameObjectData, PointLightData) {
    var positionArr = [];
    for (var i = 0, count = PointLightData.count; i < count; i++) {
        positionArr.push(exports.getPosition(i, ThreeDTransformData, GameObjectData, PointLightData).values);
    }
    return positionArr;
};
exports.getColor = function (index, PointLightData) {
    return operateBufferDataUtils_1.getColor3Data(index, PointLightData.colors);
};
exports.getColorArr3 = pointLightUtils_1.getColorArr3;
exports.setColor = function (index, color, PointLightData) {
    SpecifyLightSystem_1.setColor(index, color, PointLightData.colors);
    SpecifyLightSystem_1.markDirty(index, PointLightData.isColorDirtys);
};
exports.getIntensity = pointLightUtils_1.getIntensity;
exports.setIntensity = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.intensities, index, value);
    SpecifyLightSystem_1.markDirty(index, PointLightData.isIntensityDirtys);
};
exports.getConstant = pointLightUtils_1.getConstant;
exports.setConstant = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.constants, index, value);
    SpecifyLightSystem_1.markDirty(index, PointLightData.isAttenuationDirtys);
};
exports.getLinear = pointLightUtils_1.getLinear;
exports.setLinear = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.linears, index, value);
    SpecifyLightSystem_1.markDirty(index, PointLightData.isAttenuationDirtys);
};
exports.getQuadratic = pointLightUtils_1.getQuadratic;
exports.setQuadratic = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.quadratics, index, value);
    SpecifyLightSystem_1.markDirty(index, PointLightData.isAttenuationDirtys);
};
exports.getRange = pointLightUtils_1.getRange;
exports.setRange = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.ranges, index, value);
    SpecifyLightSystem_1.markDirty(index, PointLightData.isAttenuationDirtys);
};
exports.setRangeLevel = function (index, value, PointLightData) {
    switch (value) {
        case 0:
            exports.setRange(index, 7, PointLightData);
            exports.setLinear(index, 0.7, PointLightData);
            exports.setQuadratic(index, 1.8, PointLightData);
            break;
        case 1:
            exports.setRange(index, 13, PointLightData);
            exports.setLinear(index, 0.35, PointLightData);
            exports.setQuadratic(index, 0.44, PointLightData);
            break;
        case 2:
            exports.setRange(index, 20, PointLightData);
            exports.setLinear(index, 0.22, PointLightData);
            exports.setQuadratic(index, 0.20, PointLightData);
            break;
        case 3:
            exports.setRange(index, 32, PointLightData);
            exports.setLinear(index, 0.14, PointLightData);
            exports.setQuadratic(index, 0.07, PointLightData);
            break;
        case 4:
            exports.setRange(index, 50, PointLightData);
            exports.setLinear(index, 0.09, PointLightData);
            exports.setQuadratic(index, 0.032, PointLightData);
            break;
        case 5:
            exports.setRange(index, 65, PointLightData);
            exports.setLinear(index, 0.07, PointLightData);
            exports.setQuadratic(index, 0.017, PointLightData);
            break;
        case 6:
            exports.setRange(index, 100, PointLightData);
            exports.setLinear(index, 0.045, PointLightData);
            exports.setQuadratic(index, 0.0075, PointLightData);
            break;
        case 7:
            exports.setRange(index, 160, PointLightData);
            exports.setLinear(index, 0.027, PointLightData);
            exports.setQuadratic(index, 0.0028, PointLightData);
            break;
        case 8:
            exports.setRange(index, 200, PointLightData);
            exports.setLinear(index, 0.022, PointLightData);
            exports.setQuadratic(index, 0.0019, PointLightData);
            break;
        case 9:
            exports.setRange(index, 325, PointLightData);
            exports.setLinear(index, 0.014, PointLightData);
            exports.setQuadratic(index, 0.0007, PointLightData);
            break;
        case 10:
            exports.setRange(index, 600, PointLightData);
            exports.setLinear(index, 0.007, PointLightData);
            exports.setQuadratic(index, 0.0002, PointLightData);
            break;
        case 11:
            exports.setRange(index, 3250, PointLightData);
            exports.setLinear(index, 0.0014, PointLightData);
            exports.setQuadratic(index, 0.000007, PointLightData);
            break;
        default:
            Log_1.Log.error(true, "over point light range");
            break;
    }
    SpecifyLightSystem_1.markDirty(index, PointLightData.isAttenuationDirtys);
};
exports.initDataHelper = function (PointLightData) {
    var count = bufferUtils_1.getPointLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (pointLightUtils_1.getColorDataSize() + pointLightUtils_1.getIntensityDataSize() + pointLightUtils_1.getConstantDataSize() + pointLightUtils_2.getLinearDataSize() + pointLightUtils_1.getQuadraticDataSize() + pointLightUtils_1.getRangeDataSize()) + Uint8Array.BYTES_PER_ELEMENT * (specifyLightUtils_1.getDirtyDataSize() * 4), buffer = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size);
    SpecifyLightSystem_1.initData(buffer, PointLightData);
    pointLightUtils_1.createTypeArrays(buffer, count, PointLightData);
    PointLightData.defaultIntensity = 1;
    PointLightData.defaultConstant = 1;
    PointLightData.defaultLinear = 0.07;
    PointLightData.defaultQuadratic = 0.017;
    PointLightData.defaultRange = 65;
    _setDefaultTypeArrData(count, PointLightData);
};
var _setDefaultTypeArrData = function (count, PointLightData) {
    var color = SpecifyLightSystem_1.createDefaultColor(), intensity = PointLightData.defaultIntensity, constant = PointLightData.defaultConstant, linear = PointLightData.defaultLinear, quadratic = PointLightData.defaultQuadratic, range = PointLightData.defaultRange;
    for (var i = 0; i < count; i++) {
        exports.setColor(i, color, PointLightData);
        exports.setIntensity(i, intensity, PointLightData);
        exports.setConstant(i, constant, PointLightData);
        exports.setLinear(i, linear, PointLightData);
        exports.setQuadratic(i, quadratic, PointLightData);
        exports.setRange(i, range, PointLightData);
    }
};
exports.disposeComponent = function (component, PointLightData) {
    var intensityDataSize = pointLightUtils_1.getIntensityDataSize(), constantDataSize = pointLightUtils_1.getConstantDataSize(), linearDataSize = pointLightUtils_2.getLinearDataSize(), quadraticDataSize = pointLightUtils_1.getQuadraticDataSize(), rangeDataSize = pointLightUtils_1.getRangeDataSize(), dirtyDataSize = specifyLightUtils_1.getDirtyDataSize(), sourceIndex = component.index, lastComponentIndex = null;
    lastComponentIndex = SpecifyLightSystem_1.disposeComponent(sourceIndex, PointLightData);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, PointLightData.intensities, PointLightData.defaultIntensity);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * constantDataSize, lastComponentIndex * constantDataSize, PointLightData.constants, PointLightData.defaultConstant);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * linearDataSize, lastComponentIndex * linearDataSize, PointLightData.linears, PointLightData.defaultLinear);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * quadraticDataSize, lastComponentIndex * quadraticDataSize, PointLightData.quadratics, PointLightData.defaultQuadratic);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * rangeDataSize, lastComponentIndex * rangeDataSize, PointLightData.ranges, PointLightData.defaultRange);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isPositionDirtys, PointLightData.defaultDirty);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isColorDirtys, PointLightData.defaultDirty);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isIntensityDirtys, PointLightData.defaultDirty);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * dirtyDataSize, lastComponentIndex * dirtyDataSize, PointLightData.isAttenuationDirtys, PointLightData.defaultDirty);
    return lastComponentIndex;
};
exports.init = function (PointLightData, state) {
    return SpecifyLightSystem_1.bindChangePositionEvent(PointLightData, state);
};
exports.isPositionDirty = pointLightUtils_1.isPositionDirty;
exports.isColorDirty = pointLightUtils_1.isColorDirty;
exports.isIntensityDirty = pointLightUtils_1.isIntensityDirty;
exports.isAttenuationDirty = pointLightUtils_1.isAttenuationDirty;
exports.cleanPositionDirty = pointLightUtils_1.cleanPositionDirty;
exports.cleanColorDirty = pointLightUtils_1.cleanColorDirty;
exports.cleanIntensityDirty = pointLightUtils_1.cleanIntensityDirty;
exports.cleanAttenuationDirty = pointLightUtils_1.cleanAttenuationDirty;
//# sourceMappingURL=PointLightSystem.js.map