"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AmbientLight_1 = require("./AmbientLight");
var SpecifyLightSystem_1 = require("./SpecifyLightSystem");
var AmbientLightData_1 = require("./AmbientLightData");
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayBufferUtils_1 = require("../../utils/arrayBufferUtils");
var bufferUtils_1 = require("../../renderer/utils/light/bufferUtils");
var ambientLightUtils_1 = require("../../renderer/utils/worker/render_file/light/ambientLightUtils");
var ambientLightUtils_2 = require("../../renderer/utils/light/ambientLightUtils");
var specifyLightUtils_1 = require("../../renderer/utils/worker/render_file/light/specifyLightUtils");
var DirectorData_1 = require("../../core/DirectorData");
var DirectorSystem_1 = require("../../core/DirectorSystem");
exports.create = contract_1.ensureFunc(function (light, AmbientLightData) {
    contract_1.it("shouldn't create after Director->init", function () {
        wonder_expect_js_1.expect(DirectorSystem_1.isInit(DirectorData_1.DirectorData)).false;
    });
}, function (AmbientLightData) {
    var light = new AmbientLight_1.AmbientLight();
    light = SpecifyLightSystem_1.create(light, AmbientLightData);
    return light;
});
exports.getColor = ambientLightUtils_2.getColor;
exports.getColorArr3 = ambientLightUtils_1.getColorArr3;
exports.setColor = function (index, color, AmbientLightData) {
    SpecifyLightSystem_1.setColor(index, color, AmbientLightData.colors);
    SpecifyLightSystem_1.markDirty(index, AmbientLightData.isColorDirtys);
};
exports.addComponent = function (component, gameObject) {
    SpecifyLightSystem_1.addComponent(component, gameObject, AmbientLightData_1.AmbientLightData);
};
exports.disposeComponent = contract_1.requireCheckFunc(function () {
    contract_1.it("should only has 1 ambient light", function () {
        wonder_expect_js_1.expect(AmbientLightData_1.AmbientLightData.count).equal(1);
    });
}, function (component) {
    var sourceIndex = component.index;
    SpecifyLightSystem_1.disposeComponent(component.index, AmbientLightData_1.AmbientLightData);
    AmbientLightData_1.AmbientLightData.isColorDirtys[0] = AmbientLightData_1.AmbientLightData.defaultDirty;
});
exports.initData = function (AmbientLightData) {
    var count = bufferUtils_1.getAmbientLightBufferCount(), size = Float32Array.BYTES_PER_ELEMENT * ambientLightUtils_1.getColorDataSize() + Uint8Array.BYTES_PER_ELEMENT * specifyLightUtils_1.getDirtyDataSize(), buffer = null;
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
exports.isColorDirty = ambientLightUtils_1.isColorDirty;
exports.cleanColorDirty = ambientLightUtils_1.cleanColorDirty;
//# sourceMappingURL=AmbientLightSystem.js.map