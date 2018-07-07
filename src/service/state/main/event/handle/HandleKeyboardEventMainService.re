open StateDataMainType;

open EventType;

let _getKeyCode = keyboardDomEvent => keyboardDomEvent##keyCode;

let _getShiftKey = keyboardDomEvent => keyboardDomEvent##shiftKey;

let _getKey = (keyboardDomEvent, {eventRecord}) => {
  let {keyboardEventData} = eventRecord;
  let {specialKeyMap, shiftKeyMap} = keyboardEventData;
  let keyCode = _getKeyCode(keyboardDomEvent);

  switch (specialKeyMap |> WonderCommonlib.SparseMapService.get(keyCode)) {
  | Some(key) => key
  | None =>
    let char = Js.String.fromCharCode(keyCode) |> Js.String.toLowerCase;

    _getShiftKey(keyboardDomEvent) ?
      shiftKeyMap |> WonderCommonlib.HashMapService.unsafeGet(char) : char;
  };
};

let _convertKeyboardDomEventToKeyboardEvent =
    (eventName, keyboardDomEvent, state)
    : keyboardEvent => {
  name: eventName,
  ctrlKey: keyboardDomEvent##ctrlKey,
  altKey: keyboardDomEvent##altKey,
  shiftKey: _getShiftKey(keyboardDomEvent),
  metaKey: keyboardDomEvent##metaKey,
  keyCode: _getKeyCode(keyboardDomEvent),
  key: _getKey(keyboardDomEvent, state),
};

let execEventHandle = (eventName, keyboardDomEvent, {eventRecord} as state) => {
  let {keyboardDomEventDataArrMap} = eventRecord;

  switch (
    keyboardDomEventDataArrMap
    |> WonderCommonlib.SparseMapService.get(eventName |> domEventNameToInt)
  ) {
  | None => state
  | Some(arr) =>
    arr
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. state, {handleFunc}: keyboardDomEventData) =>
           handleFunc(.
             _convertKeyboardDomEventToKeyboardEvent(
               eventName,
               keyboardDomEvent,
               state,
             ),
             state,
           ),
         state,
       )
  };
};