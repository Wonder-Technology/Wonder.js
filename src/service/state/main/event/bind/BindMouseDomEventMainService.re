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
              (eventDataA: mouseDomEventData, eventDataB: mouseDomEventData) =>
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
         |> Js.Array.filter(({handleFunc}: mouseDomEventData) =>
              handleFunc !== targetHandleFunc
            ),
       )
  };

let _wrapHandleFunc = (eventName, handleFunc) =>
  switch (eventName) {
  | MouseMove => (
      (. ({location}: mouseEvent) as mouseEvent, state) => {
        let {eventRecord} as state = handleFunc(. mouseEvent, state);

        let (x, y) = location;

        {
          ...state,
          eventRecord:
            MouseEventService.setLastXY(Some(x), Some(y), eventRecord),
        };
      }
    )
  | _ => handleFunc
  };

let bind = (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {mouseDomEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      mouseDomEventDataArrMap:
        _addToEventArr(
          eventName |> domEventNameToInt,
          {priority, handleFunc: _wrapHandleFunc(eventName, handleFunc)},
          mouseDomEventDataArrMap,
        ),
    },
  };
};

let unbindByHandleFunc = (eventName, handleFunc, {eventRecord} as state) => {
  let {mouseDomEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      mouseDomEventDataArrMap:
        _removeFromEventArrMapByHandleFunc(
          eventName |> domEventNameToInt,
          handleFunc,
          mouseDomEventDataArrMap,
        ),
    },
  };
};