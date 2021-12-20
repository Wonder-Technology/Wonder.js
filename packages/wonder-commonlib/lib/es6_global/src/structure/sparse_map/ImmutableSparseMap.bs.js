

import * as SparseMap$WonderCommonlib from "./SparseMap.bs.js";

function set(map, key, value) {
  var newMap = SparseMap$WonderCommonlib.copy(map);
  newMap[key] = value;
  return newMap;
}

function remove(map, key) {
  var newMap = SparseMap$WonderCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
}

function deleteVal(map, key) {
  var newMap = SparseMap$WonderCommonlib.copy(map);
  newMap[key] = undefined;
  return newMap;
}

var createEmpty = SparseMap$WonderCommonlib.createEmpty;

var copy = SparseMap$WonderCommonlib.copy;

var unsafeGet = SparseMap$WonderCommonlib.unsafeGet;

var get = SparseMap$WonderCommonlib.get;

var getNullable = SparseMap$WonderCommonlib.getNullable;

var has = SparseMap$WonderCommonlib.has;

var map = SparseMap$WonderCommonlib.map;

var reducei = SparseMap$WonderCommonlib.reducei;

var getValues = SparseMap$WonderCommonlib.getValues;

var getKeys = SparseMap$WonderCommonlib.getKeys;

export {
  createEmpty ,
  copy ,
  unsafeGet ,
  get ,
  getNullable ,
  has ,
  set ,
  remove ,
  map ,
  reducei ,
  getValues ,
  getKeys ,
  deleteVal ,
  
}
/* No side effect */
