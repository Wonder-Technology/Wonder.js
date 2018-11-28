

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function isDeleted(item) {
  return item == null;
}

function length(prim) {
  return prim.length;
}

function copy(prim) {
  return prim.slice();
}

function filter(prim, prim$1) {
  return prim$1.filter(Curry.__1(prim));
}

function getValidValues(map) {
  return map.filter((function (value) {
                return value !== undefined;
              }));
}

function getValidKeys(map) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (arr, value, key) {
                if (value === undefined) {
                  return arr;
                } else {
                  arr.push(key);
                  return arr;
                }
              }), /* array */[], map);
}

function map(func, map$1) {
  return map$1.map((function (value) {
                return func(value);
              }));
}

function mapValid(func, map) {
  return map.map((function (value) {
                if (value === undefined) {
                  return value;
                } else {
                  return func(value);
                }
              }));
}

function forEachValid(func, map) {
  return ArrayService$WonderCommonlib.forEach((function (value) {
                if (value === undefined) {
                  return /* () */0;
                } else {
                  return func(value);
                }
              }), map);
}

function forEachiValid(func, map) {
  return ArrayService$WonderCommonlib.forEachi((function (value, index) {
                if (value === undefined) {
                  return /* () */0;
                } else {
                  return func(value, index);
                }
              }), map);
}

function reduceValid(func, initValue, map) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (previousValue, value) {
                if (value === undefined) {
                  return previousValue;
                } else {
                  return func(previousValue, value);
                }
              }), initValue, map);
}

function reduceiValid(func, initValue, map) {
  return ArrayService$WonderCommonlib.reduceOneParami((function (previousValue, value, index) {
                if (value === undefined) {
                  return previousValue;
                } else {
                  return func(previousValue, value, index);
                }
              }), initValue, map);
}

function indexOf(targetValue, map) {
  return map.indexOf(targetValue);
}

function mergeSparseMaps(mapArr) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (resultMap, map) {
                return reduceiValid((function (resultMap, value, key) {
                              return SparseMapService$WonderCommonlib.set(key, value, resultMap);
                            }), resultMap, map);
              }), SparseMapService$WonderCommonlib.createEmpty(/* () */0), mapArr);
}

var reducei = ArrayService$WonderCommonlib.reduceOneParami;

export {
  isDeleted ,
  length ,
  copy ,
  filter ,
  getValidValues ,
  getValidKeys ,
  map ,
  mapValid ,
  forEachValid ,
  forEachiValid ,
  reducei ,
  reduceValid ,
  reduceiValid ,
  indexOf ,
  mergeSparseMaps ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
