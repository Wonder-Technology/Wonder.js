open StateDataMainType;

open EventType;

let _setEventHandleFunc = (cameraController, handleFunc, eventHandleFuncMap) => {
  eventHandleFuncMap
  |> SparseMapService.getValidValues
  |> SparseMapService.length > 0 ?
    WonderLog.Log.warn(
      {j|expect only has one arcballCameraController, but actual > 1. please dispose others.|j},
    ) :
    ();

  eventHandleFuncMap
  |> WonderCommonlib.SparseMapService.set(cameraController, handleFunc);
};

let _setPointDownEventHandleFunc =
    (cameraController, handleFunc, {pointDownEventHandleFuncMap} as record) => {
  ...record,
  pointDownEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointDownEventHandleFuncMap,
    ),
};

let _setPointUpEventHandleFunc =
    (cameraController, handleFunc, {pointUpEventHandleFuncMap} as record) => {
  ...record,
  pointUpEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointUpEventHandleFuncMap,
    ),
};

let _setPointDragEventHandleFunc =
    (cameraController, handleFunc, {pointDragEventHandleFuncMap} as record) => {
  ...record,
  pointDragEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragEventHandleFuncMap,
    ),
};

let _setPointScaleEventHandleFunc =
    (cameraController, handleFunc, {pointScaleEventHandleFuncMap} as record) => {
  ...record,
  pointScaleEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointScaleEventHandleFuncMap,
    ),
};

let _setKeydownEventHandleFunc =
    (cameraController, handleFunc, {keydownEventHandleFuncMap} as record) => {
  ...record,
  keydownEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      keydownEventHandleFuncMap,
    ),
};

let _changeOrbit =
    (cameraController, {movementDelta}, arcballCameraControllerRecord) => {
  let (x, y) = movementDelta;
  let rotateSpeed =
    OperateArcballCameraControllerService.unsafeGetRotateSpeed(
      cameraController,
      arcballCameraControllerRecord,
    );

  arcballCameraControllerRecord
  |> OperateArcballCameraControllerService.setPhi(
       cameraController,
       OperateArcballCameraControllerService.unsafeGetPhi(
         cameraController,
         arcballCameraControllerRecord,
       )
       +. (x |> NumberType.intToFloat)
       /. (100. /. rotateSpeed),
     )
  |> OperateArcballCameraControllerService.setTheta(
       cameraController,
       OperateArcballCameraControllerService.unsafeGetTheta(
         cameraController,
         arcballCameraControllerRecord,
       )
       -. (y |> NumberType.intToFloat)
       /. (100. /. rotateSpeed),
     );
};

let prepareBindEvent = (cameraController, state) => {
  let pointDownHandleFunc =
    (. event: EventType.customEvent, {viewRecord} as state) =>
      BrowserDetectMainService.isMobile(state) ?
        (state, event) :
        {
          let canvas =
            ViewService.unsafeGetCanvas(viewRecord)
            |> DomExtendType.canvasToPointerLockElement;

          DomExtend.requestPointerLock(canvas);

          (state, event);
        };

  let pointUpHandleFunc =
    (. event: EventType.customEvent, {viewRecord} as state) =>
      BrowserDetectMainService.isMobile(state) ?
        (state, event) :
        {
          let canvas =
            ViewService.unsafeGetCanvas(viewRecord)
            |> DomExtendType.canvasToPointerLockElement;
          let document =
            DomExtend.document |> DomExtendType.documentToPointerLockDocument;

          document##pointerLockElement === canvas ?
            DomExtend.exitPointerLock() : ();

          (state, event);
        };

  let pointDragHandleFunc =
    (.
      event: EventType.customEvent,
      {arcballCameraControllerRecord} as state,
    ) => (
      {
        ...state,
        arcballCameraControllerRecord:
          _changeOrbit(
            cameraController,
            event.userData
            |> OptionService.unsafeGet
            |> EventType.userDataToPointEvent,
            arcballCameraControllerRecord,
          ),
      },
      event,
    );

  let pointScaleHandleFunc =
    (.
      event: EventType.customEvent,
      {arcballCameraControllerRecord} as state,
    ) => {
      let pointEvent =
        event.userData
        |> OptionService.unsafeGet
        |> EventType.userDataToPointEvent;

      HandlePointDomEventMainService.preventDefault(pointEvent.event);

      (
        {
          ...state,
          arcballCameraControllerRecord:
            OperateArcballCameraControllerService.setDistanceByEvent(
              cameraController,
              pointEvent,
              arcballCameraControllerRecord,
            ),
        },
        event,
      );
    };

  let keydownHandleFunc =
    (.
      event: EventType.keyboardEvent,
      {arcballCameraControllerRecord} as state,
    ) =>
      TargetArcballCameraControllerMainService.setTargetByKeyboardEvent(
        cameraController,
        event,
        state,
      );

  let state = {
    ...state,
    arcballCameraControllerRecord:
      state.arcballCameraControllerRecord
      /* TODO set handleFunc
         TODO handle dipose */
      |> _setPointDownEventHandleFunc(cameraController, pointDownHandleFunc)
      |> _setPointUpEventHandleFunc(cameraController, pointUpHandleFunc)
      |> _setPointDragEventHandleFunc(cameraController, pointDragHandleFunc)
      |> _setPointScaleEventHandleFunc(
           cameraController,
           pointScaleHandleFunc,
         )
      |> _setKeydownEventHandleFunc(cameraController, keydownHandleFunc),
  };

  (
    state,
    pointDownHandleFunc,
    pointUpHandleFunc,
    pointDragHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  );
};

let bindEvent = (cameraController, state) => {
  let (
    state,
    pointDownHandleFunc,
    pointUpHandleFunc,
    pointDragHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    prepareBindEvent(cameraController, state);

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointDownEventName(),
      ~handleFunc=pointDownHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointUpEventName(),
      ~handleFunc=pointUpHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointDragEventName(),
      ~handleFunc=pointDragHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointScaleEventName(),
      ~handleFunc=pointScaleHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onKeyboardEvent(
      ~eventName=EventType.KeyDown,
      ~handleFunc=keydownHandleFunc,
      ~state,
      (),
    );

  state;
};

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

let _disposePointDownEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDownEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    pointDownEventHandleFuncMap
    |> WonderCommonlib.SparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDownEventHandleFunc) =>
    let state =
      _unbindPointEvent(
        NameEventService.getPointDownEventName(),
        pointDownEventHandleFunc,
        state,
      );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDownEventHandleFuncMap:
          pointDownEventHandleFuncMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointUpEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointUpEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    pointUpEventHandleFuncMap
    |> WonderCommonlib.SparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointUpEventHandleFunc) =>
    let state =
      _unbindPointEvent(
        NameEventService.getPointUpEventName(),
        pointUpEventHandleFunc,
        state,
      );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointUpEventHandleFuncMap:
          pointUpEventHandleFuncMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

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

let unbindEvent = (cameraController, state) =>
  state
  |> _disposePointDownEventHandleFuncMap(cameraController)
  |> _disposePointUpEventHandleFuncMap(cameraController)
  |> _disposePointDragEventHandleFuncMap(cameraController)
  |> _disposePointScaleEventHandleFuncMap(cameraController)
  |> _disposeKeyDownEventHandleFuncMap(cameraController);

let isBindEvent =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDownEventHandleFuncMap} = arcballCameraControllerRecord;

  pointDownEventHandleFuncMap
  |> WonderCommonlib.SparseMapService.has(cameraController);
};