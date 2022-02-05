'use strict';

var ImmutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/ImmutableSparseMap.bs.js");

function get(param, cameraProjection) {
  var gameObject = ImmutableSparseMap$WonderCommonlib.get(param.gameObjectMap, cameraProjection);
  if (gameObject !== undefined) {
    return [gameObject];
  } else {
    return [];
  }
}

exports.get = get;
/* No side effect */
