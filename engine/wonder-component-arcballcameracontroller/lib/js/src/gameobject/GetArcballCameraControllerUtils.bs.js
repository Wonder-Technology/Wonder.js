'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function get(param, gameObject) {
  return ImmutableSparseMap$WonderCommonlib.unsafeGet(param.gameObjectArcballCameraControllerMap, gameObject);
}

exports.get = get;
/* No side effect */
