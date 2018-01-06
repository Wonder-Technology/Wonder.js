open PerspectiveCameraType;

open ComponentDisposeComponentCommon;

let disposeData = (cameraController, state: StateDataType.state) => {
  let {nearMap, farMap, fovyMap, aspectMap} as data = CameraControllerStateCommon.getPerspectiveCameraData(state);
  disposeSparseMapData(cameraController, nearMap) |> ignore;
  disposeSparseMapData(cameraController, farMap) |> ignore;
  disposeSparseMapData(cameraController, fovyMap) |> ignore;
  disposeSparseMapData(cameraController, aspectMap) |> ignore;
  state
};

