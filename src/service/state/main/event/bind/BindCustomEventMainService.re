open StateDataMainType;

open EventType;

let _addEventDataByPriority = (eventData, arr) =>
  arr
  |> ArrayService.push(eventData)
  |> Js.Array.sortInPlaceWith((eventDataA, eventDataB) =>
       eventDataB.priority - eventDataA.priority
     );

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  switch (eventArrMap |> WonderCommonlib.HashMapService.get(eventName)) {
  | None =>
    eventArrMap
    |> WonderCommonlib.HashMapService.set(eventName, [|eventData|])
  | Some(arr) =>
    eventArrMap
    |> WonderCommonlib.HashMapService.set(
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
  switch (eventArrMap |> WonderCommonlib.HashMapService.get(eventName)) {
  | None => eventArrMap
  | Some(arr) =>
    eventArrMap
    |> WonderCommonlib.HashMapService.set(
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
  |> WonderCommonlib.HashMapService.deleteVal(eventName)
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
          |> WonderCommonlib.HashMapService.get(eventName)
        ) {
        | None =>
          customGameObjectEventArrMap
          |> WonderCommonlib.HashMapService.set(
               eventName,
               WonderCommonlib.SparseMapService.createEmpty()
               |> WonderCommonlib.SparseMapService.set(target, [|eventData|]),
             )
        | Some(targetEventArrMap) =>
          switch (
            targetEventArrMap |> WonderCommonlib.SparseMapService.get(target)
          ) {
          | None =>
            customGameObjectEventArrMap
            |> WonderCommonlib.HashMapService.set(
                 eventName,
                 targetEventArrMap
                 |> WonderCommonlib.SparseMapService.set(
                      target,
                      [|eventData|],
                    ),
               )
          | Some(arr) =>
            customGameObjectEventArrMap
            |> WonderCommonlib.HashMapService.set(
                 eventName,
                 targetEventArrMap
                 |> WonderCommonlib.SparseMapService.set(
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
          |> WonderCommonlib.HashMapService.get(eventName)
        ) {
        | None => customGameObjectEventArrMap
        | Some(targetEventArrMap) =>
          targetEventArrMap
          |> Obj.magic
          |> WonderCommonlib.SparseMapService.deleteVal(target)
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
          |> WonderCommonlib.HashMapService.get(eventName)
        ) {
        | None => customGameObjectEventArrMap
        | Some(targetEventArrMap) =>
          switch (
            targetEventArrMap |> WonderCommonlib.SparseMapService.get(target)
          ) {
          | None => customGameObjectEventArrMap
          | Some(arr) =>
            customGameObjectEventArrMap
            |> WonderCommonlib.HashMapService.set(
                 eventName,
                 targetEventArrMap
                 |> WonderCommonlib.SparseMapService.set(
                      target,
                      _removeFromEventArrByHandleFunc(arr, handleFunc),
                    ),
               )
          }
        },
    },
  };
};