'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function getAll(param) {
  return ImmutableSparseMap$WonderCommonlib.getValues(param.gameObjectBasicCameraViewMap);
}

exports.getAll = getAll;
/* No side effect */
