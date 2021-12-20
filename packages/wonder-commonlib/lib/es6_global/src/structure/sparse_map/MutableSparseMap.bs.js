

import * as SparseMap$WonderCommonlib from "./SparseMap.bs.js";

function set(map, key, value) {
  map[key] = value;
  return map;
}

function remove(map, key) {
  map[key] = undefined;
  return map;
}

function deleteVal(map, key) {
  map[key] = undefined;
  return map;
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
