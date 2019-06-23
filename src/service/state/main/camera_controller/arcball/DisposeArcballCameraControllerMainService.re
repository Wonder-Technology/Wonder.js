open StateDataMainType;

let isAlive =
    (cameraController, {disposedIndexArray}: arcballCameraControllerRecord) =>
  DisposeComponentService.isAlive(cameraController, disposedIndexArray);

let _disposeData = (cameraController, state) => {
  let {arcballCameraControllerRecord} as state =
    state
    |> EventArcballCameraControllerMainService.unbindEvent(cameraController);

  let {
    dirtyArray,
    distanceMap,
    minDistanceMap,
    phiMap,
    thetaMap,
    thetaMarginMap,
    targetMap,
    moveSpeedXMap,
    moveSpeedYMap,
    rotateSpeedMap,
    wheelSpeedMap,
    gameObjectMap,
    directionArrayMap,
  } = arcballCameraControllerRecord;

  {
    ...state,
    arcballCameraControllerRecord: {
      ...arcballCameraControllerRecord,
      dirtyArray:
        dirtyArray
        |> Js.Array.filter(dirtyIndex => dirtyIndex !== cameraController),
      distanceMap:
        distanceMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      minDistanceMap:
        minDistanceMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      phiMap:
        phiMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      thetaMap:
        thetaMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      thetaMarginMap:
        thetaMarginMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      targetMap:
        targetMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      moveSpeedXMap:
        moveSpeedXMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      moveSpeedYMap:
        moveSpeedYMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      rotateSpeedMap:
        rotateSpeedMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      wheelSpeedMap:
        wheelSpeedMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      gameObjectMap:
        gameObjectMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
      directionArrayMap:
        directionArrayMap
        |> DisposeComponentService.disposeSparseMapData(cameraController),
    },
  };
};

let handleBatchDisposeComponent =
  (.
    cameraControllerArray: array(ComponentType.component),
    {arcballCameraControllerRecord} as state,
  ) => {
    WonderLog.Contract.requireCheck(
      () =>
        WonderLog.(
          Contract.(
            Operators.(
              DisposeComponentService.checkComponentShouldAliveWithBatchDispose(
                cameraControllerArray,
                isAlive,
                arcballCameraControllerRecord,
              )
            )
          )
        ),
      IsDebugMainService.getIsDebug(StateDataMain.stateData),
    );

    let {disposedIndexArray}: arcballCameraControllerRecord = arcballCameraControllerRecord;

    let state = {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        disposedIndexArray:
          arcballCameraControllerRecord.disposedIndexArray
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