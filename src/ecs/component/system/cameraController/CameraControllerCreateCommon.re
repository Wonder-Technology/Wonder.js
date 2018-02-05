open CameraControllerType;

open CameraControllerStateCommon;

open ComponentSystem;

open CameraControllerDirtyCommon;

let create = (state: StateDataType.state) => {
  let {index, cameraArray, dirtyArray, pMatrixMap, disposedIndexArray} as data =
    getCameraControllerData(state);
  let (index, newIndex, disposedIndexArray) = generateIndex(index, disposedIndexArray);
  (
    {
      ...state,
      cameraControllerData: {
        ...data,
        index: newIndex,
        disposedIndexArray,
        cameraArray: cameraArray |> ArraySystem.push(index),
        dirtyArray: addToDirtyArray(index, dirtyArray),
        pMatrixMap: PerspectiveCameraSystem.setDefaultPMatrix(index, pMatrixMap)
      }
    },
    index
  )
};