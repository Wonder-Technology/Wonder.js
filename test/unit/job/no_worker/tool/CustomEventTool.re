let getPointDownEventName = NameEventService.getPointDownEventName;

let getPointUpEventName = NameEventService.getPointUpEventName;

let getPointTapEventName = NameEventService.getPointTapEventName;

let getPointMoveEventName = NameEventService.getPointMoveEventName;

let getPointScaleEventName = NameEventService.getPointScaleEventName;

let getPointDragEventName = NameEventService.getPointDragEventName;

let createCustomEvent = (~eventName, ~userData=None, ()) =>
  ManageEventAPI.createCustomEvent(
    eventName,
    Js.Nullable.fromOption(userData),
  );