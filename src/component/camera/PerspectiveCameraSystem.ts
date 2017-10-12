import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap, deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { addToDirtyList } from "./CameraControllerSystem";
import { Matrix4 } from "../../math/Matrix4";
import { setPMatrix } from "./CameraSystem";

export const updateProjectionMatrix = requireCheckFunc((index: number, PerspectiveCameraData: any, CameraData: any) => {
    it("fovy should exist", () => {
        expect(isValidMapValue(PerspectiveCameraData.fovyMap[index])).true;
    });
    it("aspect should exist", () => {
        expect(isValidMapValue(PerspectiveCameraData.aspectMap[index])).true;
    });
    it("near should exist", () => {
        expect(isValidMapValue(CameraData.nearMap[index])).true;
    });
    it("far should exist", () => {
        expect(isValidMapValue(CameraData.farMap[index])).true;
    });
}, (index: number, PerspectiveCameraData: any, CameraData: any) => {
    setPMatrix(index, _getOrCreatePMatrix(index, CameraData).setPerspective(PerspectiveCameraData.fovyMap[index], PerspectiveCameraData.aspectMap[index], CameraData.nearMap[index], CameraData.farMap[index]), CameraData);
})

const _getOrCreatePMatrix = (index: number, CameraData: any) => {
    var mat = CameraData.pMatrixMap[index];

    if (isValidMapValue(mat)) {
        return mat;
    }

    return Matrix4.create();
}

export const getFovy = (index: number, PerspectiveCameraData: any) => {
    return PerspectiveCameraData.fovyMap[index];
}

export const setFovy = (index: number, fovy: number, PerspectiveCameraData: any, CameraControllerData: any) => {
    PerspectiveCameraData.fovyMap[index] = fovy;

    addToDirtyList(index, CameraControllerData);
}

export const getAspect = (index: number, PerspectiveCameraData: any) => {
    return PerspectiveCameraData.aspectMap[index];
}

export const setAspect = (index: number, aspect: number, PerspectiveCameraData: any, CameraControllerData: any) => {
    PerspectiveCameraData.aspectMap[index] = aspect;

    addToDirtyList(index, CameraControllerData);
}

export const dispose = (index: number, PerspectiveCameraData: any) => {
    deleteVal(index, PerspectiveCameraData.fovyMap);
    deleteVal(index, PerspectiveCameraData.aspectMap);
}

export const initData = (PerspectiveCameraData: any) => {
    PerspectiveCameraData.fovyMap = createMap();
    PerspectiveCameraData.aspectMap = createMap();
}
