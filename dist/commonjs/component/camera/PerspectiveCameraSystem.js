"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var objectUtils_1 = require("../../utils/objectUtils");
var CameraControllerSystem_1 = require("./CameraControllerSystem");
var Matrix4_1 = require("../../math/Matrix4");
var CameraSystem_1 = require("./CameraSystem");
exports.updateProjectionMatrix = contract_1.requireCheckFunc(function (index, PerspectiveCameraData, CameraData) {
    contract_1.it("fovy should exist", function () {
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(PerspectiveCameraData.fovyMap[index])).true;
    });
    contract_1.it("aspect should exist", function () {
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(PerspectiveCameraData.aspectMap[index])).true;
    });
    contract_1.it("near should exist", function () {
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(CameraData.nearMap[index])).true;
    });
    contract_1.it("far should exist", function () {
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(CameraData.farMap[index])).true;
    });
}, function (index, PerspectiveCameraData, CameraData) {
    CameraSystem_1.setPMatrix(index, _getOrCreatePMatrix(index, CameraData).setPerspective(PerspectiveCameraData.fovyMap[index], PerspectiveCameraData.aspectMap[index], CameraData.nearMap[index], CameraData.farMap[index]), CameraData);
});
var _getOrCreatePMatrix = function (index, CameraData) {
    var mat = CameraData.pMatrixMap[index];
    if (objectUtils_1.isValidMapValue(mat)) {
        return mat;
    }
    return Matrix4_1.Matrix4.create();
};
exports.getFovy = function (index, PerspectiveCameraData) {
    return PerspectiveCameraData.fovyMap[index];
};
exports.setFovy = function (index, fovy, PerspectiveCameraData, CameraControllerData) {
    PerspectiveCameraData.fovyMap[index] = fovy;
    CameraControllerSystem_1.addToDirtyList(index, CameraControllerData);
};
exports.getAspect = function (index, PerspectiveCameraData) {
    return PerspectiveCameraData.aspectMap[index];
};
exports.setAspect = function (index, aspect, PerspectiveCameraData, CameraControllerData) {
    PerspectiveCameraData.aspectMap[index] = aspect;
    CameraControllerSystem_1.addToDirtyList(index, CameraControllerData);
};
exports.dispose = function (index, PerspectiveCameraData) {
    objectUtils_1.deleteVal(index, PerspectiveCameraData.fovyMap);
    objectUtils_1.deleteVal(index, PerspectiveCameraData.aspectMap);
};
exports.initData = function (PerspectiveCameraData) {
    PerspectiveCameraData.fovyMap = objectUtils_1.createMap();
    PerspectiveCameraData.aspectMap = objectUtils_1.createMap();
};
//# sourceMappingURL=PerspectiveCameraSystem.js.map