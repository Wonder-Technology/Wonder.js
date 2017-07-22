"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmbientLight_1 = require("./AmbientLight");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var AmbientLightData_1 = require("./AmbientLightData");
var ambientLightUtils_1 = require("../../renderer/utils/light/ambientLightUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var DataBufferConfig_1 = require("../../config/DataBufferConfig");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var bufferUtils_1 = require("../../renderer/utils/light/bufferUtils");
exports.create = contract_1.ensureFunc(function (light, AmbientLightData) {
    contract_1.it("count should <= max count", function () {
        wonder_expect_js_1.expect(AmbientLightData.count).lte(DataBufferConfig_1.DataBufferConfig.ambientLightDataBufferCount);
    });
}, function (AmbientLightData) {
    var light = new AmbientLight_1.AmbientLight();
    light = SpecifyLightSystem_1.create(light, AmbientLightData);
    return light;
});
exports.getColor = ambientLightUtils_1.getColor;
exports.getColorArr3 = ambientLightUtils_1.getColorArr3;
exports.setColor = function (index, color, AmbientLightData) {
    SpecifyLightSystem_1.setColor(index, color, AmbientLightData.colors);
};
exports.addComponent = function (component, gameObject) {
    SpecifyLightSystem_1.addComponent(component, gameObject, AmbientLightData_1.AmbientLightData);
};
exports.disposeComponent = function (component) {
    SpecifyLightSystem_1.disposeComponent(component.index, AmbientLightData_1.AmbientLightData);
};
exports.initData = function (AmbientLightData) {
    var count = bufferUtils_1.getAmbientLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * ambientLightUtils_1.getColorDataSize(), buffer = null;
    buffer = arrayBufferUtils_1.createSharedArrayBufferOrArrayBuffer(count * size);
    SpecifyLightSystem_1.initData(buffer, AmbientLightData);
    ambientLightUtils_1.createTypeArrays(buffer, count, AmbientLightData);
    _setDefaultTypeArrData(count, AmbientLightData);
};
var _setDefaultTypeArrData = function (count, AmbientLightData) {
    var color = SpecifyLightSystem_1.createDefaultColor();
    for (var i = 0; i < count; i++) {
        exports.setColor(i, color, AmbientLightData);
    }
};
//# sourceMappingURL=AmbientLightSystem.js.map