'use strict';

var Caml_option = require("rescript/lib/js/caml_option.js");
var ArraySt$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/ArraySt.bs.js");
var MutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function _getKeyCode(keyboardDomEvent) {
  return keyboardDomEvent.keyCode;
}

function _getShiftKey(keyboardDomEvent) {
  return keyboardDomEvent.shiftKey;
}

function _getKeyFromSpecialKeyMap(keyCode, $$char, specialKeyMap) {
  var key = MutableSparseMap$WonderCommonlib.get(specialKeyMap, keyCode);
  if (key !== undefined) {
    return Caml_option.valFromOption(key);
  } else {
    return $$char;
  }
}

function _handleShiftKey(keyCode, $$char, param) {
  var upperCaseChar = MutableSparseMap$WonderCommonlib.get(param[0], keyCode);
  if (upperCaseChar !== undefined) {
    return upperCaseChar;
  }
  var upperCaseChar$1 = MutableHashMap$WonderCommonlib.get(param[1], $$char);
  if (upperCaseChar$1 !== undefined) {
    return upperCaseChar$1;
  } else {
    return _getKeyFromSpecialKeyMap(keyCode, $$char, param[2]);
  }
}

function _getKey(keyboardDomEvent, param) {
  var keyboardEventData = param.eventRecord.keyboardEventData;
  var specialKeyMap = keyboardEventData.specialKeyMap;
  var keyCode = keyboardDomEvent.keyCode;
  var $$char = String.fromCharCode(keyCode).toLowerCase();
  if (keyboardDomEvent.shiftKey) {
    return _handleShiftKey(keyCode, $$char, [
                keyboardEventData.shiftKeyByKeyCodeMap,
                keyboardEventData.shiftKeyByCharCodeMap,
                specialKeyMap
              ]);
  } else {
    return _getKeyFromSpecialKeyMap(keyCode, $$char, specialKeyMap);
  }
}

function _convertKeyboardDomEventToKeyboardEvent(eventName, keyboardDomEvent, po) {
  return {
          name: eventName,
          keyCode: keyboardDomEvent.keyCode,
          ctrlKey: keyboardDomEvent.ctrlKey,
          altKey: keyboardDomEvent.altKey,
          shiftKey: keyboardDomEvent.shiftKey,
          metaKey: keyboardDomEvent.metaKey,
          key: _getKey(keyboardDomEvent, po),
          event: keyboardDomEvent
        };
}

function execEventHandle(po, eventName, keyboardDomEvent) {
  var arr = MutableSparseMap$WonderCommonlib.get(po.eventRecord.keyboardDomEventDataArrMap, eventName);
  if (arr !== undefined) {
    return ArraySt$WonderCommonlib.reduceOneParam(arr, (function (po, param) {
                  return param.handleFunc(_convertKeyboardDomEventToKeyboardEvent(eventName, keyboardDomEvent, po), po);
                }), po);
  } else {
    return po;
  }
}

exports._getKeyCode = _getKeyCode;
exports._getShiftKey = _getShiftKey;
exports._getKeyFromSpecialKeyMap = _getKeyFromSpecialKeyMap;
exports._handleShiftKey = _handleShiftKey;
exports._getKey = _getKey;
exports._convertKeyboardDomEventToKeyboardEvent = _convertKeyboardDomEventToKeyboardEvent;
exports.execEventHandle = execEventHandle;
/* No side effect */
