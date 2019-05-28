open StateDataMainType;

let isAlive =
    (cameraController, {disposedIndexArray}: flyCameraControllerRecord) =>
  DisposeComponentService.isAlive(cameraController, disposedIndexArray);

let _disposeData = (cameraController, state) => {
  let {flyCameraControllerRecord} as state =
    state |> EventFlyCameraControllerMainService.unbindEvent(cameraController);

  let {
    dirtyArray,
    moveSpeedMap,
    wheelSpeedMap,
    rotateSpeedMap,
    rotationMap,
    positionMap,
    gameObjectMap,
  }: flyCameraControllerRecord = flyCameraControllerRecord;

  {
    ...state,
    flyCameraControllerRecord: {
      ...flyCameraControllerRecord,
      dirtyArray:
        dirtyArray
        |> Js.Array.filter(dirtyIndex => dirtyIndex !== cameraController),
      moveSpeedMap:
        moveSpeedMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      wheelSpeedMap:
        wheelSpeedMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      rotateSpeedMap:
        rotateSpeedMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      rotationMap:
        rotationMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      positionMap:
        positionMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      gameObjectMap:
        gameObjectMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
    },
  };
};

let handleBatchDisposeComponent =
  (.
    cameraControllerArray: array(ComponentType.component),
    {flyCameraControllerRecord} as state,
  ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                cameraControllerArray,
                isAlive,
                flyCameraControllerRecord,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    let {disposedIndexArray}: flyCameraControllerRecord = flyCameraControllerRecord;

    let state = {
      ...state,
      flyCameraControllerRecord: {
        ...flyCameraControllerRecord,
        disposedIndexArray:
          flyCameraControllerRecord.disposedIndexArray
          |> Js.Array.concat(cameraControllerArray),
      },
    };

    cameraControllerArray
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, cameraController) =>
           state |> _disposeData(cameraController),
         state,
       );
  };