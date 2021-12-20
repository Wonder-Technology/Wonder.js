'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param, transform) {
  var gameObject = MutableSparseMap$WonderCommonlib.get(param.gameObjectMap, transform);
  if (gameObject !== undefined) {
    return [gameObject];
  } else {
    return [];
  }
}

exports.get = get;
/* No side effect */
