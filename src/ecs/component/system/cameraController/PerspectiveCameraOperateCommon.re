open CameraControllerType;

open PerspectiveCameraType;

open CameraControllerStateCommon;

let _setData =
    (cameraController: cameraController, data: float, dataMap, state: StateDataType.state) => {
  WonderCommonlib.SparseMapSystem.set(cameraController, data, dataMap) |> ignore;
  CameraControllerDirtyCommon.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getFovy = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.fovyMap);

let setFovy = (cameraController: cameraController, fovy: float, state: StateDataType.state) =>
  _setData(cameraController, fovy, getPerspectiveCameraData(state).fovyMap, state);

let getAspect = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.aspectMap);

let setAspect = (cameraController: cameraController, aspect: float, state: StateDataType.state) =>
  _setData(cameraController, aspect, getPerspectiveCameraData(state).aspectMap, state);

let getNear = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.nearMap);

let setNear = (cameraController: cameraController, near: float, state: StateDataType.state) =>
  _setData(cameraController, near, getPerspectiveCameraData(state).nearMap, state);

let getFar = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  WonderCommonlib.SparseMapSystem.get(cameraController, cameraData.farMap);

let setFar = (cameraController: cameraController, far: float, state: StateDataType.state) =>
  _setData(cameraController, far, getPerspectiveCameraData(state).farMap, state);