let addToEventArr = (eventName, eventData, getPriorityFunc, eventArrMap) =>
  switch (eventArrMap |> WonderCommonlib.SparseMapService.get(eventName)) {
  | None =>
    eventArrMap
    |> WonderCommonlib.SparseMapService.set(eventName, [|eventData|])
  | Some(arr) =>
    eventArrMap
    |> WonderCommonlib.SparseMapService.set(
         eventName,
         arr
         |> ArrayService.push(eventData)
         |> Js.Array.sortInPlaceWith((eventDataA, eventDataB) =>
              getPriorityFunc(eventDataB) - getPriorityFunc(eventDataA)
            ),
       )
  };

let removeFromEventArrMapByHandleFunc =
    (eventName, (getHandleFuncFunc, targetHandleFunc), eventArrMap) =>
  switch (eventArrMap |> WonderCommonlib.SparseMapService.get(eventName)) {
  | None => eventArrMap
  | Some(arr) =>
    eventArrMap
    |> WonderCommonlib.SparseMapService.set(
         eventName,
         arr
         |> Js.Array.filter(domEventData =>
              getHandleFuncFunc(domEventData) !== targetHandleFunc
            ),
       )
  };