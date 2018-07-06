open StateDataMainType;

open EventType;

let _addToEventList = (eventName, eventData, eventListMap) =>
  switch (eventListMap |> WonderCommonlib.SparseMapService.get(eventName)) {
  | None =>
    eventListMap |> WonderCommonlib.SparseMapService.set(eventName, [])
  | Some(list) =>
    eventListMap
    |> WonderCommonlib.SparseMapService.set(
         eventName,
         [eventData, ...list]
         |> List.sort((eventDataA: domEventData, eventDataB: domEventData) =>
              eventDataA.priority - eventDataB.priority
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