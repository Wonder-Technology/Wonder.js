open StateDataMainType;

open EventType;

let _addToEventArr = (eventName, eventData, eventArrMap) =>
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
         |> Js.Array.sortInPlaceWith(
              (eventDataA: touchDomEventData, eventDataB: touchDomEventData) =>
              eventDataB.priority - eventDataA.priority
            ),
       )
  };

let _removeFromEventArrMapByHandleFunc =
    (eventName, targetHandleFunc, eventArrMap) =>
  switch (eventArrMap |> WonderCommonlib.SparseMapService.get(eventName)) {
  | None => eventArrMap
  | Some(arr) =>
    eventArrMap
    |> WonderCommonlib.SparseMapService.set(
         eventName,
         arr
         |> Js.Array.filter(({handleFunc}: touchDomEventData) =>
              handleFunc !== targetHandleFunc
            ),
       )
  };

let bind = (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {touchDomEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      touchDomEventDataArrMap:
        _addToEventArr(
          eventName |> domEventNameToInt,
          {priority, handleFunc},
          touchDomEventDataArrMap,
        ),
    },
  };
};

let unbindByHandleFunc = (eventName, handleFunc, {eventRecord} as state) => {
  let {touchDomEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      touchDomEventDataArrMap:
        _removeFromEventArrMapByHandleFunc(
          eventName |> domEventNameToInt,
          handleFunc,
          touchDomEventDataArrMap,
        ),
    },
  };
};