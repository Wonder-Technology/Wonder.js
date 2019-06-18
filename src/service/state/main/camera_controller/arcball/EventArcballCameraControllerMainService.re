open StateDataMainType;

open EventType;

let _addEventHandleFunc =
    (cameraController, handleFunc, eventHandleFuncListMap) =>
  switch (
    eventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None =>
    eventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.set(
         cameraController,
         [handleFunc],
       )
  | Some(eventHandleFuncList) =>
    eventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.set(
         cameraController,
         [handleFunc, ...eventHandleFuncList],
       )
  };

let _addPointDragStartEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {pointDragStartEventHandleFuncListMap} as record,
    ) => {
  ...record,
  pointDragStartEventHandleFuncListMap:
    _addEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragStartEventHandleFuncListMap,
    ),
};

let _addPointDragDropEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {pointDragDropEventHandleFuncListMap} as record,
    ) => {
  ...record,
  pointDragDropEventHandleFuncListMap:
    _addEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragDropEventHandleFuncListMap,
    ),
};

let _addPointDragOverEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {pointDragOverEventHandleFuncListMap} as record,
    ) => {
  ...record,
  pointDragOverEventHandleFuncListMap:
    _addEventHandleFunc(
      cameraController,
      handleFunc,
      pointDragOverEventHandleFuncListMap,
    ),
};

let _addPointScaleEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {pointScaleEventHandleFuncListMap} as record,
    ) => {
  ...record,
  pointScaleEventHandleFuncListMap:
    _addEventHandleFunc(
      cameraController,
      handleFunc,
      pointScaleEventHandleFuncListMap,
    ),
};

let _addKeydownEventHandleFunc =
    (cameraController, handleFunc, {keydownEventHandleFuncListMap} as record) => {
  ...record,
  keydownEventHandleFuncListMap:
    _addEventHandleFunc(
      cameraController,
      handleFunc,
      keydownEventHandleFuncListMap,
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
      isTriggerKeydownEventHandler(event) ?
        TargetArcballCameraControllerMainService.setTargetByKeyboardEvent(
          cameraController,
          event,
          state,
        ) :
        state;

  let state = {
    ...state,
    arcballCameraControllerRecord:
      state.arcballCameraControllerRecord
      |> _addPointDragStartEventHandleFunc(
           cameraController,
           pointDragStartHandleFunc,
         )
      |> _addPointDragDropEventHandleFunc(
           cameraController,
           pointDragDropHandleFunc,
         )
      |> _addPointDragOverEventHandleFunc(
           cameraController,
           pointDragOverHandleFunc,
         )
      |> _addPointScaleEventHandleFunc(
           cameraController,
           pointScaleHandleFunc,
         )
      |> _addKeydownEventHandleFunc(cameraController, keydownHandleFunc),
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

let _disposePointDragStartEventHandleFuncListMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragStartEventHandleFuncListMap} = arcballCameraControllerRecord;

  switch (
    pointDragStartEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDragStartEventHandleFuncList) =>
    let state =
      pointDragStartEventHandleFuncList
      |> List.fold_left(
           (state, func) =>
             _unbindPointEvent(
               NameEventService.getPointDragStartEventName(),
               func,
               state,
             ),
           state,
         );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDragStartEventHandleFuncListMap:
          pointDragStartEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointDragDropEventHandleFuncListMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragDropEventHandleFuncListMap} = arcballCameraControllerRecord;

  switch (
    pointDragDropEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDragDropEventHandleFuncList) =>
    let state =
      pointDragDropEventHandleFuncList
      |> List.fold_left(
           (state, func) =>
             _unbindPointEvent(
               NameEventService.getPointDragDropEventName(),
               func,
               state,
             ),
           state,
         );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDragDropEventHandleFuncListMap:
          pointDragDropEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointDragOverEventHandleFuncListMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragOverEventHandleFuncListMap} = arcballCameraControllerRecord;

  switch (
    pointDragOverEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointDragOverEventHandleFuncList) =>
    let state =
      pointDragOverEventHandleFuncList
      |> List.fold_left(
           (state, func) =>
             _unbindPointEvent(
               NameEventService.getPointDragOverEventName(),
               func,
               state,
             ),
           state,
         );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointDragOverEventHandleFuncListMap:
          pointDragOverEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointScaleEventHandleFuncListMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointScaleEventHandleFuncListMap} = arcballCameraControllerRecord;

  switch (
    pointScaleEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(pointScaleEventHandleFuncList) =>
    let state =
      pointScaleEventHandleFuncList
      |> List.fold_left(
           (state, func) =>
             _unbindPointEvent(
               NameEventService.getPointScaleEventName(),
               func,
               state,
             ),
           state,
         );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        pointScaleEventHandleFuncListMap:
          pointScaleEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposeKeyDownEventHandleFuncListMap =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {keydownEventHandleFuncListMap} = arcballCameraControllerRecord;

  switch (
    keydownEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(keydownEventHandleFuncList) =>
    let state =
      keydownEventHandleFuncList
      |> List.fold_left(
           (state, func) =>
             _unbindKeyboardEvent(EventType.KeyDown, func, state),
           /* ManageEventMainService.offKeyboardEventByHandleFunc(
                ~eventName,
                ~handleFunc,
                ~state,
              ); */
           state,
         );

    {
      ...state,
      arcballCameraControllerRecord: {
        ...arcballCameraControllerRecord,
        keydownEventHandleFuncListMap:
          keydownEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let unbindEvent = (cameraController, state) =>
  state
  |> _disposePointDragStartEventHandleFuncListMap(cameraController)
  |> _disposePointDragDropEventHandleFuncListMap(cameraController)
  |> _disposePointDragOverEventHandleFuncListMap(cameraController)
  |> _disposePointScaleEventHandleFuncListMap(cameraController)
  |> _disposeKeyDownEventHandleFuncListMap(cameraController);

let unbindPointScaleEvent = (cameraController, state) =>
  state |> _disposePointScaleEventHandleFuncListMap(cameraController);

let isBindEvent =
    (cameraController, {arcballCameraControllerRecord} as state) => {
  let {pointDragStartEventHandleFuncListMap} = arcballCameraControllerRecord;

  pointDragStartEventHandleFuncListMap
  |> WonderCommonlib.MutableSparseMapService.has(cameraController);
};