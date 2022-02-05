let addToEventArr = (eventName, eventData, getPriorityFunc, eventArrMap) =>
  switch eventArrMap->WonderCommonlib.MutableSparseMap.get(eventName) {
  | None => eventArrMap->WonderCommonlib.MutableSparseMap.set(eventName, [eventData])
  | Some(arr) =>
    eventArrMap->WonderCommonlib.MutableSparseMap.set(
      eventName,
      arr
      ->WonderCommonlib.ArraySt.push(eventData)
      ->Js.Array.sortInPlaceWith(
        (eventDataA, eventDataB) => getPriorityFunc(eventDataB) - getPriorityFunc(eventDataA),
        _,
      ),
    )
  }

let removeFromEventArrMapByHandleFunc = (
  eventName,
  (getHandleFuncFunc, targetHandleFunc),
  eventArrMap,
) =>
  switch eventArrMap->WonderCommonlib.MutableSparseMap.get(eventName) {
  | None => eventArrMap
  | Some(arr) =>
    eventArrMap->WonderCommonlib.MutableSparseMap.set(
      eventName,
      arr->Js.Array.filter(domEventData => getHandleFuncFunc(domEventData) !== targetHandleFunc, _),
    )
  }
