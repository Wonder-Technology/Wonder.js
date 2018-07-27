open StateDataMainType;

open EventType;

let initArcballCameraController = (cameraController, state) =>
  EventArcballCameraControllerMainService.bindEvent(cameraController, state);

let init = ({arcballCameraControllerRecord} as state) =>
  arcballCameraControllerRecord.dirtyArray
  |> WonderCommonlib.ArrayService.removeDuplicateItems
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. state, dirtyIndex) =>
         initArcballCameraController(dirtyIndex, state),
       state,
     );