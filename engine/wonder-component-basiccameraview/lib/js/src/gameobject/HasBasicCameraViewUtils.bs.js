'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function has(param, gameObject) {
  return ImmutableSparseMap$WonderCommonlib.has(param.gameObjectBasicCameraViewMap, gameObject);
}

exports.has = has;
/* No side effect */
