"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix4_1 = require("../math/Matrix4");
var Vector3_1 = require("../math/Vector3");
var Quaternion_1 = require("../math/Quaternion");
var GlobalTempData = (function () {
    function GlobalTempData() {
    }
    return GlobalTempData;
}());
GlobalTempData.matrix4_1 = Matrix4_1.Matrix4.create();
GlobalTempData.matrix4_2 = Matrix4_1.Matrix4.create();
GlobalTempData.matrix4_3 = Matrix4_1.Matrix4.create();
GlobalTempData.vector3_1 = Vector3_1.Vector3.create();
GlobalTempData.vector3_2 = Vector3_1.Vector3.create();
GlobalTempData.vector3_3 = Vector3_1.Vector3.create();
GlobalTempData.vector3_4 = Vector3_1.Vector3.create();
GlobalTempData.quaternion_1 = Quaternion_1.Quaternion.create();
exports.GlobalTempData = GlobalTempData;
//# sourceMappingURL=GlobalTempData.js.map