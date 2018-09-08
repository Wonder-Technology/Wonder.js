open StateDataMainType;

let bindEvent = (cameraController, state) => {
  let (
    state,
    pointDownHandleFunc,
    pointUpHandleFunc,
    pointDragHandleFunc,
    pointScaleHandleFunc,
    keydownHandleFunc,
  ) =
    EventArcballCameraControllerMainService.prepareBindEvent(
      cameraController,
      state,
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=Editor.getPointDownEventName(),
      ~handleFunc=pointDownHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=Editor.getPointUpEventName(),
      ~handleFunc=pointUpHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=Editor.getPointDragEventName(),
      ~handleFunc=pointDragHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onCustomGlobalEvent(
      ~eventName=Editor.getPointScaleEventName(),
      ~handleFunc=pointScaleHandleFunc,
      ~state,
      (),
    );

  let state =
    ManageEventMainService.onKeyboardEvent(
      ~eventName=EditorType.KeyDown_editor |> Obj.magic,
      ~handleFunc=keydownHandleFunc,
      ~state,
      (),
    );

  state;
};