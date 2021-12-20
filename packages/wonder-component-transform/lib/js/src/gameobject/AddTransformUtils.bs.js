'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, transform) {
  MutableSparseMap$WonderCommonlib.set(state.gameObjectMap, transform, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectTransformMap, gameObject, transform);
  return state;
}

exports.add = add;
/* No side effect */
