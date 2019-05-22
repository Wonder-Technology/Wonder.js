open StateDataMainType;

let isAlive =
    (cameraController, {disposedIndexArray}: flyCameraControllerRecord) =>
  DisposeComponentService.isAlive(cameraController, disposedIndexArray);

let _disposeData = (cameraController, state) => {
  /* TODO change this function, use fly camera */
  let {flyCameraControllerRecord} as state =
    state |> EventFlyCameraControllerMainService.unbindEvent(cameraController);

  let {
    dirtyArray,
    moveSpeedXMap,
    moveSpeedYMap,
    rotateSpeedMap,
    gameObjectMap,
  }: flyCameraControllerRecord = flyCameraControllerRecord;

  {
    ...state,
    flyCameraControllerRecord: {
      ...flyCameraControllerRecord,
      dirtyArray:
        dirtyArray
        |> Js.Array.filter(dirtyIndex => dirtyIndex !== cameraController),
      moveSpeedXMap:
        moveSpeedXMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      moveSpeedYMap:
        moveSpeedYMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      rotateSpeedMap:
        rotateSpeedMap
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