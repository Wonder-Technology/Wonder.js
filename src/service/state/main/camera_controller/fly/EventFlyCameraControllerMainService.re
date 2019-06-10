open StateDataMainType;

open EventType;

open FlyCameraControllerType;

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
      {pointDragStartEventHandleFuncListMap} as record: flyCameraControllerRecord,
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
      {pointDragDropEventHandleFuncListMap} as record: flyCameraControllerRecord,
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
      {pointDragOverEventHandleFuncListMap} as record: flyCameraControllerRecord,
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
      {pointScaleEventHandleFuncListMap} as record: flyCameraControllerRecord,
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
    (
      cameraController,
      handleFunc,
      {keydownEventHandleFuncListMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  keydownEventHandleFuncListMap:
    _addEventHandleFunc(
      cameraController,
      handleFunc,
      keydownEventHandleFuncListMap,
    ),
};

let _addKeyupEventHandleFunc =
    (
      cameraController,
      handleFunc,
      {keyupEventHandleFuncListMap} as record: flyCameraControllerRecord,
    ) => {
  ...record,
  keyupEventHandleFuncListMap:
    _addEventHandleFunc(
      cameraController,
      handleFunc,
      keyupEventHandleFuncListMap,
    ),
};

let _changeOrbit =
    (
      cameraController,
      {movementDelta},
      {flyCameraControllerRecord, viewRecord} as state,
    ) => {
  let (x, y) = movementDelta;
  let rotateSpeed =
    OperateFlyCameraControllerService.unsafeGetRotateSpeed(
      cameraController,
      flyCameraControllerRecord,
    );
  let canvasHeight =
    (
      ViewService.unsafeGetCanvas(viewRecord)
      |> WonderWebgl.DomExtendType.htmlElementToJsObj
    )##height;

  let factor = canvasHeight === 0. ? 0. : rotateSpeed /. canvasHeight;

  flyCameraControllerRecord
  |> OperateFlyCameraControllerService.setEulerAngleDiff(
       cameraController,
       {
         diffX: factor *. (y |> float_of_int),
         diffY: factor *. (x |> float_of_int),
       },
     );
};

let _addUniqueDirection = (direction, array) =>
  array
  |> ArrayService.push(direction)
  |> ArrayService.removeDuplicateItems((. item) =>
       FlyCameraControllerType.convertDirectionToString(item)
     );

let _moveSpecificDirection =
    (
      cameraController,
      keyboardEvent: keyboardEvent,
      {flyCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let directionArray =
    OperateFlyCameraControllerService.getDirectionArray(
      flyCameraControllerRecord,
    );

  let directionArray =
    switch (keyboardEvent.key) {
    | "a"
    | "left" => directionArray |> _addUniqueDirection(Left)
    | "d"
    | "right" => directionArray |> _addUniqueDirection(Right)
    | "w"
    | "up" => directionArray |> _addUniqueDirection(Front)
    | "s"
    | "down" => directionArray |> _addUniqueDirection(Back)
    | "q" => directionArray |> _addUniqueDirection(Up)
    | "e" => directionArray |> _addUniqueDirection(Down)
    | _ => directionArray
    };

  {
    ...state,
    flyCameraControllerRecord:
      flyCameraControllerRecord
      |> OperateFlyCameraControllerService.setDirectionArray(directionArray),
  };
};

let _removeSpecificDirection = (direction, array) =>
  array |> Js.Array.filter(item => item != direction);

let _staticSpecificDirection =
    (
      cameraController,
      keyboardEvent: keyboardEvent,
      {flyCameraControllerRecord, gameObjectRecord} as state,
    ) => {
  let directionArray =
    OperateFlyCameraControllerService.getDirectionArray(
      flyCameraControllerRecord,
    );

  let directionArray =
    switch (keyboardEvent.key) {
    | "a"
    | "left" => directionArray |> _removeSpecificDirection(Left)
    | "d"
    | "right" => directionArray |> _removeSpecificDirection(Right)
    | "w"
    | "up" => directionArray |> _removeSpecificDirection(Front)
    | "s"
    | "down" => directionArray |> _removeSpecificDirection(Back)
    | "q" => directionArray |> _removeSpecificDirection(Up)
    | "e" => directionArray |> _removeSpecificDirection(Down)
    | _ => directionArray
    };

  {
    ...state,
    flyCameraControllerRecord:
      flyCameraControllerRecord
      |> OperateFlyCameraControllerService.setDirectionArray(directionArray),
  };
};

let _translationByPointScale =
    (cameraController, pointEvent: pointEvent, flyCameraControllerRecord) => {
  let wheelSpeed =
    OperateFlyCameraControllerService.unsafeGetWheelSpeed(
      cameraController,
      flyCameraControllerRecord,
    );

  switch (pointEvent.wheel) {
  | None => flyCameraControllerRecord
  | Some(wheel) =>
    flyCameraControllerRecord
    |> OperateFlyCameraControllerService.setTranslationDiff(
         cameraController,
         (0., 0., -. wheelSpeed *. (wheel |> float_of_int)),
       )
  };
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
    (. event: EventType.customEvent, {flyCameraControllerRecord} as state) => (
      {
        ...state,
        flyCameraControllerRecord:
          _changeOrbit(
            cameraController,
            event.userData
            |> OptionService.unsafeGet
            |> EventType.userDataToPointEvent,
            state,
          ),
      },
      event,
    );

  let pointScaleHandleFunc =
    (. event: EventType.customEvent, {flyCameraControllerRecord} as state) => {
      let pointEvent =
        event.userData
        |> OptionService.unsafeGet
        |> EventType.userDataToPointEvent;

      HandlePointDomEventMainService.preventDefault(pointEvent.event);

      (
        {
          ...state,
          flyCameraControllerRecord:
            _translationByPointScale(
              cameraController,
              pointEvent,
              flyCameraControllerRecord,
            ),
        },
        event,
      );
    };
  let keydownHandleFunc =
    (. event: EventType.keyboardEvent, {flyCameraControllerRecord} as state) =>
      isTriggerKeydownEventHandler(event) ?
        _moveSpecificDirection(cameraController, event, state) : state;

  let keyupHandleFunc =
    (. event: EventType.keyboardEvent, {flyCameraControllerRecord} as state) =>
      _staticSpecificDirection(cameraController, event, state);

  let state = {
    ...state,
    flyCameraControllerRecord:
      state.flyCameraControllerRecord
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
      |> _addKeydownEventHandleFunc(cameraController, keydownHandleFunc)
      |> _addKeyupEventHandleFunc(cameraController, keyupHandleFunc),
  };

  (
    state,
    pointDragStartHandleFunc,
    pointDragDropHandleFunc,
    pointDragOverHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
    keyupHandleFunc,
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
    keyupHandleFunc,
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

  let state =
    ManageEventMainService.onKeyboardEvent(
      ~eventName=EventType.KeyUp,
      ~handleFunc=keyupHandleFunc,
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
    (cameraController, {flyCameraControllerRecord} as state) => {
  let {pointDragStartEventHandleFuncListMap}: flyCameraControllerRecord = flyCameraControllerRecord;

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
      flyCameraControllerRecord: {
        ...flyCameraControllerRecord,
        pointDragStartEventHandleFuncListMap:
          pointDragStartEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointDragDropEventHandleFuncListMap =
    (cameraController, {flyCameraControllerRecord} as state) => {
  let {pointDragDropEventHandleFuncListMap}: flyCameraControllerRecord = flyCameraControllerRecord;

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
      flyCameraControllerRecord: {
        ...flyCameraControllerRecord,
        pointDragDropEventHandleFuncListMap:
          pointDragDropEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointDragOverEventHandleFuncListMap =
    (cameraController, {flyCameraControllerRecord} as state) => {
  let {pointDragOverEventHandleFuncListMap}: flyCameraControllerRecord = flyCameraControllerRecord;

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
      flyCameraControllerRecord: {
        ...flyCameraControllerRecord,
        pointDragOverEventHandleFuncListMap:
          pointDragOverEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposePointScaleEventHandleFuncListMap =
    (cameraController, {flyCameraControllerRecord} as state) => {
  let {pointScaleEventHandleFuncListMap}: flyCameraControllerRecord = flyCameraControllerRecord;

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
      flyCameraControllerRecord: {
        ...flyCameraControllerRecord,
        pointScaleEventHandleFuncListMap:
          pointScaleEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};
let _disposeKeyDownEventHandleFuncListMap =
    (cameraController, {flyCameraControllerRecord} as state) => {
  let {keydownEventHandleFuncListMap}: flyCameraControllerRecord = flyCameraControllerRecord;

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
           state,
         );

    {
      ...state,
      flyCameraControllerRecord: {
        ...flyCameraControllerRecord,
        keydownEventHandleFuncListMap:
          keydownEventHandleFuncListMap
          |> DisposeComponentService.disposeSparseMapData(cameraController),
      },
    };
  };
};

let _disposeKeyUpEventHandleFuncListMap =
    (cameraController, {flyCameraControllerRecord} as state) => {
  let {keyupEventHandleFuncListMap}: flyCameraControllerRecord = flyCameraControllerRecord;

  switch (
    keyupEventHandleFuncListMap
    |> WonderCommonlib.MutableSparseMapService.get(cameraController)
  ) {
  | None => state
  | Some(keyupEventHandleFuncList) =>
    let state =
      keyupEventHandleFuncList
      |> List.fold_left(
           (state, func) =>
             _unbindKeyboardEvent(EventType.KeyUp, func, state),
           state,
         );

    {
      ...state,
      flyCameraControllerRecord: {
        ...flyCameraControllerRecord,
        keyupEventHandleFuncListMap:
          keyupEventHandleFuncListMap
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
  |> _disposeKeyDownEventHandleFuncListMap(cameraController)
  |> _disposeKeyUpEventHandleFuncListMap(cameraController);

let unbindPointScaleEvent = (cameraController, state) =>
  state |> _disposePointScaleEventHandleFuncListMap(cameraController);

let isBindEvent = (cameraController, {flyCameraControllerRecord} as state) => {
  let {pointDragStartEventHandleFuncListMap}: flyCameraControllerRecord = flyCameraControllerRecord;

  pointDragStartEventHandleFuncListMap
  |> WonderCommonlib.MutableSparseMapService.has(cameraController);
};