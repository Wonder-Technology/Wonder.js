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
              (eventDataA: domEventData, eventDataB: domEventData) =>
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
         |> Js.Array.filter(({handleFunc}: domEventData) =>
              handleFunc !== targetHandleFunc
            ),
       )
  };

let bind = (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {domEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      domEventDataArrMap:
        _addToEventArr(
          eventName |> domEventNameToInt,
          {priority, handleFunc},
          domEventDataArrMap,
        ),
    },
  };
};

let unbindByHandleFunc = (eventName, handleFunc, {eventRecord} as state) => {
  let {domEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      domEventDataArrMap:
        _removeFromEventArrMapByHandleFunc(
          eventName |> domEventNameToInt,
          handleFunc,
          domEventDataArrMap,
        ),
    },
  };
};