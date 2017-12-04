open CameraControllerType;

open CameraControllerStateSystem;

open Contract;

let isAlive = (cameraController: cameraController, state: StateDataType.state) =>
  ComponentDisposeComponentSystem.isAlive(
    cameraController,
    getCameraControllerData(state).disposedIndexArray
  );

let handleDisposeComponent = (cameraController: cameraController, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        ComponentDisposeComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state)
      )
  );
  let {disposedIndexArray} = getCameraControllerData(state);
  disposedIndexArray |> Js.Array.push(cameraController) |> ignore;
  state
};

let handleBatchDisposeComponent =
    (cameraControllerArray: array(cameraController), gameObjectUidMap, state: StateDataType.state) => {
  requireCheck(
    () =>
      Contract.Operators.(
        cameraControllerArray
        |> WonderCommonlib.ArraySystem.forEach(
             [@bs]
             (
               (cameraController) =>
                 ComponentDisposeComponentSystem.checkComponentShouldAlive(cameraController, isAlive, state)
             )
           )
      )
  );
  let {disposedIndexArray} as data = getCameraControllerData(state);
  data.disposedIndexArray = disposedIndexArray |> Js.Array.concat(cameraControllerArray);
  state
};