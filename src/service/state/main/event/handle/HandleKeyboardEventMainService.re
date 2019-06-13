open StateDataMainType;

open EventType;

let _getKeyCode = keyboardDomEvent => keyboardDomEvent##keyCode;

let _getShiftKey = keyboardDomEvent => keyboardDomEvent##shiftKey;

let _getKeyFromSpecialKeyMap = (keyCode, char, specialKeyMap) =>
  switch (
    specialKeyMap |> WonderCommonlib.MutableSparseMapService.get(keyCode)
  ) {
  | None => char
  | Some(key) => key
  };

let _handleShiftKey =
    (
      keyCode,
      char,
      (shiftKeyByKeyCodeMap, shiftKeyByCharCodeMap, specialKeyMap),
    ) =>
  switch (
    shiftKeyByKeyCodeMap
    |> WonderCommonlib.MutableSparseMapService.get(keyCode)
  ) {
  | None =>
    switch (
      shiftKeyByCharCodeMap |> WonderCommonlib.MutableHashMapService.get(char)
    ) {
    | None => _getKeyFromSpecialKeyMap(keyCode, char, specialKeyMap)
    | Some(upperCaseChar) => upperCaseChar
    }

  | Some(upperCaseChar) => upperCaseChar
  };

let _getKey = (keyboardDomEvent, {eventRecord}) => {
  let {keyboardEventData} = eventRecord;
  let {specialKeyMap, shiftKeyByKeyCodeMap, shiftKeyByCharCodeMap} = keyboardEventData;
  let keyCode = _getKeyCode(keyboardDomEvent);

  let char = Js.String.fromCharCode(keyCode) |> Js.String.toLowerCase;

  _getShiftKey(keyboardDomEvent) ?
    _handleShiftKey(
      keyCode,
      char,
      (shiftKeyByKeyCodeMap, shiftKeyByCharCodeMap, specialKeyMap),
    ) :
    _getKeyFromSpecialKeyMap(keyCode, char, specialKeyMap);
};

let _convertKeyboardDomEventToKeyboardEvent =
    (eventName, keyboardDomEvent, state): keyboardEvent => {
  name: eventName,
  ctrlKey: keyboardDomEvent##ctrlKey,
  altKey: keyboardDomEvent##altKey,
  shiftKey: _getShiftKey(keyboardDomEvent),
  metaKey: keyboardDomEvent##metaKey,
  keyCode: _getKeyCode(keyboardDomEvent),
  key: _getKey(keyboardDomEvent, state),
  event: keyboardDomEvent,
};

let execEventHandle = (eventName, keyboardDomEvent, {eventRecord} as state) => {
  let {keyboardDomEventDataArrMap} = eventRecord;

  switch (
    keyboardDomEventDataArrMap
    |> WonderCommonlib.MutableSparseMapService.get(
         eventName |> domEventNameToInt,
       )
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