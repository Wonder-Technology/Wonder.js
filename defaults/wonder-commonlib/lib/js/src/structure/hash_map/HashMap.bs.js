'use strict';

var Js_dict = require("rescript/lib/js/js_dict.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var ArraySt$WonderCommonlib = require("../ArraySt.bs.js");
var NullUtils$WonderCommonlib = require("../utils/NullUtils.bs.js");

function createEmpty(hintSizeOpt, param) {
  return {};
}

function unsafeGet(map, key) {
  return map[key];
}

function get(map, key) {
  var value = map[key];
  if (NullUtils$WonderCommonlib.isEmpty(value)) {
    return ;
  } else {
    return Caml_option.some(value);
  }
}

function getNullable(map, key) {
  return Js_null_undefined.fromOption(get(map, key));
}

function has(map, key) {
  return !NullUtils$WonderCommonlib.isEmpty(map[key]);
}

var entries = Js_dict.entries;

function _mutableSet(map, key, value) {
  map[key] = value;
  return map;
}

function _createEmpty(param) {
  return {};
}

function copy(map) {
  return ArraySt$WonderCommonlib.reduceOneParam(Js_dict.entries(map), (function (newMap, param) {
                return _mutableSet(newMap, param[0], param[1]);
              }), {});
}

function getValidValues(map) {
  var __x = Js_dict.values(map);
  return __x.filter(NullUtils$WonderCommonlib.isInMap);
}

exports.createEmpty = createEmpty;
exports.unsafeGet = unsafeGet;
exports.get = get;
exports.getNullable = getNullable;
exports.has = has;
exports.entries = entries;
exports._mutableSet = _mutableSet;
exports._createEmpty = _createEmpty;
exports.copy = copy;
exports.getValidValues = getValidValues;
/* No side effect */
