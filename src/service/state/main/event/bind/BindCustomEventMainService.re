open StateDataMainType;

open EventType;

let _addEventDataByPriority = (eventData, list) =>
  [eventData, ...list]
  |> List.sort((eventDataA, eventDataB) =>
       eventDataA.priority - eventDataB.priority
     );

let _addToEventList = (eventName, eventData, eventListMap) =>
  switch (eventListMap |> WonderCommonlib.HashMapService.get(eventName)) {
  | None => eventListMap |> WonderCommonlib.HashMapService.set(eventName, [])
  | Some(list) =>
    eventListMap
    |> WonderCommonlib.HashMapService.set(
         eventName,
         _addEventDataByPriority(eventData, list),
       )
  };

let bindGlobalEvent =
    (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {customGlobalEventListMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGlobalEventListMap:
        _addToEventList(
          eventName,
          {priority, handleFunc},
          customGlobalEventListMap,
        ),
    },
  };
};

let bindGameObjectEvent =
    ((eventName, priority, target), handleFunc, {eventRecord} as state) => {
  let {customGameObjectEventListMap} = eventRecord;

  let eventData = {priority, handleFunc};

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGameObjectEventListMap:
        switch (
          customGameObjectEventListMap
          |> WonderCommonlib.HashMapService.get(eventName)
        ) {
        | None =>
          customGameObjectEventListMap
          |> WonderCommonlib.HashMapService.set(
               eventName,
               WonderCommonlib.SparseMapService.createEmpty()
               |> WonderCommonlib.SparseMapService.set(target, [eventData]),
             )
        | Some(targetEventListMap) =>
          switch (
            targetEventListMap |> WonderCommonlib.SparseMapService.get(target)
          ) {
          | None =>
            customGameObjectEventListMap
            |> WonderCommonlib.HashMapService.set(
                 eventName,
                 targetEventListMap
                 |> WonderCommonlib.SparseMapService.set(target, [eventData]),
               )
          | Some(list) =>
            customGameObjectEventListMap
            |> WonderCommonlib.HashMapService.set(
                 eventName,
                 targetEventListMap
                 |> WonderCommonlib.SparseMapService.set(
                      target,
                      _addEventDataByPriority(eventData, list),
                    ),
               )
          }
        },
    },
  };
};