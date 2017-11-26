open CameraControllerType;

open PerspectiveCameraType;

open CameraControllerStateUtils;

let getFovy = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  SparseMapSystem.get(cameraController, cameraData.fovyMap);

let setFovy = (cameraController: cameraController, fovy: float, state: StateDataType.state) => {
  SparseMapSystem.set(cameraController, fovy, getPerspectiveCameraData(state).fovyMap) |> ignore;
  CameraControllerDirtyUtils.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getAspect = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  SparseMapSystem.get(cameraController, cameraData.aspectMap);

let setAspect = (cameraController: cameraController, aspect: float, state: StateDataType.state) => {
  SparseMapSystem.set(cameraController, aspect, getPerspectiveCameraData(state).aspectMap)
  |> ignore;
  CameraControllerDirtyUtils.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getNear = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  SparseMapSystem.get(cameraController, cameraData.nearMap);

let setNear = (cameraController: cameraController, near: float, state: StateDataType.state) => {
  SparseMapSystem.set(cameraController, near, getPerspectiveCameraData(state).nearMap) |> ignore;
  CameraControllerDirtyUtils.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};

let getFar = (cameraController: cameraController, cameraData: perspectiveCameraData) =>
  SparseMapSystem.get(cameraController, cameraData.farMap);

let setFar = (cameraController: cameraController, far: float, state: StateDataType.state) => {
  SparseMapSystem.set(cameraController, far, getPerspectiveCameraData(state).farMap) |> ignore;
  CameraControllerDirtyUtils.addToDirtyArray(cameraController, getCameraControllerData(state))
  |> ignore;
  state
};