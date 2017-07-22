import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { Quaternion } from "../math/Quaternion";
var GlobalTempData = (function () {
    function GlobalTempData() {
    }
    GlobalTempData.matrix4_1 = Matrix4.create();
    GlobalTempData.matrix4_2 = Matrix4.create();
    GlobalTempData.matrix4_3 = Matrix4.create();
    GlobalTempData.vector3_1 = Vector3.create();
    GlobalTempData.vector3_2 = Vector3.create();
    GlobalTempData.vector3_3 = Vector3.create();
    GlobalTempData.vector3_4 = Vector3.create();
    GlobalTempData.quaternion_1 = Quaternion.create();
    return GlobalTempData;
}());
export { GlobalTempData };
//# sourceMappingURL=GlobalTempData.js.map