let getPointDownEventName = NameEventService.getPointDownEventName;

let getPointUpEventName = NameEventService.getPointUpEventName;

let getPointTapEventName = NameEventService.getPointTapEventName;

let getPointMoveEventName = NameEventService.getPointMoveEventName;

let getPointScaleEventName = NameEventService.getPointScaleEventName;

let getPointDragStartEventName = NameEventService.getPointDragStartEventName;

let getPointDragOverEventName = NameEventService.getPointDragOverEventName;

let getPointDragDropEventName = NameEventService.getPointDragDropEventName;

let createCustomEvent = (~eventName, ~userData=None, ()) =>
  ManageEventAPI.createCustomEvent(
    eventName,
    Js.Nullable.fromOption(userData),
  );