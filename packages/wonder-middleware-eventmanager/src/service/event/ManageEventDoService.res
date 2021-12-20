open POType

open EventType

let onMouseEvent = (~eventName, ~handleFunc, ~po, ~priority=0, ()) =>
  BindMouseDomEventDoService.bind(eventName, priority, handleFunc, po)

let onKeyboardEvent = (~eventName, ~handleFunc, ~po, ~priority=0, ()) =>
  BindKeyboardDomEventDoService.bind(eventName, priority, handleFunc, po)

let onTouchEvent = (~eventName, ~handleFunc, ~po, ~priority=0, ()) =>
  BindTouchDomEventDoService.bind(eventName, priority, handleFunc, po)

let offMouseEventByHandleFunc = (~eventName, ~handleFunc, ~po) =>
  BindMouseDomEventDoService.unbindByHandleFunc(eventName, handleFunc, po)

let offKeyboardEventByHandleFunc = (~eventName, ~handleFunc, ~po) =>
  BindKeyboardDomEventDoService.unbindByHandleFunc(eventName, handleFunc, po)

let offTouchEventByHandleFunc = (~eventName, ~handleFunc, ~po) =>
  BindTouchDomEventDoService.unbindByHandleFunc(eventName, handleFunc, po)

let onCustomGlobalEvent = (~eventName, ~handleFunc, ~po, ~priority=0, ()) =>
  BindCustomEventDoService.bindGlobalEvent(eventName, priority, handleFunc, po)

let offCustomGlobalEventByEventName = (~eventName, ~po) =>
  BindCustomEventDoService.unbindGlobalEventByEventName(eventName, po)

let offCustomGlobalEventByHandleFunc = (~eventName, ~handleFunc, ~po) =>
  BindCustomEventDoService.unbindGlobalEventByHandleFunc(eventName, handleFunc, po)

// let onCustomGameObjectEvent = (~eventName, ~handleFunc, ~target, ~po, ~priority=0, ()) =>
//   BindCustomEventDoService.bindGameObjectEvent((eventName, priority, target), handleFunc, po)

// let offCustomGameObjectEventByTarget = (~eventName, ~target, ~po) =>
//   BindCustomEventDoService.unbindGameObjectEventByTarget((eventName, target), po)

// let offCustomGameObjectEventByHandleFunc = (~eventName, ~handleFunc, ~target, ~po) =>
//   BindCustomEventDoService.unbindGameObjectEventByHandleFunc((eventName, target), handleFunc, po)

/* let execDomEventHandle = (eventName, domEvent, po) =>
   switch (eventName) {
   | MouseDown
   | MouseUp =>
     HandleMouseEventDoService.execEventHandle(eventName, domEvent, po)
   }; */

let stopPropagationCustomEvent = customEvent =>
  HandleCustomEventDoService.stopPropagation(customEvent)

let triggerCustomGlobalEvent = (customEvent, po) =>
  HandleCustomEventDoService.triggerGlobalEvent(customEvent, po)

// let triggerCustomGameObjectEvent = (customEvent, target, po) =>
//   HandleCustomEventDoService.triggerGameObjectEvent(target, customEvent, po)

// let broadcastCustomGameObjectEvent = (customEvent, target, po) =>
//   HandleCustomEventDoService.broadcastGameObjectEvent(target, customEvent, po)

// let emitCustomGameObjectEvent = (customEvent, target, po) =>
//   HandleCustomEventDoService.emitGameObjectEvent(target, customEvent, po)

let setDomEventStreamSubscription = ({eventRecord} as po, domEventStreamSubscription) => {
  ...po,
  eventRecord: {
    ...eventRecord,
    domEventStreamSubscription: Some(domEventStreamSubscription),
  },
}

let _unsubscribeDomEventStream = %raw(`
  function(domEventStreamSubscription){
  domEventStreamSubscription.unsubscribe();
  }
  `)

let unsubscribeDomEventStream = ({eventRecord} as po) =>
  switch eventRecord.domEventStreamSubscription {
  | None => po
  | Some(domEventStreamSubscription) =>
    /* let unsubscribe = domEventStreamSubscription##unsubscribe;
     unsubscribe(); */
    _unsubscribeDomEventStream(domEventStreamSubscription)

    po
  }
