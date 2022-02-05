open POType

open EventType

let _getBody = po => po->BodyDoService.getBodyExn->bodyToEventTarget

let setBody = (body, po) => {
  {
    ...po,
    body: Some(body),
  }
}

let _fromPointDomEvent = (eventName, po) =>
  WonderBsMost.Most.fromEvent(eventName, _getBody(po), false)

let _fromMobilePointDomEvent = (eventName, po) => {
  WonderBsMost.Most.fromEvent(eventName, _getBody(po), {"passive": false}->Obj.magic)
}

let _fromTouchMoveDomEventAndPreventnDefault = po =>
  _fromMobilePointDomEvent("touchmove", po)->WonderBsMost.Most.tap(
    event =>
      HandlePointDomEventDoService.preventDefault(
        event->eventTargetToTouchDomEvent->touchDomEventToPointDomEvent,
      ),
    _,
  )

let _fromKeyboardDomEvent = (eventName, po) =>
  WonderBsMost.Most.fromEvent(eventName, _getBody(po), false)

let _convertMouseEventToPointEvent = (
  eventName,
  {location, locationInView, button, wheel, movementDelta, event}: mouseEvent,
) => {
  name: eventName,
  location: location,
  locationInView: locationInView,
  button: Some(button),
  wheel: Some(wheel),
  movementDelta: movementDelta,
  event: event->mouseDomEventToPointDomEvent,
}

let _bindDomEventToTriggerPointEvent = (
  (domEventName, customEventName, pointEventName),
  (onDomEventFunc, convertDomEventToPointEventFunc),
  po,
) =>
  onDomEventFunc(
    ~eventName=domEventName,
    ~handleFunc=(. mouseEvent, po) => {
      let (po, _) = ManageEventDoService.triggerCustomGlobalEvent(
        CreateCustomEventDoService.create(
          customEventName,
          convertDomEventToPointEventFunc(pointEventName, mouseEvent)->pointEventToUserData->Some,
        ),
        po,
      )

      po
    },
    ~po,
    (),
  )

let _bindMouseEventToTriggerPointEvent = (po, mouseEventName, customEventName, pointEventName) =>
  _bindDomEventToTriggerPointEvent(
    (mouseEventName, customEventName, pointEventName),
    (ManageEventDoService.onMouseEvent(~priority=0), _convertMouseEventToPointEvent),
    po,
  )

let _convertTouchEventToPointEvent = (
  eventName,
  {location, locationInView, touchData, movementDelta, event}: touchEvent,
) => {
  name: eventName,
  location: location,
  locationInView: locationInView,
  button: None,
  wheel: None,
  movementDelta: movementDelta,
  event: event->touchDomEventToPointDomEvent,
}

let _bindTouchEventToTriggerPointEvent = (po, touchEventName, customEventName, pointEventName) =>
  _bindDomEventToTriggerPointEvent(
    (touchEventName, customEventName, pointEventName),
    (ManageEventDoService.onTouchEvent(~priority=0), _convertTouchEventToPointEvent),
    po,
  )

let bindDomEventToTriggerPointEvent = po =>
  switch BrowserDoService.getBrowser(po) {
  | Chrome
  | Firefox =>
    po
    ->_bindMouseEventToTriggerPointEvent(Click, NameEventDoService.getPointTapEventName(), PointTap)
    ->_bindMouseEventToTriggerPointEvent(MouseUp, NameEventDoService.getPointUpEventName(), PointUp)
    ->_bindMouseEventToTriggerPointEvent(
      MouseDown,
      NameEventDoService.getPointDownEventName(),
      PointDown,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseWheel,
      NameEventDoService.getPointScaleEventName(),
      PointScale,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseMove,
      NameEventDoService.getPointMoveEventName(),
      PointMove,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseDragStart,
      NameEventDoService.getPointDragStartEventName(),
      PointDragStart,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseDragOver,
      NameEventDoService.getPointDragOverEventName(),
      PointDragOver,
    )
    ->_bindMouseEventToTriggerPointEvent(
      MouseDragDrop,
      NameEventDoService.getPointDragDropEventName(),
      PointDragDrop,
    )
  | Android
  | IOS =>
    po
    ->_bindTouchEventToTriggerPointEvent(
      TouchTap,
      NameEventDoService.getPointTapEventName(),
      PointTap,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchEnd,
      NameEventDoService.getPointUpEventName(),
      PointUp,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchStart,
      NameEventDoService.getPointDownEventName(),
      PointDown,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchMove,
      NameEventDoService.getPointMoveEventName(),
      PointMove,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchDragStart,
      NameEventDoService.getPointDragStartEventName(),
      PointDragStart,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchDragOver,
      NameEventDoService.getPointDragOverEventName(),
      PointDragOver,
    )
    ->_bindTouchEventToTriggerPointEvent(
      TouchDragDrop,
      NameEventDoService.getPointDragDropEventName(),
      PointDragDrop,
    )
  // | browser =>
  //   WonderLog.Log.fatal(
  //     WonderLog.Log.buildFatalMessage(
  //       ~title="bindDomEventToTriggerPointEvent",
  //       ~description=j`unknown browser`,
  //       ~reason="",
  //       ~solution=j``,
  //       ~params=j`browser:$browser`,
  //     ),
  //   )
  }

let _preventContextMenuEvent = event => {
  HandleDomEventDoService.preventDefault(event->EventType.eventTargetToDomEvent)->ignore

  ()
}

let _execMouseEventHandle = (eventName, event) => {
  let po = ContainerManager.getPO()

  po
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(eventName, _, po),
  )
  ->ContainerManager.setPO

  ()
}

let _execMouseChangePositionEventHandle = (mouseEventName, event, setPositionFunc) => {
  let po = ContainerManager.getPO()

  let mouseEvent =
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(mouseEventName, _, po)

  po
  ->HandleMouseEventDoService.execEventHandle(mouseEvent)
  ->setPositionFunc(mouseEvent)
  ->ContainerManager.setPO

  ()
}

let _execMouseMoveEventHandle = (mouseEventName, event) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    event,
    HandleMouseEventDoService.setLastXYWhenMouseMove,
  )

let _execMouseDragingEventHandle = (mouseEventName, event) =>
  _execMouseChangePositionEventHandle(
    mouseEventName,
    event,
    HandleMouseEventDoService.setLastXYByLocation,
  )

let _execMouseDragStartEventHandle = event => {
  let po = ContainerManager.getPO()

  po
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(MouseDragStart, _, po),
  )
  ->HandleMouseEventDoService.setIsDrag(true)
  ->HandleMouseEventDoService.setLastXY(None, None)
  ->ContainerManager.setPO

  ()
}

let _execMouseDragDropEventHandle = event => {
  let po = ContainerManager.getPO()

  po
  ->HandleMouseEventDoService.execEventHandle(
    event
    ->eventTargetToMouseDomEvent
    ->HandleMouseEventDoService.convertMouseDomEventToMouseEvent(MouseDragDrop, _, po),
  )
  ->HandleMouseEventDoService.setIsDrag(false)
  ->ContainerManager.setPO

  ()
}

let _execTouchEventHandle = (touchEventName, event) => {
  ContainerManager.getPO()
  ->HandleTouchEventDoService.execEventHandle(touchEventName, event->eventTargetToTouchDomEvent)
  ->ContainerManager.setPO

  ()
}

let _execTouchChangePositionEventHandle = (touchEventName, event, setPositonFunc) => {
  ContainerManager.getPO()
  ->HandleTouchEventDoService.execEventHandle(touchEventName, event->eventTargetToTouchDomEvent)
  ->setPositonFunc(touchEventName, event->eventTargetToTouchDomEvent)
  ->ContainerManager.setPO

  ()
}

let _execTouchMoveEventHandle = (touchEventName, event) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    event,
    HandleTouchEventDoService.setLastXYWhenTouchMove,
  )

let _execTouchDragingEventHandle = (touchEventName, event) =>
  _execTouchChangePositionEventHandle(
    touchEventName,
    event,
    HandleTouchEventDoService.setLastXYByLocation,
  )

let _execTouchDragStartEventHandle = event => {
  ContainerManager.getPO()
  ->HandleTouchEventDoService.execEventHandle(TouchDragStart, event->eventTargetToTouchDomEvent)
  ->HandleTouchEventDoService.setIsDrag(true)
  ->HandleTouchEventDoService.setLastXY(None, None)
  ->ContainerManager.setPO

  ()
}

let _execTouchDragDropEventHandle = event => {
  ContainerManager.getPO()
  ->HandleTouchEventDoService.execEventHandle(TouchDragDrop, event->eventTargetToTouchDomEvent)
  ->HandleTouchEventDoService.setIsDrag(false)
  ->ContainerManager.setPO

  ()
}

let _execKeyboardEventHandle = (keyboardEventName, event) => {
  ContainerManager.getPO()
  ->HandleKeyboardEventDoService.execEventHandle(
    keyboardEventName,
    event->eventTargetToKeyboardDomEvent,
  )
  ->ContainerManager.setPO

  ()
}

let _fromPCDomEventArr = po => [
  WonderBsMost.Most.fromEvent(
    "contextmenu",
    _getBody(po),
    false,
  )->WonderBsMost.Most.tap(event => _preventContextMenuEvent(event), _),
  _fromPointDomEvent("click", po)->WonderBsMost.Most.tap(
    event => _execMouseEventHandle(Click, event),
    _,
  ),
  _fromPointDomEvent("mousedown", po)->WonderBsMost.Most.tap(
    event => _execMouseEventHandle(MouseDown, event),
    _,
  ),
  _fromPointDomEvent("mouseup", po)->WonderBsMost.Most.tap(
    event => _execMouseEventHandle(MouseUp, event),
    _,
  ),
  _fromPointDomEvent("mousemove", po)->WonderBsMost.Most.tap(
    event => _execMouseMoveEventHandle(MouseMove, event),
    _,
  ),
  _fromPointDomEvent("mousewheel", po)->WonderBsMost.Most.tap(
    event => _execMouseEventHandle(MouseWheel, event),
    _,
  ),
  _fromPointDomEvent("mousedown", po)
  ->WonderBsMost.Most.tap(event => _execMouseDragStartEventHandle(event), _)
  ->WonderBsMost.Most.flatMap(
    event =>
      _fromPointDomEvent("mousemove", po)
      ->WonderBsMost.Most.skip(2, _)
      ->WonderBsMost.Most.until(
        _fromPointDomEvent("mouseup", po)->WonderBsMost.Most.tap(
          event => _execMouseDragDropEventHandle(event),
          _,
        ),
        _,
      ),
    /* !
         fix chrome bug for getMovementDeltaWhenPointerLocked:
         the first movementDelta->x >100!
 */

    _,
  )
  ->WonderBsMost.Most.tap(event => _execMouseDragingEventHandle(MouseDragOver, event), _),
  _fromKeyboardDomEvent("keyup", po)->WonderBsMost.Most.tap(
    event => _execKeyboardEventHandle(KeyUp, event),
    _,
  ),
  _fromKeyboardDomEvent("keydown", po)->WonderBsMost.Most.tap(
    event => _execKeyboardEventHandle(KeyDown, event),
    _,
  ),
  _fromKeyboardDomEvent("keypress", po)->WonderBsMost.Most.tap(
    event => _execKeyboardEventHandle(KeyPress, event),
    _,
  ),
]

let _fromMobileDomEventArr = po => [
  _fromMobilePointDomEvent("touchend", po)
  ->WonderBsMost.Most.since(_fromMobilePointDomEvent("touchstart", po), _)
  ->WonderBsMost.Most.tap(event => _execTouchEventHandle(TouchTap, event), _),
  _fromMobilePointDomEvent("touchend", po)->WonderBsMost.Most.tap(
    event => _execTouchEventHandle(TouchEnd, event),
    _,
  ),
  _fromMobilePointDomEvent("touchstart", po)->WonderBsMost.Most.tap(
    event => _execTouchEventHandle(TouchStart, event),
    _,
  ),
  _fromTouchMoveDomEventAndPreventnDefault(po)->WonderBsMost.Most.tap(
    event => _execTouchMoveEventHandle(TouchMove, event),
    _,
  ),
  _fromMobilePointDomEvent("touchstart", po)
  ->WonderBsMost.Most.tap(event => _execTouchDragStartEventHandle(event), _)
  ->WonderBsMost.Most.flatMap(
    event =>
      _fromTouchMoveDomEventAndPreventnDefault(po)->WonderBsMost.Most.until(
        _fromMobilePointDomEvent("touchend", po)->WonderBsMost.Most.tap(
          event => _execTouchDragDropEventHandle(event),
          _,
        ),
        _,
      ),
    _,
  )
  ->WonderBsMost.Most.tap(event => _execTouchDragingEventHandle(TouchDragOver, event), _),
]

let fromDomEvent = po =>
  WonderBsMost.Most.mergeArray(
    switch BrowserDoService.getBrowser(po) {
    | Chrome
    | Firefox =>
      _fromPCDomEventArr(po)
    | Android
    | IOS =>
      _fromMobileDomEventArr(po)
    // | browser =>
    //   WonderLog.Log.fatal(
    //     WonderLog.Log.buildFatalMessage(
    //       ~title="fromDomEvent",
    //       ~description=j`unknown browser`,
    //       ~reason="",
    //       ~solution=j``,
    //       ~params=j`browser:$browser`,
    //     ),
    //   )
    },
  )

let handleDomEventStreamError = e => {
  WonderCommonlib.Log.logForDebug(e)
}

let initEvent = po => {
  let domEventStreamSubscription = fromDomEvent(po)->WonderBsMost.Most.subscribe(
    {
      "next": _ => (),
      "error": e => handleDomEventStreamError(e),
      "complete": () => (),
    },
    _,
  )

  po
  ->ManageEventDoService.setDomEventStreamSubscription(domEventStreamSubscription)
  ->bindDomEventToTriggerPointEvent
}
