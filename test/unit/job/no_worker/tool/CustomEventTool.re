let getPointDownEventName = NameEventService.getPointDownEventName;

let createCustomEvent = (~eventName, ~userData=None, ()) =>
  CreateCustomEventMainService.create(eventName, userData);