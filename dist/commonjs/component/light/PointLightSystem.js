"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PointLight_1 = require("./PointLight");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var PointLightData_1 = require("./PointLightData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var operateBufferDataUtils_1 = require("../utils/operateBufferDataUtils");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var typeArrayUtils_1 = require("../../utils/typeArrayUtils");
var pointLightUtils_1 = require("../../renderer/utils/light/pointLightUtils");
var Log_1 = require("../../utils/Log");
var bufferUtils_1 = require("../../renderer/utils/light/bufferUtils");
exports.create = contract_1.ensureFunc(function (light, PointLightData) {
    contract_1.it("count should <= max count", function () {
        wonder_expect_js_1.expect(PointLightData.count).lte(DataBufferConfig_1.DataBufferConfig.pointLightDataBufferCount);
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
};
exports.getIntensity = pointLightUtils_1.getIntensity;
exports.setIntensity = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.intensities, index, value);
};
exports.getConstant = pointLightUtils_1.getConstant;
exports.setConstant = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.constants, index, value);
};
exports.getLinear = pointLightUtils_1.getLinear;
exports.setLinear = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.linears, index, value);
};
exports.getQuadratic = pointLightUtils_1.getQuadratic;
exports.setQuadratic = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.quadratics, index, value);
};
exports.getRange = pointLightUtils_1.getRange;
exports.setRange = function (index, value, PointLightData) {
    typeArrayUtils_1.setSingleValue(PointLightData.ranges, index, value);
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
};
exports.addComponent = function (component, gameObject) {
    SpecifyLightSystem_1.addComponent(component, gameObject, PointLightData_1.PointLightData);
};
exports.disposeComponent = function (component) {
    var intensityDataSize = pointLightUtils_1.getIntensityDataSize(), constantDataSize = pointLightUtils_1.getConstantDataSize(), linearDataSize = pointLightUtils_1.getLinearDataSize(), quadraticDataSize = pointLightUtils_1.getQuadraticDataSize(), rangeDataSize = pointLightUtils_1.getRangeDataSize(), sourceIndex = component.index, lastComponentIndex = null;
    lastComponentIndex = SpecifyLightSystem_1.disposeComponent(sourceIndex, PointLightData_1.PointLightData);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * intensityDataSize, lastComponentIndex * intensityDataSize, PointLightData_1.PointLightData.intensities, PointLightData_1.PointLightData.defaultIntensity);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * constantDataSize, lastComponentIndex * constantDataSize, PointLightData_1.PointLightData.constants, PointLightData_1.PointLightData.defaultConstant);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * linearDataSize, lastComponentIndex * linearDataSize, PointLightData_1.PointLightData.linears, PointLightData_1.PointLightData.defaultLinear);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * quadraticDataSize, lastComponentIndex * quadraticDataSize, PointLightData_1.PointLightData.quadratics, PointLightData_1.PointLightData.defaultQuadratic);
    typeArrayUtils_1.deleteOneItemBySwapAndReset(sourceIndex * rangeDataSize, lastComponentIndex * rangeDataSize, PointLightData_1.PointLightData.ranges, PointLightData_1.PointLightData.defaultRange);
};
exports.initData = function (PointLightData) {
    var count = bufferUtils_1.getPointLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * (pointLightUtils_1.getColorDataSize() + pointLightUtils_1.getIntensityDataSize() + pointLightUtils_1.getConstantDataSize() + pointLightUtils_1.getLinearDataSize() + pointLightUtils_1.getQuadraticDataSize() + pointLightUtils_1.getRangeDataSize()), buffer = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size);
    SpecifyLightSystem_1.initData(buffer, PointLightData);
    pointLightUtils_1.createTypeArrays(buffer, count, PointLightData);
    PointLightData.defaultIntensity = 1;
    PointLightData.defaultConstant = 1;
    PointLightData.defaultLinear = 0;
    PointLightData.defaultQuadratic = 0;
    PointLightData.defaultRange = 60000;
    _setDefaultTypeArrData(count, PointLightData);
    PointLightData.lightGLSLDataStructureMemberNameArr = [
        {
            position: "u_pointLights[0].position",
            color: "u_pointLights[0].color",
            intensity: "u_pointLights[0].intensity",
            constant: "u_pointLights[0].constant",
            linear: "u_pointLights[0].linear",
            quadratic: "u_pointLights[0].quadratic",
            range: "u_pointLights[0].range"
        }, {
            position: "u_pointLights[1].position",
            color: "u_pointLights[1].color",
            intensity: "u_pointLights[1].intensity",
            constant: "u_pointLights[1].constant",
            linear: "u_pointLights[1].linear",
            quadratic: "u_pointLights[1].quadratic",
            range: "u_pointLights[1].range"
        }, {
            position: "u_pointLights[2].position",
            color: "u_pointLights[2].color",
            intensity: "u_pointLights[2].intensity",
            constant: "u_pointLights[2].constant",
            linear: "u_pointLights[2].linear",
            quadratic: "u_pointLights[2].quadratic",
            range: "u_pointLights[2].range"
        }, {
            position: "u_pointLights[3].position",
            color: "u_pointLights[3].color",
            intensity: "u_pointLights[3].intensity",
            constant: "u_pointLights[3].constant",
            linear: "u_pointLights[3].linear",
            quadratic: "u_pointLights[3].quadratic",
            range: "u_pointLights[3].range"
        }
    ];
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
//# sourceMappingURL=PointLightSystem.js.map