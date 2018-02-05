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
  {
    ...state,
    cameraControllerData: {
      ...data,
      cameraArray: disposeSparseMapData(cameraController, cameraArray),
      dirtyArray: disposeSparseMapData(cameraController, dirtyArray),
      pMatrixMap: disposeSparseMapData(cameraController, pMatrixMap),
      updateCameraFuncMap: disposeSparseMapData(cameraController, updateCameraFuncMap),
      gameObjectMap: disposeSparseMapData(cameraController, gameObjectMap)
    }
  }
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
  let {disposedIndexArray} as data = getCameraControllerData(state);
  _disposeData(
    cameraController,
    {
      ...state,
      cameraControllerData: {
        ...data,
        disposedIndexArray: disposedIndexArray |> ArraySystem.push(cameraController)
      }
    }
  )
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
      let state = {
        ...state,
        cameraControllerData: {
          ...data,
          disposedIndexArray: disposedIndexArray |> Js.Array.concat(cameraControllerArray)
        }
      };
      cameraControllerArray
      |> ArraySystem.reduceState(
           [@bs] ((state, cameraController) => state |> _disposeData(cameraController)),
           state
         )
    }
  );