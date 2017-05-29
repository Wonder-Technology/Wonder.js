import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap, deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { addToDirtyList } from "./CameraControllerSystem";
import { Matrix4 } from "../../math/Matrix4";
import { setPMatrix } from "./CameraSystem";
export var updateProjectionMatrix = requireCheckFunc(function (index, PerspectiveCameraData, CameraData) {
    it("fovy should exist", function () {
        expect(isValidMapValue(PerspectiveCameraData.fovyMap[index])).true;
    });
    it("aspect should exist", function () {
        expect(isValidMapValue(PerspectiveCameraData.aspectMap[index])).true;
    });
    it("near should exist", function () {
        expect(isValidMapValue(CameraData.nearMap[index])).true;
    });
    it("far should exist", function () {
        expect(isValidMapValue(CameraData.farMap[index])).true;
    });
}, function (index, PerspectiveCameraData, CameraData) {
    setPMatrix(index, _getOrCreatePMatrix(index, CameraData).setPerspective(PerspectiveCameraData.fovyMap[index], PerspectiveCameraData.aspectMap[index], CameraData.nearMap[index], CameraData.farMap[index]), CameraData);
});
var _getOrCreatePMatrix = function (index, CameraData) {
    var mat = CameraData.pMatrixMap[index];
    if (isValidMapValue(mat)) {
        return mat;
    }
    return Matrix4.create();
};
export var getFovy = function (index, PerspectiveCameraData) {
    return PerspectiveCameraData.fovyMap[index];
};
export var setFovy = function (index, fovy, PerspectiveCameraData, CameraControllerData) {
    PerspectiveCameraData.fovyMap[index] = fovy;
    addToDirtyList(index, CameraControllerData);
};
export var getAspect = function (index, PerspectiveCameraData) {
    return PerspectiveCameraData.aspectMap[index];
};
export var setAspect = function (index, aspect, PerspectiveCameraData, CameraControllerData) {
    PerspectiveCameraData.aspectMap[index] = aspect;
    addToDirtyList(index, CameraControllerData);
};
export var dispose = function (index, PerspectiveCameraData) {
    deleteVal(index, PerspectiveCameraData.fovyMap);
    deleteVal(index, PerspectiveCameraData.aspectMap);
};
export var initData = function (PerspectiveCameraData) {
    PerspectiveCameraData.fovyMap = createMap();
    PerspectiveCameraData.aspectMap = createMap();
};
//# sourceMappingURL=PerspectiveCameraSystem.js.map