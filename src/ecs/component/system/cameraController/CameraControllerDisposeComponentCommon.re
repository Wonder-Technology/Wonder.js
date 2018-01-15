open CameraControllerType;

open ComponentDisposeComponentCommon;

open CameraControllerStateCommon;

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
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            ComponentDisposeComponentCommon.checkComponentShouldAlive(
              cameraController,
              isAlive,
              state
            )
          )
        )
      ),
    StateData.stateData.isDebug
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
      WonderLog.Contract.requireCheck(
        () =>
          WonderLog.(
            Contract.(
              Operators.(
                ComponentDisposeComponentCommon.checkComponentShouldAliveWithBatchDispose(
                  cameraControllerArray,
                  isAlive,
                  state
                )
              )
            )
          ),
        StateData.stateData.isDebug
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