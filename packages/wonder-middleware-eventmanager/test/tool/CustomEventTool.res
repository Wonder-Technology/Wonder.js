let getPointDownEventName = NameEventDoService.getPointDownEventName

let getPointUpEventName = NameEventDoService.getPointUpEventName

let getPointTapEventName = NameEventDoService.getPointTapEventName

let getPointMoveEventName = NameEventDoService.getPointMoveEventName

let getPointScaleEventName = NameEventDoService.getPointScaleEventName

let getPointDragStartEventName = NameEventDoService.getPointDragStartEventName

let getPointDragOverEventName = NameEventDoService.getPointDragOverEventName

let getPointDragDropEventName = NameEventDoService.getPointDragDropEventName

let createCustomEvent = (~eventName, ~userData=None, ()) =>
  ManageEventAPI.createCustomEvent(eventName, Js.Nullable.fromOption(userData))
