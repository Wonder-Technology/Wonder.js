'use strict';

var ArrayMapUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/ArrayMapUtils.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, geometry) {
  ArrayMapUtils$WonderCommonlib.addValue(state.gameObjectsMap, geometry, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectGeometryMap, gameObject, geometry);
  return state;
}

exports.add = add;
/* No side effect */
