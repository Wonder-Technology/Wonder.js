open CameraControllerType;

open CameraControllerStateCommon;

open ComponentSystem;

open CameraControllerDirtyCommon;

let _isNotNeedInitData = (index: int, {pMatrixMap}) =>
  pMatrixMap |> WonderCommonlib.SparseMapSystem.has(index);

let _initDataWhenCreate = (index: int, data) =>
  _isNotNeedInitData(index, data) ?
    () : PerspectiveCameraSystem.setDefaultPMatrix(index, data) |> ignore;

let create = (state: StateDataType.state) => {
  let {index, cameraArray, disposedIndexArray} as data = getCameraControllerData(state);
  let (index, newIndex) = generateIndex(index, disposedIndexArray);
  data.index = newIndex;
  cameraArray |> Js.Array.push(index) |> ignore;
  addToDirtyArray(index, data) |> ignore;
  PerspectiveCameraSystem.setDefaultPMatrix(index, data) |> ignore;
  (state, index)
};