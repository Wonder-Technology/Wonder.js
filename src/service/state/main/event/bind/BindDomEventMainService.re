open StateDataMainType;

open EventType;

let _addToEventList = (eventName, eventData, eventListMap) =>
  switch (eventListMap |> WonderCommonlib.SparseMapService.get(eventName)) {
  | None =>
    eventListMap
    |> WonderCommonlib.SparseMapService.set(eventName, [eventData])
  | Some(list) =>
    eventListMap
    |> WonderCommonlib.SparseMapService.set(
         eventName,
         [eventData, ...list]
         |> List.sort((eventDataA: domEventData, eventDataB: domEventData) =>
              eventDataB.priority - eventDataA.priority
            ),
       )
  };

let _removeFromEventListMapByHandleFunc =
    (eventName, targetHandleFunc, eventListMap) =>
  switch (eventListMap |> WonderCommonlib.SparseMapService.get(eventName)) {
  | None => eventListMap
  | Some(list) =>
    eventListMap
    |> WonderCommonlib.SparseMapService.set(
         eventName,
         list
         |> List.filter(({handleFunc}: domEventData) =>
              handleFunc !== targetHandleFunc
            ),
       )
  };

let bind = (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {domEventDataListMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      domEventDataListMap:
        _addToEventList(
          eventName |> domEventNameToInt,
          {priority, handleFunc},
          domEventDataListMap,
        ),
    },
  };
};

let unbindByHandleFunc = (eventName, handleFunc, {eventRecord} as state) => {
  let {domEventDataListMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      domEventDataListMap:
        _removeFromEventListMapByHandleFunc(
          eventName |> domEventNameToInt,
          handleFunc,
          domEventDataListMap,
        ),
    },
  };
};