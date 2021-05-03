

import * as Caml_option from "./../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ArrayService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as MutableHashMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "./../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _getKeyCode(keyboardDomEvent) {
  return keyboardDomEvent.keyCode;
}

function _getShiftKey(keyboardDomEvent) {
  return keyboardDomEvent.shiftKey;
}

function _getKeyFromSpecialKeyMap(keyCode, $$char, specialKeyMap) {
  var match = MutableSparseMapService$WonderCommonlib.get(keyCode, specialKeyMap);
  if (match !== undefined) {
    return Caml_option.valFromOption(match);
  } else {
    return $$char;
  }
}

function _handleShiftKey(keyCode, $$char, param) {
  var match = MutableSparseMapService$WonderCommonlib.get(keyCode, param[0]);
  if (match !== undefined) {
    return match;
  } else {
    var match$1 = MutableHashMapService$WonderCommonlib.get($$char, param[1]);
    if (match$1 !== undefined) {
      return match$1;
    } else {
      return _getKeyFromSpecialKeyMap(keyCode, $$char, param[2]);
    }
  }
}

function _getKey(keyboardDomEvent, param) {
  var keyboardEventData = param[/* eventRecord */43][/* keyboardEventData */7];
  var specialKeyMap = keyboardEventData[/* specialKeyMap */0];
  var keyCode = keyboardDomEvent.keyCode;
  var $$char = String.fromCharCode(keyCode).toLowerCase();
  var match = keyboardDomEvent.shiftKey;
  if (match) {
    return _handleShiftKey(keyCode, $$char, /* tuple */[
                keyboardEventData[/* shiftKeyByKeyCodeMap */1],
                keyboardEventData[/* shiftKeyByCharCodeMap */2],
                specialKeyMap
              ]);
  } else {
    return _getKeyFromSpecialKeyMap(keyCode, $$char, specialKeyMap);
  }
}

function _convertKeyboardDomEventToKeyboardEvent(eventName, keyboardDomEvent, state) {
  return /* record */[
          /* name */eventName,
          /* keyCode */keyboardDomEvent.keyCode,
          /* ctrlKey */keyboardDomEvent.ctrlKey,
          /* altKey */keyboardDomEvent.altKey,
          /* shiftKey */keyboardDomEvent.shiftKey,
          /* metaKey */keyboardDomEvent.metaKey,
          /* key */_getKey(keyboardDomEvent, state),
          /* event */keyboardDomEvent
        ];
}

function execEventHandle(eventName, keyboardDomEvent, state) {
  var match = MutableSparseMapService$WonderCommonlib.get(eventName, state[/* eventRecord */43][/* keyboardDomEventDataArrMap */2]);
  if (match !== undefined) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, param) {
                  return param[/* handleFunc */1](_convertKeyboardDomEventToKeyboardEvent(eventName, keyboardDomEvent, state), state);
                }), state, match);
  } else {
    return state;
  }
}

export {
  _getKeyCode ,
  _getShiftKey ,
  _getKeyFromSpecialKeyMap ,
  _handleShiftKey ,
  _getKey ,
  _convertKeyboardDomEventToKeyboardEvent ,
  execEventHandle ,
  
}
/* No side effect */
