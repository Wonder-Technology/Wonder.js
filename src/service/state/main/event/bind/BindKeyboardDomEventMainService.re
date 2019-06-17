open StateDataMainType;

open EventType;

let _addToEventArr = (eventName, eventData, eventArrMap) =>
  BindDomEventMainService.addToEventArr(
    eventName,
    eventData,
    ({priority}: keyboardDomEventData) => priority,
    eventArrMap,
  );

let _removeFromEventArrMapByHandleFunc =
    (eventName, targetHandleFunc, eventArrMap) =>
  BindDomEventMainService.removeFromEventArrMapByHandleFunc(
    eventName,
    (({handleFunc}: keyboardDomEventData) => handleFunc, targetHandleFunc),
    eventArrMap,
  );

let bind = (eventName, priority, handleFunc, {eventRecord} as state) => {
  let {keyboardDomEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      keyboardDomEventDataArrMap:
        _addToEventArr(
          eventName |> domEventNameToInt,
          {priority, handleFunc}: keyboardDomEventData,
          keyboardDomEventDataArrMap,
        ),
    },
  };
};

let unbindByHandleFunc = (eventName, handleFunc, {eventRecord} as state) => {
  let {keyboardDomEventDataArrMap} = eventRecord;

  {
    ...state,
    eventRecord: {
      ...eventRecord,
      keyboardDomEventDataArrMap:
        _removeFromEventArrMapByHandleFunc(
          eventName |> domEventNameToInt,
          handleFunc,
          keyboardDomEventDataArrMap,
        ),
    },
  };
};