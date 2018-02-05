open CameraControllerType;

open PerspectiveCameraType;

open CameraControllerStateCommon;

let getFovy = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.fovyMap);

let setFovy = (cameraController: cameraController, fovy: float, state: StateDataType.state) => {
  let {dirtyArray} as cameraControllerData = getCameraControllerData(state);
  let {fovyMap} as perspectiveCameraData = getPerspectiveCameraData(state);
  {
    ...state,
    cameraControllerData: {
      ...cameraControllerData,
      perspectiveCameraData: {
        ...perspectiveCameraData,
        fovyMap: WonderCommonlib.SparseMapSystem.set(cameraController, fovy, fovyMap)
      },
      dirtyArray: CameraControllerDirtyCommon.addToDirtyArray(cameraController, dirtyArray)
    }
  }
};

let getAspect = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.aspectMap);

let setAspect = (cameraController: cameraController, aspect: float, state: StateDataType.state) => {
  let {dirtyArray} as cameraControllerData = getCameraControllerData(state);
  let {aspectMap} as perspectiveCameraData = getPerspectiveCameraData(state);
  {
    ...state,
    cameraControllerData: {
      ...cameraControllerData,
      perspectiveCameraData: {
        ...perspectiveCameraData,
        aspectMap: WonderCommonlib.SparseMapSystem.set(cameraController, aspect, aspectMap)
      },
      dirtyArray: CameraControllerDirtyCommon.addToDirtyArray(cameraController, dirtyArray)
    }
  }
};

let getNear = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.nearMap);

let setNear = (cameraController: cameraController, near: float, state: StateDataType.state) => {
  let {dirtyArray} as cameraControllerData = getCameraControllerData(state);
  let {nearMap} as perspectiveCameraData = getPerspectiveCameraData(state);
  {
    ...state,
    cameraControllerData: {
      ...cameraControllerData,
      perspectiveCameraData: {
        ...perspectiveCameraData,
        nearMap: WonderCommonlib.SparseMapSystem.set(cameraController, near, nearMap)
      },
      dirtyArray: CameraControllerDirtyCommon.addToDirtyArray(cameraController, dirtyArray)
    }
  }
};

let getFar = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.farMap);

let setFar = (cameraController: cameraController, far: float, state: StateDataType.state) => {
  let {dirtyArray} as cameraControllerData = getCameraControllerData(state);
  let {farMap} as perspectiveCameraData = getPerspectiveCameraData(state);
  {
    ...state,
    cameraControllerData: {
      ...cameraControllerData,
      perspectiveCameraData: {
        ...perspectiveCameraData,
        farMap: WonderCommonlib.SparseMapSystem.set(cameraController, far, farMap)
      },
      dirtyArray: CameraControllerDirtyCommon.addToDirtyArray(cameraController, dirtyArray)
    }
  }
};