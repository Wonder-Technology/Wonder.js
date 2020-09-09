'use strict';

var ImmutableSparseMap$Wonderjs = require("../../../../../../construct/domain_layer/library/structure/sparse_map/ImmutableSparseMap.bs.js");

function addValue(map, key, value) {
  var list = ImmutableSparseMap$Wonderjs.get(map, key);
  if (list !== undefined) {
    return ImmutableSparseMap$Wonderjs.set(map, key, {
                hd: value,
                tl: list
              });
  } else {
    return ImmutableSparseMap$Wonderjs.set(map, key, {
                hd: value,
                tl: /* [] */0
              });
  }
}

exports.addValue = addValue;
/* No side effect */
