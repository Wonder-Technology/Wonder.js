open CameraControllerType;

open PerspectiveCameraType;

open StateDataType;

let getCameraControllerData = (state: StateDataType.state) => state.cameraControllerData;

let getPerspectiveCameraDataFromCameraControllerData = (cameraControllerData) =>
  cameraControllerData.perspectiveCameraData;

let getPerspectiveCameraData = (state: StateDataType.state) =>
  state |> getCameraControllerData |> getPerspectiveCameraDataFromCameraControllerData;

let _deepCopyPerspectiveCameraState = (perspectiveCameraData) => {
  let {nearMap, farMap, fovyMap, aspectMap} = perspectiveCameraData;
  {
    nearMap: nearMap |> Js.Array.copy,
    farMap: farMap |> Js.Array.copy,
    fovyMap: fovyMap |> Js.Array.copy,
    aspectMap: aspectMap |> Js.Array.copy
  }
};

let deepCopyState = ({cameraControllerData} as state) => {
  let {
    index,
    perspectiveCameraData,
    cameraArray,
    dirtyArray,
    pMatrixMap,
    gameObjectMap,
    updateCameraFuncMap,
    disposedIndexArray
  } = cameraControllerData;
  {
    ...state,
    cameraControllerData: {
      index,
      perspectiveCameraData: _deepCopyPerspectiveCameraState(perspectiveCameraData),
      cameraArray: cameraArray |> Js.Array.copy,
      dirtyArray: dirtyArray |> Js.Array.copy,
      pMatrixMap: pMatrixMap |> CopyStateUtils.deepCopyFloat32ArrayArray,
      updateCameraFuncMap: updateCameraFuncMap |> Js.Array.copy,
      gameObjectMap: gameObjectMap |> SparseMapSystem.copy,
      disposedIndexArray: disposedIndexArray |> Js.Array.copy
    }
  }
};