

import * as HashMap$WonderCommonlib from "./HashMap.bs.js";

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

export {
  createEmpty ,
  set ,
  unsafeGet ,
  get ,
  getNullable ,
  has ,
  deleteVal ,
  getValidValues ,
  copy ,
  
}
/* No side effect */
