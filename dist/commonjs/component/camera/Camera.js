"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraSystem_1 = require("./CameraSystem");
var CameraControllerData_1 = require("./CameraControllerData");
var CameraData_1 = require("./CameraData");
exports.getCameraPMatrix = function (cameraController) {
    return CameraSystem_1.getPMatrix(cameraController.index, CameraData_1.CameraData);
};
exports.getCameraNear = function (cameraController) {
    return CameraSystem_1.getNear(cameraController.index, CameraData_1.CameraData);
};
exports.setCameraNear = function (cameraController, near) {
    CameraSystem_1.setNear(cameraController.index, near, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData);
};
exports.getCameraFar = function (cameraController) {
    return CameraSystem_1.getFar(cameraController.index, CameraData_1.CameraData);
};
exports.setCameraFar = function (cameraController, far) {
    CameraSystem_1.setFar(cameraController.index, far, CameraControllerData_1.CameraControllerData, CameraData_1.CameraData);
};
//# sourceMappingURL=Camera.js.map