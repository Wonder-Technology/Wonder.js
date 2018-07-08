open StateDataMainType;

open EventType;

let _getKeyCode = keyboardDomEvent => keyboardDomEvent##keyCode;

let _getShiftKey = keyboardDomEvent => keyboardDomEvent##shiftKey;

let _getKeyFromSpecialKeyMap = (keyCode, char, specialKeyMap) =>
  switch (specialKeyMap |> WonderCommonlib.SparseMapService.get(keyCode)) {
  | None => char
  | Some(key) => key
  };

let _getKey = (keyboardDomEvent, {eventRecord}) => {
  let {keyboardEventData} = eventRecord;
  let {specialKeyMap, shiftKeyByKeyCodeMap, shiftKeyByCharCodeMap} = keyboardEventData;
  let keyCode = _getKeyCode(keyboardDomEvent);

  let char = Js.String.fromCharCode(keyCode) |> Js.String.toLowerCase;

  _getShiftKey(keyboardDomEvent) ?
    switch (shiftKeyByKeyCodeMap |> WonderCommonlib.SparseMapService.get(keyCode)) {
    | None =>
      switch (
        shiftKeyByCharCodeMap |> WonderCommonlib.HashMapService.get(char)
      ) {
      | None => _getKeyFromSpecialKeyMap(keyCode, char, specialKeyMap)
      | Some(upperCaseChar) => upperCaseChar
      }

    | Some(upperCaseChar) => upperCaseChar
    } :
    _getKeyFromSpecialKeyMap(keyCode, char, specialKeyMap);
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