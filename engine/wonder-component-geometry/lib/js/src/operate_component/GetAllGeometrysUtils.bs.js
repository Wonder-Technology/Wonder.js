'use strict';

var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

function getAll(param) {
  return MutableSparseMap$WonderCommonlib.getValues(param.gameObjectGeometryMap);
}

exports.getAll = getAll;
/* No side effect */
