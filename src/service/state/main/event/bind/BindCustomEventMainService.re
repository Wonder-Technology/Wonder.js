open StateDataMainType;

open EventType;

let _addEventDataByPriority = (eventData, arr) =>
  arr
  |> ArrayService.push(eventData)
  |> Js.Array.sortInPlaceWith((eventDataA, eventDataB) =>
       eventDataB.priority - eventDataA.priority
     );

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  switch (eventArrMap |> WonderCommonlib.MutableHashMapService.get(eventName)) {
  | None =>
    eventArrMap
    |> WonderCommonlib.MutableHashMapService.set(eventName, [|eventData|])
  | Some(arr) =>
    eventArrMap
    |> WonderCommonlib.MutableHashMapService.set(
         eventName,
         _addEventDataByPriority(eventData, arr),
       )
  };

let bindGlobalEvent =
    (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {customGlobalEventArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGlobalEventArrMap:
        _addToEventArr(
          eventName,
          {priority, handleFunc},
          customGlobalEventArrMap,
        ),
    },
  };
};

let _removeFromEventArrByHandleFunc = (arr, targetHandleFunc) =>
  arr |> Js.Array.filter(({handleFunc}) => handleFunc !== targetHandleFunc);

let _removeFromEventArrMapByHandleFunc = (eventName, handleFunc, eventArrMap) =>
  switch (eventArrMap |> WonderCommonlib.MutableHashMapService.get(eventName)) {
  | None => eventArrMap
  | Some(arr) =>
    eventArrMap
    |> WonderCommonlib.MutableHashMapService.set(
         eventName,
         _removeFromEventArrByHandleFunc(arr, handleFunc),
       )
  };

let unbindGlobalEventByHandleFunc =
    (eventName, handleFunc, {eventRecord} as state) => {
  let {customGlobalEventArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGlobalEventArrMap:
        _removeFromEventArrMapByHandleFunc(
          eventName,
          handleFunc,
          customGlobalEventArrMap,
        ),
    },
  };
};

let _removeFromEventListMapByEventName = (eventName, eventArrMap) =>
  eventArrMap
  |> Obj.magic
  |> WonderCommonlib.MutableHashMapService.deleteVal(eventName)
  |> Obj.magic;

let unbindGlobalEventByEventName = (eventName, {eventRecord} as state) => {
  let {customGlobalEventArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGlobalEventArrMap:
        _removeFromEventListMapByEventName(
          eventName,
          customGlobalEventArrMap,
        ),
    },
  };
};

let bindGameObjectEvent =
    ((eventName, priority, target), handleFunc, {eventRecord} as state) => {
  let {customGameObjectEventArrMap} = eventRecord;

  let eventData = {priority, handleFunc};

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGameObjectEventArrMap:
        switch (
          customGameObjectEventArrMap
          |> WonderCommonlib.MutableHashMapService.get(eventName)
        ) {
        | None =>
          customGameObjectEventArrMap
          |> WonderCommonlib.MutableHashMapService.set(
               eventName,
               WonderCommonlib.MutableSparseMapService.createEmpty()
               |> WonderCommonlib.MutableSparseMapService.set(target, [|eventData|]),
             )
        | Some(targetEventArrMap) =>
          switch (
            targetEventArrMap |> WonderCommonlib.MutableSparseMapService.get(target)
          ) {
          | None =>
            customGameObjectEventArrMap
            |> WonderCommonlib.MutableHashMapService.set(
                 eventName,
                 targetEventArrMap
                 |> WonderCommonlib.MutableSparseMapService.set(
                      target,
                      [|eventData|],
                    ),
               )
          | Some(arr) =>
            customGameObjectEventArrMap
            |> WonderCommonlib.MutableHashMapService.set(
                 eventName,
                 targetEventArrMap
                 |> WonderCommonlib.MutableSparseMapService.set(
                      target,
                      _addEventDataByPriority(eventData, arr),
                    ),
               )
          }
        },
    },
  };
};

let unbindGameObjectEventByTarget =
    ((eventName, target), {eventRecord} as state) => {
  let {customGameObjectEventArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGameObjectEventArrMap:
        switch (
          customGameObjectEventArrMap
          |> WonderCommonlib.MutableHashMapService.get(eventName)
        ) {
        | None => customGameObjectEventArrMap
        | Some(targetEventArrMap) =>
          targetEventArrMap
          |> Obj.magic
          |> WonderCommonlib.MutableSparseMapService.deleteVal(target)
          |> Obj.magic
        },
    },
  };
};

let unbindGameObjectEventByHandleFunc =
    ((eventName, target), handleFunc, {eventRecord} as state) => {
  let {customGameObjectEventArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      customGameObjectEventArrMap:
        switch (
          customGameObjectEventArrMap
          |> WonderCommonlib.MutableHashMapService.get(eventName)
        ) {
        | None => customGameObjectEventArrMap
        | Some(targetEventArrMap) =>
          switch (
            targetEventArrMap |> WonderCommonlib.MutableSparseMapService.get(target)
          ) {
          | None => customGameObjectEventArrMap
          | Some(arr) =>
            customGameObjectEventArrMap
            |> WonderCommonlib.MutableHashMapService.set(
                 eventName,
                 targetEventArrMap
                 |> WonderCommonlib.MutableSparseMapService.set(
                      target,
                      _removeFromEventArrByHandleFunc(arr, handleFunc),
                    ),
               )
          }
        },
    },
  };
};