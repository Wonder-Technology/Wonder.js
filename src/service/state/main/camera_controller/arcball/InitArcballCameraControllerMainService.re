open StateDataMainType;

open EventType;

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

let initArcballCameraController = (cameraController, state) => {
  let pointDragHandleFunc =
    (.
      event: EventType.customEvent,
      {arcballCameraControllerRecord} as state,
    ) => {
      ...state,
      arcballCameraControllerRecord:
        _changeOrbit(
          cameraController,
          event.userData
          |> OptionService.unsafeGet
          |> EventType.userDataToPointEvent,
          arcballCameraControllerRecord,
        ),
    };

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

      {
        ...state,
        arcballCameraControllerRecord:
          OperateArcballCameraControllerService.setDistanceByEvent(
            cameraController,
            pointEvent,
            arcballCameraControllerRecord,
          ),
      };
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
      |> EventArcballCameraControllerMainService.setPointDragEventHandleFunc(
           cameraController,
           pointDragHandleFunc,
         )
      |> EventArcballCameraControllerMainService.setPointScaleEventHandleFunc(
           cameraController,
           pointScaleHandleFunc,
         )
      |> EventArcballCameraControllerMainService.setKeydownEventHandleFunc(
           cameraController,
           keydownHandleFunc,
         ),
  };

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

let init = ({arcballCameraControllerRecord} as state) =>
  arcballCameraControllerRecord.dirtyArray
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, dirtyIndex) =>
         initArcballCameraController(dirtyIndex, state),
       state,
     );