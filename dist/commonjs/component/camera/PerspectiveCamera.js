"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PerspectiveCameraSystem_1 = require("./PerspectiveCameraSystem");
var PerspectiveCameraData_1 = require("./PerspectiveCameraData");
var CameraControllerData_1 = require("./CameraControllerData");
exports.getPerspectiveCameraFovy = function (cameraController) {
    return PerspectiveCameraSystem_1.getFovy(cameraController.index, PerspectiveCameraData_1.PerspectiveCameraData);
};
exports.setPerspectiveCameraFovy = function (cameraController, fovy) {
    PerspectiveCameraSystem_1.setFovy(cameraController.index, fovy, PerspectiveCameraData_1.PerspectiveCameraData, CameraControllerData_1.CameraControllerData);
};
exports.getPerspectiveCameraAspect = function (cameraController) {
    return PerspectiveCameraSystem_1.getAspect(cameraController.index, PerspectiveCameraData_1.PerspectiveCameraData);
};
exports.setPerspectiveCameraAspect = function (cameraController, aspect) {
    PerspectiveCameraSystem_1.setAspect(cameraController.index, aspect, PerspectiveCameraData_1.PerspectiveCameraData, CameraControllerData_1.CameraControllerData);
};
//# sourceMappingURL=PerspectiveCamera.js.map