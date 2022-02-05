

import * as Caml_option from "../../../../../../../node_modules/rescript/lib/es6/caml_option.js";
import * as ArraySt$WonderCommonlib from "../ArraySt.bs.js";
import * as NullUtils$WonderCommonlib from "../utils/NullUtils.bs.js";

function createEmpty(hintSizeOpt, param) {
  return [];
}

function copy(prim) {
  return prim.slice();
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
  return map[key];
}

function has(map, key) {
  return !NullUtils$WonderCommonlib.isEmpty(map[key]);
}

function map(map$1, func) {
  return map$1.map(function (value) {
              if (NullUtils$WonderCommonlib.isNotInMap(value)) {
                return ;
              } else {
                return func(value);
              }
            });
}

function reducei(map, func, initValue) {
  return ArraySt$WonderCommonlib.reduceOneParami(map, (function (previousValue, value, index) {
                if (NullUtils$WonderCommonlib.isNotInMap(value)) {
                  return previousValue;
                } else {
                  return func(previousValue, value, index);
                }
              }), initValue);
}

function getValues(map) {
  return map.filter(NullUtils$WonderCommonlib.isInMap);
}

function getKeys(map) {
  return ArraySt$WonderCommonlib.reduceOneParami(map, (function (arr, value, key) {
                if (NullUtils$WonderCommonlib.isNotInMap(value)) {
                  return arr;
                } else {
                  arr.push(key);
                  return arr;
                }
              }), []);
}

export {
  createEmpty ,
  copy ,
  unsafeGet ,
  get ,
  getNullable ,
  has ,
  map ,
  reducei ,
  getValues ,
  getKeys ,
  
}
/* No side effect */
