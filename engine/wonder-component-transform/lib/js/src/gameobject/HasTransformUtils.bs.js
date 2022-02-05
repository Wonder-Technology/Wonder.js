'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function has(param, gameObject) {
  return MutableSparseMap$WonderCommonlib.has(param.gameObjectTransformMap, gameObject);
}

exports.has = has;
/* No side effect */
