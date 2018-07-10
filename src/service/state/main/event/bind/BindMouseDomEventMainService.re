open StateDataMainType;

open EventType;

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  BindDomEventMainService.addToEventArr(
    eventName,
    eventData,
    ({priority}: mouseDomEventData) => priority,
    eventArrMap,
  );

let _removeFromEventArrMapByHandleFunc =
    (eventName, targetHandleFunc, eventArrMap) =>
  BindDomEventMainService.removeFromEventArrMapByHandleFunc(
    eventName,
    (({handleFunc}: mouseDomEventData) => handleFunc, targetHandleFunc),
    eventArrMap,
  );

let bind = (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {mouseDomEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      mouseDomEventDataArrMap:
        _addToEventArr(
          eventName |> domEventNameToInt,
          {priority, handleFunc},
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