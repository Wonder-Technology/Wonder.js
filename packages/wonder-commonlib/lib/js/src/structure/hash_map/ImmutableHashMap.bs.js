'use strict';

var HashMap$WonderCommonlib = require("./HashMap.bs.js");

function set(map, key, value) {
  var newMap = HashMap$WonderCommonlib.copy(map);
  newMap[key] = value;
  return newMap;
}

function deleteVal(map, key) {
  var newMap = HashMap$WonderCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
}

var createEmpty = HashMap$WonderCommonlib.createEmpty;

var unsafeGet = HashMap$WonderCommonlib.unsafeGet;

var get = HashMap$WonderCommonlib.get;

var getNullable = HashMap$WonderCommonlib.getNullable;

var has = HashMap$WonderCommonlib.has;

var getValidValues = HashMap$WonderCommonlib.getValidValues;

var copy = HashMap$WonderCommonlib.copy;

exports.createEmpty = createEmpty;
exports.set = set;
exports.unsafeGet = unsafeGet;
exports.get = get;
exports.getNullable = getNullable;
exports.has = has;
exports.deleteVal = deleteVal;
exports.getValidValues = getValidValues;
exports.copy = copy;
/* No side effect */
