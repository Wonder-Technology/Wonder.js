type rec mouseDomEventData = {
  priority: int,
  handleFunc: (. EventType.mouseEvent, po) => po,
}
and keyboardDomEventData = {
  priority: int,
  handleFunc: (. EventType.keyboardEvent, po) => po,
}
and touchDomEventData = {
  priority: int,
  handleFunc: (. EventType.touchEvent, po) => po,
}
and customEventData = {
  priority: int,
  handleFunc: (. EventType.customEvent, po) => (po, EventType.customEvent),
}
and eventRecord = {
  domEventStreamSubscription: option<WonderBsMost.Most.subscription>,
  mouseDomEventDataArrMap: WonderCommonlib.MutableSparseMap.t<int, array<mouseDomEventData>>,
  keyboardDomEventDataArrMap: WonderCommonlib.MutableSparseMap.t<int, array<keyboardDomEventData>>,
  touchDomEventDataArrMap: WonderCommonlib.MutableSparseMap.t<int, array<touchDomEventData>>,
  customGlobalEventArrMap: WonderCommonlib.MutableHashMap.t<string, array<customEventData>>,
  customGameObjectEventArrMap: WonderCommonlib.MutableHashMap.t<
    string,
    WonderCommonlib.MutableSparseMap.t<int, array<customEventData>>,
  >,
  mouseEventData: EventType.mouseEventData,
  keyboardEventData: EventType.keyboardEventData,
  touchEventData: EventType.touchEventData,
}
and po = {
  eventRecord: eventRecord,
  canvas: option<Dom.htmlCanvasElement>,
  body: option<Dom.htmlBodyElement>,
  browser: BrowserType.browser,
}
