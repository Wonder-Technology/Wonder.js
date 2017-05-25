import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { deleteVal, isValidMapValue } from "../../utils/objectUtils";
import { addToDirtyList } from "./CameraControllerSystem";
import { Matrix4 } from "../../math/Matrix4";
import { setPMatrix } from "./CameraSystem";

export var updateProjectionMatrix = requireCheckFunc((index:number, PerspectiveCameraData:any, CameraData:any) => {
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
}, (index:number, PerspectiveCameraData:any, CameraData:any) => {
    setPMatrix(index, _getOrCreatePMatrix(index, CameraData).setPerspective(PerspectiveCameraData.fovyMap[index], PerspectiveCameraData.aspectMap[index], CameraData.nearMap[index], CameraData.farMap[index]), CameraData);
})

var _getOrCreatePMatrix = (index:number, CameraData:any) => {
    var mat = CameraData.pMatrixMap[index];

    if(isValidMapValue(mat)){
        return mat;
    }

    return Matrix4.create();
}

export var getFovy = (index:number, PerspectiveCameraData:any) => {
    return PerspectiveCameraData.fovyMap[index];
}

export var setFovy = (index:number, fovy:number, PerspectiveCameraData:any, CameraControllerData:any) => {
    PerspectiveCameraData.fovyMap[index] = fovy;

    addToDirtyList(index, CameraControllerData);
}

export var getAspect = (index:number, PerspectiveCameraData:any) => {
    return PerspectiveCameraData.aspectMap[index];
}

export var setAspect = (index:number, aspect:number, PerspectiveCameraData:any, CameraControllerData:any) => {
    PerspectiveCameraData.aspectMap[index] = aspect;

    addToDirtyList(index, CameraControllerData);
}

export var dispose = (index:number, PerspectiveCameraData:any) => {
    deleteVal(index, PerspectiveCameraData.fovyMap);
    deleteVal(index, PerspectiveCameraData.aspectMap);
}

export var initData = (PerspectiveCameraData: any) => {
    PerspectiveCameraData.fovyMap = {};
    PerspectiveCameraData.aspectMap = {};
}
