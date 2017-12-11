open CameraControllerType;

open ComponentDisposeComponentCommon;

open CameraControllerStateCommon;

open Contract;

let isAlive = (cameraController: cameraController, state: StateDataType.state) =>
  ComponentDisposeComponentCommon.isAlive(
    cameraController,
    getCameraControllerData(state).disposedIndexArray
  );

let _disposeData = (cameraController: cameraController, state: StateDataType.state) => {
  let state = PerspectiveCameraDisposeCommon.disposeData(cameraController, state);
  let {cameraArray, dirtyArray, pMatrixMap, gameObjectMap, updateCameraFuncMap} as data =
    getCameraControllerData(state);
  disposeSparseMapData(cameraController, cameraArray) |> ignore;
  disposeSparseMapData(cameraController, dirtyArray) |> ignore;
  disposeSparseMapData(cameraController, pMatrixMap) |> ignore;
  disposeSparseMapData(cameraController, gameObjectMap) |> ignore;
  disposeSparseMapData(cameraController, updateCameraFuncMap) |> ignore;
  state
};

let handleDisposeComponent = (cameraController: cameraController, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentCommon.checkComponentShouldAlive(cameraController, isAlive, state)
      )
  );
  let {disposedIndexArray} = getCameraControllerData(state);
  disposedIndexArray |> Js.Array.push(cameraController) |> ignore;
  _disposeData(cameraController, state)
};

let handleBatchDisposeComponent =
  [@bs]
  (
    (
      cameraControllerArray: array(cameraController),
      gameObjectUidMap: array(bool),
      state: StateDataType.state
    ) => {
      requireCheck(
        () =>
          Contract.Operators.(
            cameraControllerArray
            |> WonderCommonlib.ArraySystem.forEach(
                 [@bs]
                 (
                   (cameraController) =>
                     ComponentDisposeComponentCommon.checkComponentShouldAlive(
                       cameraController,
                       isAlive,
                       state
                     )
                 )
               )
          )
      );
      let {disposedIndexArray} as data = getCameraControllerData(state);
      data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(cameraControllerArray);
      cameraControllerArray
      |> ArraySystem.reduceState(
           [@bs] ((state, cameraController) => state |> _disposeData(cameraController)),
           state
         )
    }
  );