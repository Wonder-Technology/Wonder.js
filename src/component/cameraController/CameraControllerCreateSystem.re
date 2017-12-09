open CameraControllerType;

open CameraControllerStateSystem;

open ComponentSystem;

open CameraControllerDirtySystem;

let create = (state: StateDataType.state) => {
  let {index, cameraArray, disposedIndexArray} as data = getCameraControllerData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  cameraArray |> Js.Array.push(index) |> ignore;
  addToDirtyArray(index, data) |> ignore;
  PerspectiveCameraSystem.setDefaultPMatrix(index, data) |> ignore;
  (state, index)
};
