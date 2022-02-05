

import * as HashMap$WonderCommonlib from "./HashMap.bs.js";

function set(map, key, value) {
  map[key] = value;
  return map;
}

function deleteVal(map, key) {
  map[key] = undefined;
  return map;
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
