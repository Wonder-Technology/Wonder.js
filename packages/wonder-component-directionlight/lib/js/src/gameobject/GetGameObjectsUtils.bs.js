'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param, light) {
  var gameObject = MutableSparseMap$WonderCommonlib.get(param.gameObjectMap, light);
  if (gameObject !== undefined) {
    return [gameObject];
  } else {
    return [];
  }
}

exports.get = get;
/* No side effect */
