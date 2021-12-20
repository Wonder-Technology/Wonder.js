'use strict';

var MutableSparseMap$WonderCommonlib = require("../structure/sparse_map/MutableSparseMap.bs.js");

function createEmptyMap(componentCount) {
  return MutableSparseMap$WonderCommonlib.createEmpty(componentCount, undefined);
}

exports.createEmptyMap = createEmptyMap;
/* No side effect */
