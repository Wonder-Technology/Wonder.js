open POType

open EventType

let _triggerHandleFunc = (customEvent, arr, po) =>
  arr -> WonderCommonlib.ArraySt.reduceOneParam(
    (. (po, customEvent), {handleFunc}) =>
      customEvent.isStopPropagation ? (po, customEvent) : handleFunc(. customEvent, po),
    (po, customEvent),
  )

let stopPropagation = customEvent => {
  ...customEvent,
  isStopPropagation: true,
}

let triggerGlobalEvent = (({name}: customEvent) as customEvent, {eventRecord} as po) => {
  let {customGlobalEventArrMap} = eventRecord

  switch customGlobalEventArrMap -> WonderCommonlib.MutableHashMap.get(name) {
  | None => (po, customEvent)
  | Some(arr) => _triggerHandleFunc(customEvent, arr, po)
  }
}

// let triggerGameObjectEvent = (
//   target,
//   ({name}: customEvent) as customEvent,
//   {eventRecord} as po,
// ) => {
//   let {customGameObjectEventArrMap} = eventRecord

//   switch customGameObjectEventArrMap -> WonderCommonlib.MutableHashMap.get(name) {
//   | None => (po, customEvent)
//   | Some(gameObjectEventListMap) =>
//     switch gameObjectEventListMap -> WonderCommonlib.MutableSparseMap.get(target) {
//     | None => (po, customEvent)
//     | Some(arr) => _triggerHandleFunc({...customEvent, target: Some(target)}, arr, po)
//     }
//   }
// }

// let rec _broadcastGameObjectEvent = (eventName, target, customEvent, po) => {
//   let (po, customEvent) = triggerGameObjectEvent(target, customEvent, po)

//   let transformRecord = RecordTransformDoService.getRecord(po)

//   HierachyTransformService.unsafeGetChildren(
//     GetComponentGameObjectService.unsafeGetTransformComponent(target, po.gameObjectRecord),
//     transformRecord,
//   ) -> WonderCommonlib.ArraySt.reduceOneParam(
//     (. po, child) => _broadcastGameObjectEvent(eventName, child, customEvent, po),
//     po,
//   )
// }

// let broadcastGameObjectEvent = (target, ({name}: customEvent) as customEvent, po) =>
//   _broadcastGameObjectEvent(name, target, {...customEvent, phase: Some(Broadcast)}, po)

// let rec _emitGameObjectEvent = (eventName, target, customEvent, po) => {
//   let (po, customEvent) = triggerGameObjectEvent(target, customEvent, po)

//   let transformRecord = RecordTransformDoService.getRecord(po)

//   switch HierachyTransformService.getParent(
//     GetComponentGameObjectService.unsafeGetTransformComponent(target, po.gameObjectRecord),
//     transformRecord,
//   ) {
//   | None => po
//   | Some(parent) => _emitGameObjectEvent(eventName, parent, customEvent, po)
//   }
// }

// let emitGameObjectEvent = (target, ({name}: customEvent) as customEvent, po) =>
//   _emitGameObjectEvent(name, target, {...customEvent, phase: Some(Emit)}, po)

let getCustomEventUserData = (customEvent: customEvent) => customEvent.userData
