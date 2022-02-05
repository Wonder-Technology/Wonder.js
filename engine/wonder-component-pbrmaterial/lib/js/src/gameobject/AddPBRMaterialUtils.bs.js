'use strict';

var ArrayMapUtils$WonderCommonlib = require("wonder-commonlib/lib/js/src/component/ArrayMapUtils.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function add(state, gameObject, material) {
  ArrayMapUtils$WonderCommonlib.addValue(state.gameObjectsMap, material, gameObject);
  MutableSparseMap$WonderCommonlib.set(state.gameObjectPBRMaterialMap, gameObject, material);
  return state;
}

exports.add = add;
/* No side effect */
