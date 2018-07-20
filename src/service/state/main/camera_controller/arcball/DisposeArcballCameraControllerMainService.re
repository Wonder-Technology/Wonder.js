open StateDataMainType;

let isAlive =
    (cameraController, {disposedIndexArray}: arcballCameraControllerRecord) =>
  DisposeComponentService.isAlive(cameraController, disposedIndexArray);

let _unbindPointEvent = (eventName, handleFunc, state) =>
  ManageEventMainService.offCustomGlobalEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state,
  );

let _unbindKeyboardEvent = (eventName, handleFunc, state) =>
  ManageEventMainService.offKeyboardEventByHandleFunc(
    ~eventName,
    ~handleFunc,
    ~state,
  );

let _disposePointDragEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    pointDragEventHandleFuncMap
    |> WonderCommonlib.SparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDragEventHandleFunc) =>
    let state =
      _unbindPointEvent(
        NameEventService.getPointDragEventName(),
        pointDragEventHandleFunc,
        state,
      );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDragEventHandleFuncMap:
          pointDragEventHandleFuncMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointScaleEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointScaleEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    pointScaleEventHandleFuncMap
    |> WonderCommonlib.SparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointScaleEventHandleFunc) =>
    let state =
      _unbindPointEvent(
        NameEventService.getPointScaleEventName(),
        pointScaleEventHandleFunc,
        state,
      );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointScaleEventHandleFuncMap:
          pointScaleEventHandleFuncMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposeKeyDownEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {keydownEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    keydownEventHandleFuncMap
    |> WonderCommonlib.SparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(keydownEventHandleFunc) =>
    let state =
      _unbindKeyboardEvent(EventType.KeyDown, keydownEventHandleFunc, state);

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        keydownEventHandleFuncMap:
          keydownEventHandleFuncMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposeData = (cameraController, state) => {
  let {arcballCameraControllerRecord} as state =
    state
    |> _disposePointDragEventHandleFuncMap(cameraController)
    |> _disposePointScaleEventHandleFuncMap(cameraController)
    |> _disposeKeyDownEventHandleFuncMap(cameraController);

  let {
    pointDragEventHandleFuncMap,
    pointScaleEventHandleFuncMap,
    keydownEventHandleFuncMap,
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
  } = arcballCameraControllerRecord;

  {
    ...state,
    arcballCameraControllerRecord: {
      ...arcballCameraControllerRecord,
      dirtyArray:
        DisposeComponentService.removeFromArray(cameraController, dirtyArray),
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

    let {disposedIndexArray} = arcballCameraControllerRecord;

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