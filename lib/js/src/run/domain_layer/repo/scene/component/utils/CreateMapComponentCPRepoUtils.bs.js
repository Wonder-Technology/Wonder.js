'use strict';

var ImmutableSparseMap$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");

function createEmptyMap(componentCount) {
  return ImmutableSparseMap$Wonderjs.createEmpty(componentCount, undefined);
}

exports.createEmptyMap = createEmptyMap;
/* No side effect */
