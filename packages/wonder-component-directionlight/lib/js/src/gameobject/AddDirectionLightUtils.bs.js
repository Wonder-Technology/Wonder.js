'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, light) {
  MutableSparseMap$WonderCommonlib.set(state.gameObjectMap, light, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectDirectionLightMap, gameObject, light);
  return state;
}

exports.add = add;
/* No side effect */
