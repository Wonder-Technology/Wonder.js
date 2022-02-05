'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function get(param, gameObject) {
  return MutableSparseMap$WonderCommonlib.unsafeGet(param.gameObjectPBRMaterialMap, gameObject);
}

exports.get = get;
/* No side effect */
