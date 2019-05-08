open StateDataMainType;

open EventType;

let _setEventHandleFunc = (cameraController, handleFunc, eventHandleFuncMap) =>
  eventHandleFuncMap
  |> WonderCommonlib.MutableSparseMapService.set(cameraController, handleFunc);

let _setPointDragStartEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {pointDragStartEventHandleFuncMap} as record,
    ) => {
  ...record,
  pointDragStartEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragStartEventHandleFuncMap,
    ),
};

let _setPointDragDropEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {pointDragDropEventHandleFuncMap} as record,
    ) => {
  ...record,
  pointDragDropEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragDropEventHandleFuncMap,
    ),
};

let _setPointDragOverEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {pointDragOverEventHandleFuncMap} as record,
    ) => {
  ...record,
  pointDragOverEventHandleFuncMap:
    _setEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragOverEventHandleFuncMap,
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
       +. (x |> NumberType.convertIntToFloat)
       /. (100. /. rotateSpeed),
     )
  |> OperateArcballCameraControllerService.setTheta(
       cameraController,
       OperateArcballCameraControllerService.unsafeGetTheta(
         cameraController,
         arcballCameraControllerRecord,
       )
       -. (y |> NumberType.convertIntToFloat)
       /. (100. /. rotateSpeed),
     );
};

let _isCombinedKey = ({ctrlKey, altKey, shiftKey, metaKey}: keyboardEvent) =>
  ctrlKey || altKey || shiftKey || metaKey;

let isTriggerKeydownEventHandler = event => !_isCombinedKey(event);

let prepareBindEvent = (cameraController, state) => {
  let pointDragStartHandleFunc =
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

  let pointDragDropHandleFunc =
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

  let pointDragOverHandleFunc =
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
      |> _setPointDragStartEventHandleFunc(
           cameraController,
           pointDragStartHandleFunc,
         )
      |> _setPointDragDropEventHandleFunc(
           cameraController,
           pointDragDropHandleFunc,
         )
      |> _setPointDragOverEventHandleFunc(
           cameraController,
           pointDragOverHandleFunc,
         )
      |> _setPointScaleEventHandleFunc(
           cameraController,
           pointScaleHandleFunc,
         )
      |> _setKeydownEventHandleFunc(cameraController, keydownHandleFunc),
  };

  (
    state,
    pointDragStartHandleFunc,
    pointDragDropHandleFunc,
    pointDragOverHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  );
};

let bindEvent = (cameraController, state) => {
  let (
    state,
    pointDragStartHandleFunc,
    pointDragDropHandleFunc,
    pointDragOverHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    prepareBindEvent(cameraController, state);

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointDragStartEventName(),
      ~handleFunc=pointDragStartHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointDragDropEventName(),
      ~handleFunc=pointDragDropHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=NameEventService.getPointDragOverEventName(),
      ~handleFunc=pointDragOverHandleFunc,
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
      ~handleFunc=
        (. event, state) =>
          isTriggerKeydownEventHandler(event) ?
            keydownHandleFunc(. event, state) : state,
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

let _disposePointDragStartEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragStartEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    pointDragStartEventHandleFuncMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDragStartEventHandleFunc) =>
    let state =
      _unbindPointEvent(
        NameEventService.getPointDownEventName(),
        pointDragStartEventHandleFunc,
        state,
      );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDragStartEventHandleFuncMap:
          pointDragStartEventHandleFuncMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointDragDropEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragDropEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    pointDragDropEventHandleFuncMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDragDropEventHandleFunc) =>
    let state =
      _unbindPointEvent(
        NameEventService.getPointUpEventName(),
        pointDragDropEventHandleFunc,
        state,
      );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDragDropEventHandleFuncMap:
          pointDragDropEventHandleFuncMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointDragOverEventHandleFuncMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragOverEventHandleFuncMap} = arcballCameraControllerRecord;

  switch (
    pointDragOverEventHandleFuncMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDragOverEventHandleFunc) =>
    let state =
      _unbindPointEvent(
        NameEventService.getPointDragOverEventName(),
        pointDragOverEventHandleFunc,
        state,
      );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDragOverEventHandleFuncMap:
          pointDragOverEventHandleFuncMap
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
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
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
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
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
  |> _disposePointDragStartEventHandleFuncMap(cameraController)
  |> _disposePointDragDropEventHandleFuncMap(cameraController)
  |> _disposePointDragOverEventHandleFuncMap(cameraController)
  |> _disposePointScaleEventHandleFuncMap(cameraController)
  |> _disposeKeyDownEventHandleFuncMap(cameraController);

let isBindEvent =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragStartEventHandleFuncMap} = arcballCameraControllerRecord;

  pointDragStartEventHandleFuncMap
  |> WonderCommonlib.MutableSparseMapService.has(cameraController);
};