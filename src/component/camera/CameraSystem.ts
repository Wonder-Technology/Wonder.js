import {
    dispose as disposePerspectiveCamera, initData as initDataPerspectiveCamera,
    updateProjectionMatrix as updateProjectionMatrixPerspectiveCamera
} from "./PerspectiveCameraSystem";
import { Map } from "immutable";
import { addToDirtyList, getGameObject } from "./CameraControllerSystem";
import { Matrix4 } from "../../math/Matrix4";
import { deleteVal } from "../../utils/objectUtils";
import { getTransform } from "../../core/entityObject/gameObject/GameObjectSystem";
import { getLocalToWorldMatrix, getTempLocalToWorldMatrix } from "../transform/ThreeDTransformSystem";

export var init = (state: Map<any, any>, index:number, PerspectiveCameraData:any, CameraData:any) => {
    updateProjectionMatrix(index, PerspectiveCameraData, CameraData);
}

export var updateProjectionMatrix = (index:number, PerspectiveCameraData:any, CameraData:any) => {
    updateProjectionMatrixPerspectiveCamera(index, PerspectiveCameraData, CameraData);
}

export var getWorldToCameraMatrix = (index:number, ThreeDTransformData:any, GameObjectData:any, CameraControllerData:any, CameraData:any) => {
    return _getCameraToWorldMatrix(index, ThreeDTransformData, GameObjectData, CameraControllerData, CameraData).clone().invert();
}

var _getCameraToWorldMatrix = (index:number, ThreeDTransformData:any, GameObjectData:any, CameraControllerData:any, CameraData:any) => {
    var transform = getTransform(getGameObject(index, CameraControllerData), GameObjectData);

    return getLocalToWorldMatrix(transform, getTempLocalToWorldMatrix(transform, ThreeDTransformData), ThreeDTransformData);
}

export var getPMatrix = (index:number, CameraData:any) => {
    return CameraData.pMatrixMap[index];
}

// export var setPMatrix = (index:number, pMatrix:Matrix4, CameraControllerData:any, CameraData:any) => {
//     CameraData.pMatrixMap[index] = pMatrix;
//
//     addToDirtyList(index, CameraControllerData);
// }

export var getNear = (index:number, CameraData:any) => {
    return CameraData.nearMap[index];
}

export var setNear = (index:number, near:number, CameraControllerData:any, CameraData:any) => {
    CameraData.nearMap[index] = near;

    addToDirtyList(index, CameraControllerData);
}

export var getFar = (index:number, CameraData:any) => {
    return CameraData.farMap[index];
}

export var setFar = (index:number, far:number, CameraControllerData:any, CameraData:any) => {
    CameraData.farMap[index] = far;

    addToDirtyList(index, CameraControllerData);
}

export var dispose = (index:number, PerspectiveCameraData:any, CameraData:any) => {
    deleteVal(index, CameraData.nearMap);
    deleteVal(index, CameraData.farMap);
    deleteVal(index, CameraData.worldToCameraMatrixMap);
    deleteVal(index, CameraData.pMatrixMap);

    disposePerspectiveCamera(index, PerspectiveCameraData);
}

export var initData = (PerspectiveCameraData:any, CameraData: any) => {
    CameraData.nearMap = {};
    CameraData.farMap = {};
    CameraData.worldToCameraMatrixMap = {};
    CameraData.pMatrixMap = {};

    initDataPerspectiveCamera(PerspectiveCameraData);
}

