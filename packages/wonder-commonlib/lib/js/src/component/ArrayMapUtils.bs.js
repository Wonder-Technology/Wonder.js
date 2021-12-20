'use strict';

var ArraySt$WonderCommonlib = require("../structure/ArraySt.bs.js");
var MutableSparseMap$WonderCommonlib = require("../structure/sparse_map/MutableSparseMap.bs.js");

function addValue(map, key, value) {
  var arr = MutableSparseMap$WonderCommonlib.get(map, key);
  if (arr !== undefined) {
    return MutableSparseMap$WonderCommonlib.set(map, key, ArraySt$WonderCommonlib.push(arr, value));
  } else {
    return MutableSparseMap$WonderCommonlib.set(map, key, [value]);
  }
}

exports.addValue = addValue;
/* No side effect */
